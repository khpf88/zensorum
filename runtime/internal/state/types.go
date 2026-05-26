package state

import (
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"time"

	"github.com/zensorum/runtime/internal/eventbus"
)

// State is the aggregate representation of system state.
type State map[string]interface{}

// Reducer defines the pure function that applies an event to state.
type Reducer func(currentState State, event *eventbus.BaseEvent) (State, error)

// ReplayTraceEntry records the deterministic state transition.
type ReplayTraceEntry struct {
	EventID        string    `json:"event_id"`
	SequenceNumber int64     `json:"sequence_number"`
	StateHash      string    `json:"state_hash"`
	Timestamp      time.Time `json:"timestamp"`
}

// ReplayResult encapsulates the outcome of a replay process.
type ReplayResult struct {
	FinalState    State
	StateHistory  []ReplayTraceEntry
	FinalStateHash string
}

// Snapshot represents a point-in-time state checkpoint.
type Snapshot struct {
	SequenceNumber int64     `json:"sequence_number"`
	State          State     `json:"state"`
	Hash           string    `json:"hash"`
	Timestamp      time.Time `json:"timestamp"`
}

// CalculateHash computes a deterministic SHA-256 hash of the state.
func CalculateHash(state State) (string, error) {
	bytes, err := json.Marshal(state)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%x", sha256.Sum256(bytes)), nil
}
