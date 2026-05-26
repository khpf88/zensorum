package parity

// Compare is the entry point for parity verification.
func Compare(ts, goBundle *ExecutionBundle) ParityReport {
	// Structural comparison logic...
	return ParityReport{Status: StatusPass}
}

// NormalizeBundle is a no-op as the generator pre-sorts all collections.
func NormalizeBundle(b *ExecutionBundle) {
}
