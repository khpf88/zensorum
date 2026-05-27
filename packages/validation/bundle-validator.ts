import { ExecutionBundle } from '@zensorum/application-contracts/types/execution-bundle';
import { InvariantChecker, InvariantResult } from './types';

export class BundleSchemaValidator implements InvariantChecker<ExecutionBundle> {
  check(bundle: ExecutionBundle): InvariantResult {
    const violations = [];

    if (!bundle.runId) {
      violations.push({
        code: 'MISSING_RUN_ID',
        message: 'Bundle missing runId',
        context: {},
      });
    }

    if (!bundle.finalStateHash) {
      violations.push({
        code: 'MISSING_FINAL_STATE_HASH',
        message: 'Bundle missing finalStateHash',
        context: {},
      });
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }
}
