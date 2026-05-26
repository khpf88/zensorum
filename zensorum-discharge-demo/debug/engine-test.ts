import { OrchestrationEngine } from '../lib/runtime/orchestration/engine';
import { DISCHARGE_WORKFLOW } from '../lib/runtime/orchestration/definition';

const engine = new OrchestrationEngine();
const patientId = 'test-patient-123';

const events: any[] = [
  {
    eventId: 'evt-1',
    patientId,
    type: 'WORKFLOW.INITIATED',
    sequence: 1,
    timestamp: Date.now(),
  }
];

const state = engine.rebuildState(patientId, events, DISCHARGE_WORKFLOW);

console.log('--- Orchestration Engine Test ---');
console.log('Completed States:', JSON.stringify(state.completedStates));

if (state.completedStates.includes('INITIATED')) {
  console.log('SUCCESS: INITIATED state captured.');
} else {
  console.error('FAILURE: INITIATED state not captured.');
}
