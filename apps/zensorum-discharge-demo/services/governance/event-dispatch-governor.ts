import { RuntimeEvent } from "@/types/domain/event";
import { WorkflowState } from "@/types/domain/patient";
import { FSM_TRANSITIONS } from "@/types/domain/event-lifecycle-map";

/**
 * EventDispatchGovernor: Ensures per-entity serialization, monotonicity, and idempotency.
 */
class EventDispatchGovernor {
  private patientLocks: Set<string> = new Set();
  private patientStates: Record<string, WorkflowState> = {};
  private processedIds: Set<string> = new Set();

  async validateAndDispatch(event: RuntimeEvent, emit: (event: RuntimeEvent) => void) {
    const { eventId, patientId, type } = event;

    // 1. Idempotency Gate
    if (this.processedIds.has(eventId)) return;

    // 2. Serialization Lock
    if (this.patientLocks.has(patientId)) {
        console.warn(`[GOVERNOR] Concurrent transition attempted for patient ${patientId}. Locking.`);
        return;
    }
    this.patientLocks.add(patientId);

    try {
      const currentState = this.patientStates[patientId];
      
      // 3. Root Event Check
      if (!currentState) {
          if (type === 'WORKFLOW.INITIATED') {
              this.patientStates[patientId] = WorkflowState.INITIATED;
              this.processedIds.add(eventId);
              emit(event);
              return;
          }
          console.error(`[GOVERNOR] Illegal root event: ${type} for patient ${patientId}`);
          return;
      }

      // 4. Oscillation/Redundancy Guard
      const transition = FSM_TRANSITIONS[currentState];
      if (currentState === transition.next) {
          console.warn(`[GOVERNOR] State oscillation blocked: ${currentState} for patient ${patientId}`);
          return;
      }

      // 5. Monotonic FSM Enforcement
      if (transition && transition.event === type) {
        this.patientStates[patientId] = transition.next || currentState;
        this.processedIds.add(eventId);
        emit(event);
      } else {
        console.error(`[GOVERNOR] Invalid FSM transition: ${currentState} -> ${type} for patient ${patientId}`);
      }
    } finally {
      this.patientLocks.delete(patientId);
    }
  }
}

export const eventGovernor = new EventDispatchGovernor();
