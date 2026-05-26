package parity

import (
	"testing"
)

func TestCanonicalize(t *testing.T) {
	tests := []struct {
		name     string
		input    interface{}
		expected string
	}{
		{
			name:     "Key ordering chaos",
			input:    map[string]int{"z": 1, "a": 2, "m": 3},
			expected: `{"a":2,"m":3,"z":1}`,
		},
		{
			name:     "Nested structures",
			input:    map[string]interface{}{"b": map[string]int{"c": 2}, "a": 1},
			expected: `{"a":1,"b":{"c":2}}`,
		},
		{
			name:     "Deep arrays",
			input:    map[string]interface{}{"arr": []interface{}{3, 1, 2}},
			expected: `{"arr":[3,1,2]}`,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Canonicalize(tt.input)
			if err != nil {
				t.Fatalf("Canonicalize() error = %v", err)
			}
			if got != tt.expected {
				t.Errorf("Canonicalize() = %v, want %v", got, tt.expected)
			}
		})
	}
}
