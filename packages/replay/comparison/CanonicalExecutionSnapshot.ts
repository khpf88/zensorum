import { ExecutionSnapshotState, NodeState } from '../../validation/snapshot';

/**
 * Strict canonical structures for comparison, ensuring stable ordering
 * and exclusion of ephemeral metadata (timestamps, memory addresses).
 */

export interface CanonicalNodeState {
  nodeId: string;
  status: NodeState;
  // Execution result could be complex, needs stable serialization
  executionResultHash: string; 
}

export interface CanonicalPolicyState {
  policyId: string;
  evaluationResult: boolean;
}

export interface CanonicalExecutionSnapshot {
  stepIndex: number;
  nodeStates: CanonicalNodeState[];
  policyStates: CanonicalPolicyState[];
  schedulerContext: Record<string, any>;
}

export function toCanonicalSnapshot(snapshot: ExecutionSnapshotState): CanonicalExecutionSnapshot {
  return {
    stepIndex: snapshot.executionStep,
    nodeStates: Array.from(snapshot.nodeStates.entries())
      .map(([nodeId, status]) => ({
        nodeId,
        status,
        executionResultHash: 'placeholder', // To be populated from context
      }))
      .sort((a, b) => a.nodeId.localeCompare(b.nodeId)),
    policyStates: Array.from(snapshot.policyCache.entries())
      .map(([policyId, evaluationResult]) => ({
        policyId,
        evaluationResult,
      }))
      .sort((a, b) => a.policyId.localeCompare(b.policyId)),
    schedulerContext: snapshot.context, // Assuming context is already serializable
  };
}
