import { GoldenTrace } from './golden-trace';
import { InvariantChecker, InvariantResult } from './types';

export class ReplayContinuityValidator implements InvariantChecker<GoldenTrace> {
  check(trace: GoldenTrace): InvariantResult {
    const violations = [];

    // 1. Verify timeline monotonicity
    for (let i = 0; i < trace.bundle.stateHashTimeline.length; i++) {
      if (trace.bundle.stateHashTimeline[i].stepIndex !== i) {
        violations.push({
          code: 'STATE_TIMELINE_NON_MONOTONIC',
          message: `Timeline mismatch at index ${i}: expected step ${i}, got ${trace.bundle.stateHashTimeline[i].stepIndex}`,
          context: { stepIndex: trace.bundle.stateHashTimeline[i].stepIndex, expectedIndex: i },
        });
      }
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }
}
