package parity

// Schema definitions for strict parity verification (Phase 3.1).

type Runtime string

const (
	RuntimeTS Runtime = "ts"
	RuntimeGo Runtime = "go"
)

// Parity Status
type Status string

const (
	StatusPass Status = "PASS"
	StatusFail Status = "FAIL"
)

type DivergenceType string

// ParityReport struct
type ParityReport struct {
	Status         Status         `json:"status"`
	DivergenceType DivergenceType `json:"divergence_type"`
}

type FrcsDecision struct {
	NodeID       string `json:"nodeId"`
	DecisionType string `json:"decisionType"`
	DecisionHash string `json:"decisionHash"`
}

type DagValidationResult struct {
	NodeID         string  `json:"nodeId"`
	IsValid        bool    `json:"isValid"`
	ErrorCode      *string `json:"errorCode"`
	ValidationHash string  `json:"validationHash"`
}

type EventOrderEntry struct {
	Index          int      `json:"index"`
	EventID        string   `json:"eventId"`
	ParentEventIDs []string `json:"parentEventIds"`
	OrderHash      string   `json:"orderHash"`
}

type StateHashEntry struct {
	StepIndex int    `json:"stepIndex"`
	StateHash string `json:"stateHash"`
}

type RuntimeMeta struct {
	Version         string `json:"version"`
	BuildID         string `json:"buildId"`
	ExecutionTimeNs int64  `json:"executionTimeNs"`
}

// ExecutionBundle represents the strict canonical artifact for parity verification.
type ExecutionBundle struct {
	RunID                string                `json:"runId"`
	Runtime              Runtime               `json:"runtime"`
	EventStreamHash      string                `json:"eventStreamHash"`
	FrcsDecisions        []FrcsDecision        `json:"frcsDecisions"`
	DagValidationResults []DagValidationResult `json:"dagValidationResults"`
	EventOrder           []EventOrderEntry     `json:"eventOrder"`
	StateHashTimeline    []StateHashEntry      `json:"stateHashTimeline"`
	FinalStateHash       string                `json:"finalStateHash"`
	ReplayHash           string                `json:"replayHash"`
	RuntimeMeta          RuntimeMeta           `json:"runtimeMeta"`
}
