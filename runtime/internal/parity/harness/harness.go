package harness

import (
	"github.com/zensorum/runtime/internal/parity"
)

// Harness coordinates the execution and comparison process.
type Harness struct {
	runnerTS *RunnerTS
	runnerGo *RunnerGo
}

func NewHarness(ts *RunnerTS, goR *RunnerGo) *Harness {
	return &Harness{runnerTS: ts, runnerGo: goR}
}

func (h *Harness) RunParityTest(tc TestCase) CIResult {
	// 1. Run TS
	tsBundle, tsDur, _ := h.runnerTS.Execute(tc)

	// 2. Run Go
	goBundle, goDur, _ := h.runnerGo.Execute(tc)

	// 3. Normalize
	parity.NormalizeBundle(&tsBundle)
	parity.NormalizeBundle(&goBundle)

	// 4. Parity Oracle
	report := parity.Compare(&tsBundle, &goBundle)

	status := "PASS"
	if report.Status != parity.StatusPass {
		status = "FAIL"
	}

	return CIResult{
		TestID:              tc.TestID,
		Status:              status,
		DivergenceType:      report.DivergenceType,
		ParityReport:        report,
		TsExecutionBundle:   tsBundle,
		GoExecutionBundle:   goBundle,
		ExecutionDurationTS: tsDur,
		ExecutionDurationGo: goDur,
	}
}
