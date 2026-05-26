package state

import (
	"fmt"
	"time"

	"github.com/zensorum/runtime/internal/eventbus"
)

// ReplayEngine orchestrates deterministic state reconstruction.
type ReplayEngine struct {
	reducer Reducer
}

func NewReplayEngine(reducer Reducer) *ReplayEngine {
	return &ReplayEngine{reducer: reducer}
}

// Replay executes the state reconstruction from an event log, optionally starting from a snapshot.
func (re *ReplayEngine) Replay(eventStream []*eventbus.BaseEvent, snapshot *Snapshot) (*ReplayResult, error) {
	currentState := make(State)
	startSeq := int64(0)

	if snapshot != nil {
		// Validate snapshot integrity
		hash, err := CalculateHash(snapshot.State)
		if err != nil || hash != snapshot.Hash {
			return nil, fmt.Errorf("snapshot integrity check failed")
		}
		currentState = snapshot.State
		startSeq = snapshot.SequenceNumber
	}

	history := make([]ReplayTraceEntry, 0)

	for _, event := range eventStream {
		// Only process events after the snapshot sequence
		if event.SequenceNumber != nil && int64(*event.SequenceNumber) <= startSeq {
			continue
		}

		// Apply deterministic reduction
		nextState, err := re.reducer(currentState, event)
		if err != nil {
			return nil, fmt.Errorf("reduction error at seq %d: %w", event.SequenceNumber, err)
		}
		currentState = nextState

		// Record trace
		hash, _ := CalculateHash(currentState)
		seq := int64(0)
		if event.SequenceNumber != nil {
			seq = int64(*event.SequenceNumber)
		}
		history = append(history, ReplayTraceEntry{
			EventID:        event.EventID,
			SequenceNumber: seq,
			StateHash:      hash,
			Timestamp:      time.Now(),
		})
	}

	finalHash, _ := CalculateHash(currentState)
	return &ReplayResult{
		FinalState:     currentState,
		StateHistory:   history,
		FinalStateHash: finalHash,
	}, nil
}
