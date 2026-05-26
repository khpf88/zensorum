package orchestrator

import (
	"time"

	"github.com/zensorum/runtime/internal/eventbus"
	"github.com/zensorum/runtime/internal/governance"
	"github.com/zensorum/runtime/internal/parity"
)

// GenerateBundle aggregates orchestration artifacts into a strict ExecutionBundle.
func (o *Orchestrator) GenerateBundle(
	runID string,
	eventStream []*eventbus.BaseEvent,
	state *governance.StateSnapshot, // Snapshot for re-execution
	context *governance.ExecutionContext,
) (parity.ExecutionBundle, error) {

	bundle := parity.ExecutionBundle{
		RunID:   runID,
		Runtime: parity.RuntimeGo,
		RuntimeMeta: parity.RuntimeMeta{
			Version:         "1.0.0",
			BuildID:         "dev",
			ExecutionTimeNs: time.Now().UnixNano(),
		},
	}

	// 1. Calculate EventStreamHash
	h, err := parity.Hash(eventStream)
	if err != nil {
		return bundle, err
	}
	bundle.EventStreamHash = h

	// 2. Execution Loop
	for i, event := range eventStream {
		trace, _ := o.Publish(event, nil, context, state) // Need to pass appropriate state

		// Aggregate
		if trace.FRCSTrace != nil {
			bundle.FrcsDecisions = append(bundle.FrcsDecisions, parity.FrcsDecision{
				NodeID:       event.EventID,
				DecisionType: trace.FRCSTrace.MatchedRuleID,
				DecisionHash: "hash_placeholder", // Will compute later
			})
		}
		if trace.DAGTrace != nil {
			bundle.DagValidationResults = append(bundle.DagValidationResults, parity.DagValidationResult{
				NodeID:         event.EventID,
				IsValid:        trace.DAGTrace.Decision,
				ErrorCode:      nil, // Will handle if needed
				ValidationHash: "hash_placeholder", // Will compute later
			})
		}

		bundle.EventOrder = append(bundle.EventOrder, parity.EventOrderEntry{
			Index:          i,
			EventID:        event.EventID,
			ParentEventIDs: event.DependsOn,
			OrderHash:      "hash_placeholder", // Will compute later
		})
	}

	// 3. Finalize Hashes
	bundle.FinalStateHash, _ = parity.Hash(state)
	bundle.ReplayHash, _ = parity.Hash(bundle.EventOrder) // simplified

	return bundle, nil
}
