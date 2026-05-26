package dag

// Node represents a vertex in the DAG.
type Node struct {
	ID           string
	Dependencies []string // Strictly ordered
}

// DAG represents the static execution graph.
type DAG struct {
	Nodes []Node // Sorted by ID for deterministic lookup
}

// DAGDecision is the outcome of the DAG validation.
type DAGDecision struct {
	Allowed        bool
	ReasonCode     string
	ViolatedNodes  []string
	TraversalTrace []string
}
