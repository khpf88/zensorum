/**
 * Strict Domain Workflow Definition
 */

export interface DomainNode {
  id: string;
  type: string;
  config: Record<string, any>;
}

export interface DomainTransition {
  fromNode: string;
  toNode: string;
  condition?: string;
}

export interface PolicyDefinition {
  policyId: string;
  enforcementPoint: string;
}

export interface AISandboxConfig {
  nodeId: string;
  enabled: boolean;
  promptTemplate: string;
  fallbackStrategy: 'static_rule' | 'policy_engine' | 'default_value' | 'skip_node' | 'human_review';
}

export interface DomainWorkflowDefinition {
  workflowId: string;
  nodes: DomainNode[];
  transitions: DomainTransition[];
  policies: PolicyDefinition[];
  aiNodes: AISandboxConfig[];
}
