package dag

import (
	"time"

	"github.com/zensorum/runtime/internal/eventbus"
)

// Validator orchestrates DAG validation logic.
type Validator struct {
	dag *DAG
}

func NewValidator(dag *DAG) *Validator {
	return &Validator{dag: dag}
}

// Validate ensures the event structure respects the DAG.
func (v *Validator) Validate(event *eventbus.BaseEvent, state map[string]interface{}) (DAGDecision, eventbus.DAGEvaluationTrace) {
	trace := eventbus.DAGEvaluationTrace{
		StartedAt:      time.Now(),
		TraversedNodes: make([]string, 0),
	}

	// 1. Node Existence
	node, found := v.dag.FindNode(event.EventType)
	if !found {
		return DAGDecision{Allowed: false, ReasonCode: "NODE_NOT_FOUND"}, trace
	}
	trace.TraversedNodes = append(trace.TraversedNodes, node.ID)

	// 2. Cycle Detection (Global)
	cycle, path := v.dag.HasCycle()
	if cycle {
		trace.CycleDetected = true
		return DAGDecision{Allowed: false, ReasonCode: "CYCLE_DETECTED", ViolatedNodes: path}, trace
	}

	// 3. Dependency Satisfaction
	// Check if all declared dependencies are satisfied in current state
	for _, dep := range node.Dependencies {
		if _, satisfied := state[dep]; !satisfied {
			return DAGDecision{Allowed: false, ReasonCode: "DEPENDENCY_NOT_SATISFIED"}, trace
		}
	}

	trace.Decision = true
	return DAGDecision{Allowed: true}, trace
}
