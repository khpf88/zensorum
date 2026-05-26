import { useOperationsStore } from '../store/operations.store';

const store = useOperationsStore.getState();
console.log('Initial Patients:', Object.keys(store.patients));

const patientId = 'test-patient-id';
store.dispatch({
    eventId: 'test-event-id',
    patientId: patientId,
    type: 'WORKFLOW.INITIATED',
    sequence: 1,
    timestamp: Date.now()
} as any);

const updatedStore = useOperationsStore.getState();
console.log('Updated Patients:', Object.keys(updatedStore.patients));
console.log('Is same instance?', store === updatedStore);
