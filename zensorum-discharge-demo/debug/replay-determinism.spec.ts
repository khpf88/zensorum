import { OrchestrationEngine } from '../lib/runtime/orchestration/engine';
import { WorkflowEvent } from '../types/domain/event';
import { v4 as uuidv4 } from 'uuid';

const engine = new OrchestrationEngine();
const patientId = 'test-patient-replay';

const baseEvents: WorkflowEvent[] = [
  { eventId: uuidv4(), patientId, type: 'WORKFLOW.INITIATED', sequence: 1, timestamp: 1000 },
  { eventId: uuidv4(), patientId, type: 'WORKFLOW.CLINICALLY_CLEARED', sequence: 2, timestamp: 2000 },
  { eventId: uuidv4(), patientId, type: 'WORKFLOW.INSURANCE_VALIDATED', sequence: 3, timestamp: 3000 },
  { eventId: uuidv4(), patientId, type: 'WORKFLOW.MEDICATION_RECONCILIATED', sequence: 4, timestamp: 4000 },
  { eventId: uuidv4(), patientId, type: 'WORKFLOW.TRANSPORT_READY', sequence: 5, timestamp: 5000 },
];

function shuffle(array: any[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

console.log('--- Deterministic Replay Test ---');

const runReplay = (events: WorkflowEvent[]) => {
  return engine.rebuildState(patientId, events);
};

// Replay 10 times with shuffled events
const finalStates = [];
for (let i = 0; i < 10; i++) {
  const shuffled = shuffle(baseEvents);
  finalStates.push(runReplay(shuffled));
}

// Assertions
const firstState = JSON.stringify(finalStates[0].completedStates.sort());
const allMatch = finalStates.every(s => JSON.stringify(s.completedStates.sort()) === firstState);

console.log('All replays match final completedStates:', allMatch);
console.log('Final State Version:', finalStates[0].stateVersion);

if (allMatch) {
    console.log('SUCCESS: Determinism achieved.');
} else {
    console.error('FAILURE: Deterministic replay failed.');
}
