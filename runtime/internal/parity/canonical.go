package parity

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"reflect"
	"sort"
)

// Canonicalize performs deterministic JSON serialization suitable for hashing.
// It follows strict Phase 3.2 rules: key sorting, no whitespace, explicit numeric format.
func Canonicalize(input interface{}) (string, error) {
	processed, err := process(input)
	if err != nil {
		return "", err
	}

	b, err := json.Marshal(processed)
	if err != nil {
		return "", err
	}

	return string(b), nil
}

// Hash returns the SHA-256 hex string of the canonicalized input.
func Hash(input interface{}) (string, error) {
	c, err := Canonicalize(input)
	if err != nil {
		return "", err
	}
	h := sha256.Sum256([]byte(c))
	return hex.EncodeToString(h[:]), nil
}

func process(input interface{}) (interface{}, error) {
	if input == nil {
		return nil, nil
	}

	v := reflect.ValueOf(input)

	switch v.Kind() {
	case reflect.Map:
		// Step 3: Sort keys
		keys := v.MapKeys()
		sort.Slice(keys, func(i, j int) bool {
			return keys[i].String() < keys[j].String()
		})

		newMap := make(map[string]interface{})
		for _, k := range keys {
			val, err := process(v.MapIndex(k).Interface())
			if err != nil {
				return nil, err
			}
			newMap[k.String()] = val
		}
		return newMap, nil

	case reflect.Slice, reflect.Array:
		// Step 4: Arrays preserved as is (semantic order)
		newList := make([]interface{}, v.Len())
		for i := 0; i < v.Len(); i++ {
			val, err := process(v.Index(i).Interface())
			if err != nil {
				return nil, err
			}
			newList[i] = val
		}
		return newList, nil

	case reflect.Float32, reflect.Float64:
		// Step 6: Strict number serialization
		f := v.Float()
		return fmt.Sprintf("%.0f", f), nil

	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return v.Int(), nil

	case reflect.String:
		return v.String(), nil

	case reflect.Bool:
		return v.Bool(), nil

	case reflect.Struct:
		// Step 2 & 3: Structural mapping with key sorting
		return processStruct(v)

	default:
		return nil, fmt.Errorf("unsupported type: %v", v.Kind())
	}
}

func processStruct(v reflect.Value) (interface{}, error) {
	t := v.Type()
	newMap := make(map[string]interface{})

	for i := 0; i < v.NumField(); i++ {
		field := t.Field(i)
		tag := field.Tag.Get("json")
		if tag == "" || tag == "-" {
			continue
		}

		// Handle json tags like 'name,omitempty'
		name := tag
		if i := bytes.IndexByte([]byte(name), ','); i != -1 {
			name = name[:i]
		}

		val, err := process(v.Field(i).Interface())
		if err != nil {
			return nil, err
		}
		newMap[name] = val
	}

	// Ensure keys are sorted (Step 3)
	keys := make([]string, 0, len(newMap))
	for k := range newMap {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	finalMap := make(map[string]interface{})
	for _, k := range keys {
		finalMap[k] = newMap[k]
	}

	return finalMap, nil
}
