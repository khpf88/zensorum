/**
 * Execution Snapshot State
 * Immutable view of RuntimeState for deterministic scheduling.
 */
export type NodeState = 'PENDING' | 'READY' | 'QUEUED' | 'EXECUTING' | 'COMPLETED' | 'FAILED';

export interface ExecutionSnapshotState {
  workflowId: string;
  executionStep: number;

  nodeStates: ReadonlyMap<string, NodeState>;
  policyCache: ReadonlyMap<string, boolean>;
  context: Readonly<Record<string, any>>;

  snapshotHash: string; // Deterministic hash of full state
}

/**
 * Updated DeterministicScheduler interface
 * Strictly snapshot-isolated.
 */
export interface DeterministicScheduler {
  /**
   * Operates ONLY on immutable snapshot state.
   */
  selectReadyNodes(
    snapshot: ExecutionSnapshotState,
    concurrencySlots: number
  ): string[];
}
