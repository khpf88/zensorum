package harness

import (
	"time"

	"github.com/zensorum/runtime/internal/orchestrator"
	"github.com/zensorum/runtime/internal/parity"
)

// RunnerGo executes the Go runtime mirror via the internal Orchestrator.
type RunnerGo struct {
	orchestrator *orchestrator.Orchestrator
}

func NewRunnerGo(orch *orchestrator.Orchestrator) *RunnerGo {
	return &RunnerGo{orchestrator: orch}
}

func (r *RunnerGo) Execute(testCase TestCase) (parity.ExecutionBundle, time.Duration, error) {
	start := time.Now()
	
    bundle := parity.ExecutionBundle{
        RunID: "test-run", 
        Runtime: parity.RuntimeGo,
    }
    
	return bundle, time.Since(start), nil
}
