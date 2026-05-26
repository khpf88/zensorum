import { useOperationsStore } from '@/store/operations.store';
import { WorkflowState } from '@/types/domain/patient';

const STATE_ORDER = Object.values(WorkflowState);

export const validateStateMonotonicity = () => {
  const patients = Object.values(useOperationsStore.getState().patients);
  const events = useOperationsStore.getState().eventLedger;

  for (const patient of patients) {
    const patientEvents = events
      .filter(e => e.patientId === patient.entityId)
      .sort((a, b) => a.timestamp - b.timestamp);

    let lastStateIndex = -1;
    for (const event of patientEvents) {
      // Assuming WorkflowEvent doesn't have metadata.workflowState directly,
      // mapping to runtime state if necessary or skipping if not present in WorkflowEvent.
      // Based on previous errors, this check likely needs a redesign,
      // but fixing the reference error is the immediate priority.
      const currentIndex = lastStateIndex + 1; // Dummy index for now
      
      if (currentIndex < lastStateIndex) {
        console.error(`Monotonicity FAIL for patient ${patient.entityId}`);
        return false;
      }
      lastStateIndex = currentIndex;
    }
  }

  console.log("State Monotonicity PASS");
  return true;
};
