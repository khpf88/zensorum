package governance

import (
	"time"

	"github.com/zensorum/runtime/internal/eventbus"
)

// FRCSEngine orchestrates rule evaluation in a strictly deterministic manner.
type FRCSEngine struct {
	registry *RuleRegistry
}

func NewFRCSEngine(registry *RuleRegistry) *FRCSEngine {
	return &FRCSEngine{
		registry: registry,
	}
}

// Evaluate runs rules in strict registration order.
// Stops at the first matched rule (short-circuit).
func (fe *FRCSEngine) Evaluate(event *eventbus.BaseEvent, state *StateSnapshot, context *ExecutionContext) (FRCSDecision, eventbus.FRCSEvaluationTrace) {
	trace := eventbus.FRCSEvaluationTrace{
		StartedAt:      time.Now(),
		RulesEvaluated: make([]string, 0),
	}

	for _, rule := range fe.registry.GetRules() {
		trace.RulesEvaluated = append(trace.RulesEvaluated, rule.ID())
		
		matched, reason := rule.Evaluate(event, state, context)
		if matched {
			decision := FRCSDecision{
				Decision:   DecisionReject, // Rules in this engine currently represent rejection/NO_OP
				ReasonCode: reason,
				RuleID:     rule.ID(),
				Metadata:   map[string]interface{}{"note": "Rejected by rule"},
			}
			trace.MatchedRuleID = rule.ID()
			trace.Decision = decision
			return decision, trace
		}
	}

	// Default: ALLOW
	decision := FRCSDecision{
		Decision:   DecisionAllow,
		ReasonCode: ReasonNone,
		RuleID:     "DEFAULT_ALLOW",
	}
	trace.MatchedRuleID = "DEFAULT_ALLOW"
	trace.Decision = decision
	return decision, trace
}
