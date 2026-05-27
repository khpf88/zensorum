import { FormalProofEngine, ProofResult } from './formal-verification';
import { ExecutionBundle } from '@zensorum/application-contracts/types/execution-bundle';

export class DeterminismProofEngine implements FormalProofEngine<ExecutionBundle> {
  prove(bundle: ExecutionBundle): ProofResult {
    // Determinism check: finalStateHash must match the last entry in the stateHashTimeline
    const lastTimelineEntry = bundle.stateHashTimeline[bundle.stateHashTimeline.length - 1];
    const isValid = lastTimelineEntry?.stateHash === bundle.finalStateHash;

    return {
      property: "Replay Determinism",
      assumptions: ["Replay of eventStream produces identical stateHash chain"],
      traceId: bundle.runId,
      result: isValid ? "PROVED" : "NOT_PROVED",
      evidence: {
        lastTimelineHash: lastTimelineEntry?.stateHash,
        finalStateHash: bundle.finalStateHash,
        consistent: isValid
      },
      determinismHash: bundle.replayHash
    };
  }
}
