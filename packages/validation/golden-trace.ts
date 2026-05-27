import { ExecutionBundle } from '@zensorum/application-contracts/types/execution-bundle';
import { ExecutionSnapshotState } from './snapshot';

/**
 * Golden Trace
 * The canonical, immutable artifact for empirical replay verification.
 */
export interface GoldenTrace {
  // Foundation
  bundle: ExecutionBundle;
  
  // Scheduling and Replay Metadata
  schedulerSnapshots: ExecutionSnapshotState[];
  tickOrdering: string[]; // Ordered list of event IDs for tick-based replay
  
  // Semantic Outcomes
  policyOutcomes: ReadonlyMap<string, boolean>;
  nodeTransitions: Array<{ from: string; to: string; tick: number }>;
  
  // Verification Artifacts
  finalStateHash: string;
}
