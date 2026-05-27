/**
 * Canonical Domain Graph Definitions
 * Intermediate representation layer between Domain Workflow and Runtime Execution.
 */

export interface AuditReference {
  correlationId: string;
  sourceDomain: string;
  timestamp: string;
}

export interface PolicyBinding {
  policyId: string;
  enforcementPoint: string;
}

export interface FallbackStrategy {
  nodeId: string;
  strategy: 'static_rule' | 'policy_engine' | 'default_value' | 'skip_node' | 'human_review';
}

export interface AISandboxMetadata {
  nodeId: string;
  enabled: boolean;
  promptTemplate: string;
}

export interface GraphNode {
  id: string;
  type: string;
  config: Record<string, any>;
}

export interface GraphTransition {
  fromNode: string;
  toNode: string;
  condition?: string;
}

export interface CanonicalDomainGraph {
  workflowId: string;
  nodes: GraphNode[];
  transitions: GraphTransition[];
  policyBindings: PolicyBinding[];
  deterministicFallbacks: FallbackStrategy[];
  aiSandboxMetadata: AISandboxMetadata[];
  auditLineage: AuditReference;
}
