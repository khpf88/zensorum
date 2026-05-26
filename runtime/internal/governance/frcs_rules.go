package governance

import "github.com/zensorum/runtime/internal/eventbus"

// RuleRegistry maintains an ordered list of governance rules.
type RuleRegistry struct {
	rules []FRCSRule
}

func NewRuleRegistry() *RuleRegistry {
	return &RuleRegistry{
		rules: make([]FRCSRule, 0),
	}
}

// Register adds a rule in the order it is called.
// Deterministic order is strictly maintained.
func (rr *RuleRegistry) Register(rule FRCSRule) {
	rr.rules = append(rr.rules, rule)
}

// GetRules returns the ordered list of rules.
func (rr *RuleRegistry) GetRules() []FRCSRule {
	return rr.rules
}

// ExampleRule implements FRCSRule for demonstration.
type ExamplePolicyRule struct{}

func (e *ExamplePolicyRule) ID() string { return "EXAMPLE_POLICY_001" }

func (e *ExamplePolicyRule) Evaluate(event *eventbus.BaseEvent, state *StateSnapshot, context *ExecutionContext) (bool, ReasonCode) {
	// Example: Reject if event type starts with "RESTRICTED"
	if len(event.EventType) > 10 && event.EventType[0:10] == "RESTRICTED" {
		return true, ReasonPolicyViolation
	}
	return false, ReasonNone
}
