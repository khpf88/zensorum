import { ExecutionBundle } from '../../zensorum-discharge-demo/types/runtime/execution-bundle';
import { InvariantChecker, InvariantResult } from './types';

export class ReplayContinuityValidator implements InvariantChecker<ExecutionBundle> {
  check(bundle: ExecutionBundle): InvariantResult {
    const violations = [];

    // 1. Verify timeline monotonicity
    for (let i = 0; i < bundle.stateHashTimeline.length; i++) {
      if (bundle.stateHashTimeline[i].stepIndex !== i) {
        violations.push({
          code: 'STATE_TIMELINE_NON_MONOTONIC',
          message: `Timeline mismatch at index ${i}: expected step ${i}, got ${bundle.stateHashTimeline[i].stepIndex}`,
          context: { stepIndex: bundle.stateHashTimeline[i].stepIndex, expectedIndex: i },
        });
      }
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }
}
