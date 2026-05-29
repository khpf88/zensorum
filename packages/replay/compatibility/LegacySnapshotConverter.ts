import { LegacySnapshot, ReplayProtocolVersion } from '../types';
import { CanonicalExecutionSnapshot, CanonicalNodeState, CanonicalPolicyState, toCanonicalSnapshot } from '../comparison/CanonicalExecutionSnapshot';
import { CanonicalSchedulerContext } from '../comparison/CanonicalSchedulerContext';
import { NodeState, ExecutionSnapshotState } from '@zensorum/validation/snapshot';

/**
 * Validates a raw LegacySnapshot object and attempts to convert it into a CanonicalExecutionSnapshot.
 * This process includes runtime validation, type narrowing, and deterministic mapping.
 * It strictly enforces admissibility criteria for replay.
 */
export class LegacySnapshotConverter {

  /**
   * Performs runtime validation and deterministic migration of a LegacySnapshot.
   * @param legacySnapshot The raw legacy snapshot object.
   * @returns A validated and mapped CanonicalExecutionSnapshot.
   * @throws Error if the legacy snapshot does not meet deterministic admissibility criteria.
   */
  public convert(legacySnapshot: LegacySnapshot, _fromVersion: ReplayProtocolVersion): CanonicalExecutionSnapshot {
    // 1. Runtime validation and type narrowing for LegacySnapshot properties
    if (typeof legacySnapshot.workflowId !== 'string') {
      throw new Error('LegacySnapshot: workflowId must be a string.');
    }
    if (typeof legacySnapshot.executionStep !== 'number') {
      throw new Error('LegacySnapshot: executionStep must be a number.');
    }
    // nodeStates from Record<string, unknown> to ReadonlyMap<string, NodeState>
    const nodeStatesMap = new Map<string, NodeState>();
    if (typeof legacySnapshot.nodeStates === 'object' && legacySnapshot.nodeStates !== null) {
      for (const key in legacySnapshot.nodeStates) {
        if (Object.prototype.hasOwnProperty.call(legacySnapshot.nodeStates, key)) {
          const value = (legacySnapshot.nodeStates as Record<string, unknown>)[key];
          if (typeof value === 'string' && ['PENDING', 'READY', 'QUEUED', 'EXECUTING', 'COMPLETED', 'FAILED'].includes(value)) {
            nodeStatesMap.set(key, value as NodeState);
          } else {
            throw new Error(`LegacySnapshot: Invalid node state for key ${key}`);
          }
        }
      }
    } else {
      throw new Error('LegacySnapshot: nodeStates must be an object.');
    }

    // policyCache from Record<string, unknown> to ReadonlyMap<string, boolean>
    const policyCacheMap = new Map<string, boolean>();
    if (typeof legacySnapshot.policyCache === 'object' && legacySnapshot.policyCache !== null) {
      for (const key in legacySnapshot.policyCache) {
        if (Object.prototype.hasOwnProperty.call(legacySnapshot.policyCache, key)) {
          const value = (legacySnapshot.policyCache as Record<string, unknown>)[key];
          if (typeof value === 'boolean') {
            policyCacheMap.set(key, value);
          } else {
            throw new Error(`LegacySnapshot: Invalid policy cache value for key ${key}`);
          }
        }
      }
    } else {
      throw new Error('LegacySnapshot: policyCache must be an object.');
    }

    // context from unknown to CanonicalSchedulerContext, with validation
    let canonicalSchedulerContext: CanonicalSchedulerContext;
    if (typeof legacySnapshot.context === 'object' && legacySnapshot.context !== null) {
      const context = legacySnapshot.context as Record<string, unknown>;
      if (typeof context.activeNodeId === 'string' &&
          Array.isArray(context.scheduledTicks) &&
          context.scheduledTicks.every((tick: unknown) => typeof tick === 'number') &&
          typeof context.isDeterministic === 'boolean') {
        canonicalSchedulerContext = {
          activeNodeId: context.activeNodeId,
          scheduledTicks: context.scheduledTicks,
          isDeterministic: context.isDeterministic,
        };
      } else {
        throw new Error('LegacySnapshot: Invalid scheduler context structure.');
      }
    } else {
      throw new Error('LegacySnapshot: context must be an object.');
    }

    if (typeof legacySnapshot.snapshotHash !== 'string') {
        throw new Error('LegacySnapshot: snapshotHash must be a string.');
    }

    // Reconstruct a temporary ExecutionSnapshotState for canonicalization
    const validatedExecutionSnapshotState: ExecutionSnapshotState = {
      workflowId: legacySnapshot.workflowId,
      executionStep: legacySnapshot.executionStep,
      nodeStates: nodeStatesMap,
      policyCache: policyCacheMap,
      context: canonicalSchedulerContext as Readonly<Record<string, any>>, // This cast is safe after validation
      snapshotHash: legacySnapshot.snapshotHash,
    };

    // Use the existing toCanonicalSnapshot for final conversion
    return toCanonicalSnapshot(validatedExecutionSnapshotState);
  }
}
