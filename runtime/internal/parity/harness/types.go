package harness

import (
	"time"

	"github.com/zensorum/runtime/internal/eventbus"
	"github.com/zensorum/runtime/internal/parity"
)

// TestCase defines the input event stream and metadata.
type TestCase struct {
	TestID      string                  `json:"test_id"`
	EventStream []*eventbus.BaseEvent `json:"event_stream"`
}

// CIResult encapsulates the pass/fail outcome.
type CIResult struct {
	TestID              string                  `json:"test_id"`
	Status              string                  `json:"status"` // "PASS" or "FAIL"
	DivergenceType      parity.DivergenceType   `json:"divergence_type"`
	ParityReport        parity.ParityReport     `json:"parity_report"`
	TsExecutionBundle   parity.ExecutionBundle  `json:"ts_execution_bundle"`
	GoExecutionBundle   parity.ExecutionBundle  `json:"go_execution_bundle"`
	ExecutionDurationTS time.Duration           `json:"execution_duration_ts"`
	ExecutionDurationGo time.Duration           `json:"execution_duration_go"`
}
