import { ExecutionBundle } from '../../zensorum-discharge-demo/types/runtime/execution-bundle';
import { InvariantChecker, InvariantResult } from './types';

export class DagLineageValidator implements InvariantChecker<ExecutionBundle> {
  check(bundle: ExecutionBundle): InvariantResult {
    const violations = [];
    const processedEvents = new Set<string>();

    for (const entry of bundle.eventOrder) {
      // 1. Verify parent causality
      for (const parentId of entry.parentEventIds) {
        if (!processedEvents.has(parentId)) {
          violations.push({
            code: 'CAUSALITY_VIOLATION',
            message: `Event ${entry.eventId} references unknown or future parent ${parentId}`,
            context: { eventId: entry.eventId, parentId },
          });
        }
      }

      // 2. Verify uniqueness
      if (processedEvents.has(entry.eventId)) {
        violations.push({
          code: 'DUPLICATE_EVENT_ID',
          message: `Event ${entry.eventId} already processed`,
          context: { eventId: entry.eventId },
        });
      }

      processedEvents.add(entry.eventId);
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }
}
