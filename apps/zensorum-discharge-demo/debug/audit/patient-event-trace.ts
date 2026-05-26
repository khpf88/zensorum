import { useOperationsStore } from '@/store/operations.store';

export const tracePatientEvents = (patientId: string) => {
  const events = useOperationsStore.getState().eventLedger;
  const patientEvents = events
    .filter(e => e.patientId === patientId)
    .sort((a, b) => a.timestamp - b.timestamp);

  console.log(`--- Trace for Patient: ${patientId} ---`);
  patientEvents.forEach((e, i) => {
    console.log(`${i + 1}. [${e.type}]`);
  });
  
  return patientEvents;
};
