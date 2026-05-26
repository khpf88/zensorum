package orchestrator

import (
	"time"

	"github.com/zensorum/runtime/internal/dag"
	"github.com/zensorum/runtime/internal/eventbus"
	"github.com/zensorum/runtime/internal/governance"
)

// Orchestrator binds governance, causality, and execution into a deterministic pipeline.
type Orchestrator struct {
	frcsEngine   *governance.FRCSEngine
	dagValidator *dag.Validator
	eventBus     *eventbus.EventBus
}

// NewOrchestrator initializes the execution spine.
func NewOrchestrator(
	frcs *governance.FRCSEngine,
	dagV *dag.Validator,
	bus *eventbus.EventBus,
) *Orchestrator {
	return &Orchestrator{
		frcsEngine:   frcs,
		dagValidator: dagV,
		eventBus:     bus,
	}
}

// Publish is the SINGLE control-plane entry point.
// Strict sequential pipeline: FRCS -> DAG -> EventBus.
func (o *Orchestrator) Publish(
	event *eventbus.BaseEvent,
	state map[string]interface{}, // Read-only snapshot
	context *governance.ExecutionContext,
	stateSnapshot *governance.StateSnapshot,
) (*eventbus.TraceEntry, string) {

	// Initialize unified execution trace
	trace := &eventbus.TraceEntry{
		EventID:   event.EventID,
		Timestamp: time.Now(),
	}

	// STEP 1: FRCS Evaluation
	frcsDecision, frcsTrace := o.frcsEngine.Evaluate(event, stateSnapshot, context)
	trace.FRCSTrace = &frcsTrace

	if frcsDecision.Decision != governance.DecisionAllow {
		return trace, "REJECTED_BY_FRCS"
	}

	// STEP 2: DAG Validation
	dagDecision, dagTrace := o.dagValidator.Validate(event, state)
	trace.DAGTrace = &dagTrace

	if !dagDecision.Allowed {
		return trace, "REJECTED_BY_DAG"
	}

	// STEP 3: EventBus Execution
	// EventBus.Publish handles sequence assignment and synchronous dispatch
	o.eventBus.Publish(event)
	
	// Finalize trace (EventBus dispatch is synchronous and deterministic)
	trace.SequenceNumber = o.eventBus.GetEventQueue().GetSequenceCounter() 

	return trace, "EXECUTED"
}
