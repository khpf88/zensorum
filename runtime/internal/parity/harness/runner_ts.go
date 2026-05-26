package harness

import (
	"encoding/json"
	"os/exec"
	"time"

	"github.com/zensorum/runtime/internal/parity"
)

// RunnerTS executes the canonical TS runtime as a subprocess.
type RunnerTS struct{}

func (r *RunnerTS) Execute(testCase TestCase) (parity.ExecutionBundle, time.Duration, error) {
	start := time.Now()

	// In a real environment, this invokes the TypeScript runtime CLI and captures JSON output.
	// We simulate the invocation here.
	cmd := exec.Command("node", "dist/app.js", "--replay", "--input", "test_stream.json")
	
	// Capture output into ExecutionBundle structure
	out, err := cmd.Output()
	if err != nil {
		// Log error and return bundle with indication of failure if needed, 
		// but here we return error to harness for failing the test.
		return parity.ExecutionBundle{}, 0, err
	}

	var bundle parity.ExecutionBundle
	if err := json.Unmarshal(out, &bundle); err != nil {
		return parity.ExecutionBundle{}, 0, err
	}
	
	return bundle, time.Since(start), nil
}
