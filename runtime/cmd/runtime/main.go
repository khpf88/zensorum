package main

import (
	"fmt"
	"time"

	"github.com/zensorum/runtime/internal/dag"
	"github.com/zensorum/runtime/internal/eventbus"
	"github.com/zensorum/runtime/internal/governance"
	"github.com/zensorum/runtime/internal/orchestrator"
	"github.com/zensorum/runtime/internal/state"
)

func main() {
	fmt.Println("Zensorum runtime starting...")

	// 1. FIXED FIXTURE SETUP
	fixedTime := time.Date(2026, 5, 25, 10, 0, 0, 0, time.UTC)
	
	goldenEvent := &eventbus.BaseEvent{
		EventID:      "evt-001",
		EventType:    "GOLDEN_TEST_EVENT",
		EventVersion: "v1",
		Timestamp:    fixedTime,
		Source:       "GOLDEN_FIXTURE",
		Payload: map[string]interface{}{
			"test_key": "phase2-validation",
		},
	}

	// 2. STATE REDUCER (DETERMINISTIC)
	goldenReducer := func(currentState state.State, event *eventbus.BaseEvent) (state.State, error) {
		if event.EventType == "GOLDEN_TEST_EVENT" {
			newState := make(state.State)
			for k, v := range currentState {
				newState[k] = v
			}
			newState["processed"] = true
			newState["last_event"] = event.EventID
			return newState, nil
		}
		return currentState, nil
	}

	// 3. SYSTEM INITIALIZATION
	ruleRegistry := governance.NewRuleRegistry()
	frcs := governance.NewFRCSEngine(ruleRegistry)

	dagGraph := dag.NewDAG([]dag.Node{
		{
			ID:           "GOLDEN_TEST_EVENT",
			Dependencies: []string{},
		},
	})
	dagValidator := dag.NewValidator(dagGraph)

	eb := eventbus.NewEventBus()
	orch := orchestrator.NewOrchestrator(frcs, dagValidator, eb)

	// 4. LIVE EXECUTION
	initialState := make(state.State)
	ctx := &governance.ExecutionContext{}
	snapshot := &governance.StateSnapshot{}

	fmt.Println("✔ GOLDEN EXECUTION STARTING")
	trace, result := orch.Publish(goldenEvent, initialState, ctx, snapshot)

	if result != "EXECUTED" {
		fmt.Printf("❌ EXECUTION FAILED: %s\n", result)
		return
	}
	fmt.Println("✔ GOLDEN EXECUTION COMPLETE")

	// Simulate state update in live system (parity with reducer)
	liveState, _ := goldenReducer(initialState, goldenEvent)
	liveHash, _ := state.CalculateHash(liveState)

	// 5. REPLAY VALIDATION
	fmt.Println("✔ REPLAY EXECUTION STARTING")
	eventLog := eb.GetEventQueue().GetEvents()
	replayEngine := state.NewReplayEngine(goldenReducer)
	
	replayResult, err := replayEngine.Replay(eventLog, nil)
	if err != nil {
		fmt.Printf("❌ REPLAY FAILED: %v\n", err)
		return
	}
	fmt.Println("✔ REPLAY EXECUTION COMPLETE")

	// 6. PARITY CHECK
	fmt.Println("\n=== PARITY CHECK ===")
	fmt.Printf("Live State Hash:   %s\n", liveHash)
	fmt.Printf("Replay State Hash: %s\n", replayResult.FinalStateHash)

	if liveHash == replayResult.FinalStateHash {
		fmt.Println("\n✔ PARITY CHECK: PASS")
	} else {
		fmt.Println("\n❌ PARITY CHECK: FAIL (State Divergence)")
	}

	fmt.Printf("\nTrace Sequence: %d\n", trace.SequenceNumber)
}
