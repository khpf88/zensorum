package governance

import "github.com/zensorum/runtime/internal/eventbus"

// Decision type
type Decision string

const (
	DecisionAllow Decision = "ALLOW"
	DecisionReject Decision = "REJECT"
	DecisionNoOp  Decision = "NO_OP"
)

// ReasonCode type
type ReasonCode string

const (
	ReasonPolicyViolation ReasonCode = "POLICY_VIOLATION"
	ReasonQuotaExceeded   ReasonCode = "QUOTA_EXCEEDED"
	ReasonContractInvalid ReasonCode = "CONTRACT_INVALID"
	ReasonNone            ReasonCode = "NONE"
)

// FRCSDecision is the structured output of the FRCS engine.
type FRCSDecision struct {
	Decision   Decision               `json:"decision"`
	ReasonCode ReasonCode             `json:"reason_code"`
	RuleID     string                 `json:"rule_id"`
	Metadata   map[string]interface{} `json:"metadata"`
}

// StateSnapshot is a read-only view of the current runtime state.
type StateSnapshot struct {
	// Fields will be added to match canonical TS state
}

// ExecutionContext is a read-only snapshot of the runtime context.
type ExecutionContext struct {
	// Fields will be added to match canonical TS context
}

// FRCSRule defines the interface for governance rules.
type FRCSRule interface {
	ID() string
	Evaluate(event *eventbus.BaseEvent, state *StateSnapshot, context *ExecutionContext) (bool, ReasonCode)
}
