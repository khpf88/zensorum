/**
 * Canonical Semantic Normalization Layer - Execution Bundle Definitions
 * Represents the final, deterministic artifact for the Go Runtime.
 */

export interface CanonicalExecutionBundle {
  workflowId: string;
  // Formal DAG representation for Go Runtime
  dag: {
    nodes: any[];
    edges: any[];
  };
  // Resolved execution primitives and handlers
  primitives: Map<string, any>;
  // Resolved policy application rules
  policyBundle: {
    blockingPolicies: string[];
    nonBlockingPolicies: string[];
  };
  // Metadata for audit trail
  metadata: {
    bundleHash: string;
    transformationTimestamp: string;
  };
}
