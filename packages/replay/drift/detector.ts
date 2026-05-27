import { ExecutionSnapshotState } from '../../validation/snapshot';
import { DriftReport, DriftType } from '../types';

export class ExecutionDriftDetector {
  /**
   * Detects divergence between actual runtime state and recorded trace.
   */
  detect(
    tickIndex: number,
    actual: ExecutionSnapshotState,
    trace: ExecutionSnapshotState
  ): DriftReport | null {
    
    // 1. Node State Check
    if (actual.nodeStates.size !== trace.nodeStates.size) {
      return this.createReport(tickIndex, 'NODE_STATE_MISMATCH', 'Size mismatch');
    }
    for (const [nodeId, state] of actual.nodeStates) {
      if (trace.nodeStates.get(nodeId) !== state) {
        return this.createReport(tickIndex, 'NODE_STATE_MISMATCH', `Mismatch for node ${nodeId}`);
      }
    }

    // 2. Policy Cache Check
    if (actual.policyCache.size !== trace.policyCache.size) {
      return this.createReport(tickIndex, 'POLICY_CACHE_MISMATCH', 'Size mismatch');
    }
    for (const [policyId, outcome] of actual.policyCache) {
      if (trace.policyCache.get(policyId) !== outcome) {
        return this.createReport(tickIndex, 'POLICY_CACHE_MISMATCH', `Mismatch for policy ${policyId}`);
      }
    }

    // 3. State Hash Check
    if (actual.snapshotHash !== trace.snapshotHash) {
      return this.createReport(tickIndex, 'STATE_HASH_MISMATCH', 'Snapshot hash mismatch');
    }

    return null;
  }

  private createReport(
    tickIndex: number,
    driftType: DriftType,
    reason: string
  ): DriftReport {
    return {
      tickIndex,
      nodeId: null, // Could be specialized per check
      driftType,
      expectedValue: 'TraceValue',
      actualValue: 'ActualValue',
      reason
    };
  }
}
