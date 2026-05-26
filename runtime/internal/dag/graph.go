package dag

import (
	"sort"
)

// NewDAG creates a new DAG, ensuring nodes are sorted by ID for deterministic lookup.
func NewDAG(nodes []Node) *DAG {
	sort.Slice(nodes, func(i, j int) bool {
		return nodes[i].ID < nodes[j].ID
	})
	return &DAG{Nodes: nodes}
}

// FindNode returns the node if found, using binary search for determinism.
func (d *DAG) FindNode(id string) (*Node, bool) {
	idx := sort.Search(len(d.Nodes), func(i int) bool {
		return d.Nodes[i].ID >= id
	})
	if idx < len(d.Nodes) && d.Nodes[idx].ID == id {
		return &d.Nodes[idx], true
	}
	return nil, false
}

// HasCycle performs a deterministic cycle detection using DFS.
// Uses slice-based stacks to maintain determinism.
func (d *DAG) HasCycle() (bool, []string) {
	visited := []string{}
	recursionStack := []string{}
	path := []string{}

	var dfs func(nodeID string) bool
	dfs = func(nodeID string) bool {
		// Add to recursion stack
		recursionStack = append(recursionStack, nodeID)
		path = append(path, nodeID)

		node, found := d.FindNode(nodeID)
		if found {
			for _, dep := range node.Dependencies {
				// Check if dep in recursionStack (linear search is deterministic)
				if contains(recursionStack, dep) {
					return true // Cycle detected
				}
				if !contains(visited, dep) {
					if dfs(dep) {
						return true
					}
				}
			}
		}

		// Remove from recursion stack
		recursionStack = recursionStack[:len(recursionStack)-1]
		visited = append(visited, nodeID)
		return false
	}

	for _, node := range d.Nodes {
		if !contains(visited, node.ID) {
			if dfs(node.ID) {
				return true, path
			}
		}
	}

	return false, nil
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}
