import { ExecutionSnapshotState, NodeState } from '@zensorum/validation/snapshot';
import { CanonicalSchedulerContext } from './CanonicalSchedulerContext';

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
  schedulerContext: CanonicalSchedulerContext;
}

export function toCanonicalSnapshot(snapshot: ExecutionSnapshotState): CanonicalExecutionSnapshot {
  // Perform basic runtime validation/extraction of scheduler context fields
  const activeNodeId = snapshot.context.activeNodeId;
  const scheduledTicks = snapshot.context.scheduledTicks;
  const isDeterministic = snapshot.context.isDeterministic;

  if (typeof activeNodeId !== 'string' || !Array.isArray(scheduledTicks) || typeof isDeterministic !== 'boolean') {
    // In a real scenario, this would throw a deterministic validation error
    // For now, we'll assign defaults or throw a more specific error
    throw new Error('Invalid scheduler context structure for canonical snapshot.');
  }

  const canonicalSnapshot: CanonicalExecutionSnapshot = {
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
    schedulerContext: {
      activeNodeId: activeNodeId,
      scheduledTicks: scheduledTicks,
      isDeterministic: isDeterministic,
    },
  };

  Object.freeze(canonicalSnapshot.nodeStates);
  Object.freeze(canonicalSnapshot.policyStates);
  Object.freeze(canonicalSnapshot.schedulerContext);
  return Object.freeze(canonicalSnapshot);
}
