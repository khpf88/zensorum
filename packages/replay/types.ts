import { ExecutionBundle } from '@zensorum/application-contracts/types/execution-bundle';
import { ExecutionSnapshotState } from '@zensorum/validation/snapshot';

/**
 * Golden Trace
 * The canonical, immutable artifact for empirical replay verification.
 */
export interface GoldenExecutionTrace {
  version: ReplayProtocolVersion;
  bundle: ExecutionBundle;
  schedulerSnapshots: ExecutionSnapshotState[];
  tickOrdering: string[]; // Ordered list of event IDs for tick-based replay
  nodeTransitions: Array<{ from: string; to: string; tick: number }>;
  policyOutcomes: ReadonlyMap<string, boolean>;
  runtimeStateHashes: ReadonlyMap<number, string>; // stepIndex -> stateHash
  finalExecutionHash: string;
}

// Structured LegacySnapshot to force explicit migration and validation
export interface LegacySnapshot {
  workflowId: unknown;
  executionStep: unknown;
  nodeStates: unknown;
  policyCache: unknown;
  context: unknown;
  snapshotHash: unknown;
}

export interface ReplayProtocolVersion {
  major: number;
  minor: number;
  patch: number;
}

export type CompatibilityStatus = 
  | 'COMPATIBLE'
  | 'INCOMPATIBLE'
  | 'DEGRADED_COMPATIBILITY';

export interface CertificationSeal {
  certificationId: string;
  executionIdentity: string;
  projectionVersion: string;
  schemaVersion: string;
  replayStatus: 'CERTIFIED' | 'FAILED';
  finalExecutionHash: string;
  certificationTimestamp: string;
  certificationAuthority: string;
  certificationHash: string; // SHA-256 of the seal itself
}

export type DriftType = 
  | 'NODE_STATE_MISMATCH'
  | 'POLICY_CACHE_MISMATCH'
  | 'SCHEDULER_DECISION_MISMATCH'
  | 'STATE_HASH_MISMATCH';

// Canonical representation of a drifted value for deterministic reporting
export type CanonicalDriftValue = string; 

export interface DriftReport {
  tickIndex: number;
  nodeId: string | null;
  driftType: DriftType;
  expectedValue: CanonicalDriftValue;
  actualValue: CanonicalDriftValue;
  reason: string;
}

export interface CertificationReplayReport {
  timestamp: string;
  traceId: string;
  replayStatus: 'SUCCESS' | 'FAILURE';
  compatibilityStatus: CompatibilityStatus;
  hashParity: boolean; // FinalExecutionHash match
  driftDetected: boolean;
  driftReport?: DriftReport;
  invariantVerification: {
    valid: boolean;
    violations: string[];
  };
  schedulerConsistency: boolean;
  seal?: CertificationSeal;
}

