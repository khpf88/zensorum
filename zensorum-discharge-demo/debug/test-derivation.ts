import { deriveGraphElements } from '../store/selectors/graph.selectors';

const mockPatients = {
  'test-patient-123': {
    entityId: 'test-patient-123',
    completedStates: ['INITIATED'],
    activeStates: [],
    blockedStates: [],
    transitionHistory: [],
    appliedEventIds: [],
    currentSequence: 1,
  } as any
};

const result = deriveGraphElements(mockPatients);
console.log('Result:', JSON.stringify(result, null, 2));
