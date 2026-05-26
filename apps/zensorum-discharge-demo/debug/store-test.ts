import { useOperationsStore } from '../store/operations.store';

const store = useOperationsStore.getState();
const patientId = 'test-patient-123';

const event = {
  eventId: 'evt-1',
  patientId,
  type: 'WORKFLOW.INITIATED',
  sequence: 1,
  timestamp: Date.now(),
};

console.log('Dispatching event...');
store.dispatch(event as any);

const state = useOperationsStore.getState();
console.log('Patients in store:', Object.keys(state.patients));
console.log('Patient state:', JSON.stringify(state.patients[patientId]));

if (state.patients[patientId]) {
  console.log('SUCCESS: Patient added to store.');
} else {
  console.error('FAILURE: Patient not found in store.');
}
