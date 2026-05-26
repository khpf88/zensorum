package eventbus

import (
	"time"
)

// FRCSEvaluationTrace captures governance evaluation results.
type FRCSEvaluationTrace struct {
	StartedAt      time.Time    `json:"started_at"`
	RulesEvaluated []string     `json:"rules_evaluated"`
	MatchedRuleID  string       `json:"matched_rule_id"`
	Decision       interface{}  `json:"decision"`
}

// DAGEvaluationTrace captures DAG validation results.
type DAGEvaluationTrace struct {
	StartedAt       time.Time `json:"started_at"`
	TraversedNodes  []string  `json:"traversed_nodes"`
	CycleDetected   bool      `json:"cycle_detected"`
	Decision        bool      `json:"decision"`
}

// TraceEntry logs the deterministic execution of an event.
type TraceEntry struct {
	EventID        string                `json:"event_id"`
	SequenceNumber int64                 `json:"sequence_number"`
	Timestamp      time.Time             `json:"timestamp"`
	ExecutionTrace []ResultMetadata      `json:"execution_trace"`
	FRCSTrace      *FRCSEvaluationTrace  `json:"frcs_trace,omitempty"`
	DAGTrace       *DAGEvaluationTrace   `json:"dag_trace,omitempty"`
}

// Tracer handles the logging of execution traces.
type Tracer struct {
	traces []TraceEntry
}

func NewTracer() *Tracer {
	return &Tracer{
		traces: make([]TraceEntry, 0),
	}
}

// Record adds a trace entry.
func (t *Tracer) Record(entry TraceEntry) {
	// Simple append for now, can be optimized for file-backed storage if needed.
	t.traces = append(t.traces, entry)
}
