package harness

import (
	"encoding/json"
	"fmt"
)

// Reporter handles output formatting for CI integration.
type Reporter struct{}

func (r *Reporter) Report(result CIResult) {
	output, _ := json.MarshalIndent(result, "", "  ")
	fmt.Println(string(output))
}
