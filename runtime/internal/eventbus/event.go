package eventbus

import (
	"time"
)

type EventState string

const (
	Pending    EventState = "PENDING"
	Validated  EventState = "VALIDATED"
	Dispatched EventState = "DISPATCHED"
	Executed   EventState = "EXECUTED"
	Completed  EventState = "COMPLETED"
	Failed     EventState = "FAILED"
	Rejected   EventState = "REJECTED"
	Cancelled  EventState = "CANCELLED"
)

type EventMetadata struct {
	Source         string  `json:"source"`
	CorrelationID  string  `json:"correlation_id"`
	CausationID    *string `json:"causation_id"`
	Environment    *string `json:"environment"`
	TenantID       *string `json:"tenant_id"`
	FixpointLocked bool    `json:"fixpointLocked"`
	DerivedDepth   int     `json:"derivedDepth"`
	RootEventID    *string `json:"rootEventId"`
}

type BaseEvent struct {
	EventID        string                 `json:"event_id"`
	EventType      string                 `json:"event_type"`
	EventVersion   string                 `json:"event_version"`
	Timestamp      time.Time              `json:"timestamp"`
	Source         string                 `json:"source"`
	CorrelationID  string                 `json:"correlation_id"`
	CausationID    *string                `json:"causation_id"`
	ParentID       *string                `json:"parent_id"`
	Payload        map[string]interface{} `json:"payload"`
	ContractID     string                 `json:"contract_id"`
	SequenceNumber *int                   `json:"sequence_number"`
	Seed           *string                `json:"seed"`

	OriginRuntimeID  string  `json:"origin_runtime_id"`
	TargetRuntimeID  *string `json:"target_runtime_id"`
	FederationHops   int     `json:"federation_hops"`
	CausalPartitionID string  `json:"causal_partition_id"`
	TenantID         *string `json:"tenant_id"`

	Metadata          EventMetadata `json:"metadata"`
	IdempotencyKey    string        `json:"idempotency_key"`
	Status            string        `json:"status"`
	ExecutionAttempts int           `json:"execution_attempts"`
	DependsOn         []string      `json:"depends_on"`
	LastError         *string       `json:"last_error"`
	Origin            string        `json:"origin"`
	EventCategory     string        `json:"event_category"`
}
