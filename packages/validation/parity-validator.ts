import { ExecutionBundle } from '../../zensorum-discharge-demo/types/runtime/execution-bundle';
import { InvariantResult, Violation } from './types';

export class ParityValidator {
  compare(bundleA: ExecutionBundle, bundleB: ExecutionBundle): InvariantResult {
    const violations: Violation[] = [];

    // Basic parity checks (excluding runtime meta which is diagnostic only)
    if (bundleA.runId !== bundleB.runId) {
      violations.push({
        code: 'RUN_ID_MISMATCH',
        message: `RunID mismatch: ${bundleA.runId} vs ${bundleB.runId}`,
        context: { runIdA: bundleA.runId, runIdB: bundleB.runId },
      });
    }

    if (bundleA.finalStateHash !== bundleB.finalStateHash) {
      violations.push({
        code: 'FINAL_STATE_HASH_MISMATCH',
        message: 'Final state hash mismatch',
        context: { hashA: bundleA.finalStateHash, hashB: bundleB.finalStateHash },
      });
    }

    // Hash parity (assuming canonical JSON and sorted keys)
    if (bundleA.eventStreamHash !== bundleB.eventStreamHash) {
      violations.push({
        code: 'EVENT_STREAM_HASH_MISMATCH',
        message: 'Event stream hash mismatch',
        context: { hashA: bundleA.eventStreamHash, hashB: bundleB.eventStreamHash },
      });
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }
}
