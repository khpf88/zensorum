import { CanonicalDomainGraph } from '@zensorum/workflow-engine';

/**
 * Execution Binding Models
 */

export interface NodeExecutionPrimitive {
  primitiveType: 'ACTION' | 'DECISION' | 'PARALLEL' | 'SEQUENCE';
  handlerId: string; // Maps to a Go-side handler
}

export interface PolicyResolution {
  preExecutionHook: string | null;
  postExecutionHook: string | null;
  enforcementMode: 'BLOCKING' | 'NON_BLOCKING';
}

export interface AISandboxBinding {
  nodeId: string;
  deterministicWrapper: string; // The canonical wrapper implementation
  fallbackPolicy: string;
}

/**
 * The formal binding of a graph to its execution semantics.
 */
export interface ExecutionSemanticBinding {
  workflowId: string;
  nodeBindings: Map<string, NodeExecutionPrimitive>;
  policyResolutions: Map<string, PolicyResolution>;
  aiBindings: Map<string, AISandboxBinding>;
}
