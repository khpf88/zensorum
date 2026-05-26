import { WorkflowEvent } from '@/types/domain/event';
import { EntityWorkflowState, WorkflowDefinition } from '@/types/domain/workflow-runtime';
import { resolveEligibleTransitions } from '@/lib/runtime/orchestration/resolver';

// Strict Monotonic Ordering for the Discharge Workflow
const STAGE_ORDER = [
  'INITIATED',
  'CLINICALLY_CLEARED',
  'INSURANCE_VALIDATED',
  'MEDICATION_RECONCILIATED',
  'TRANSPORT_READY',
  'DISCHARGE_AUTHORIZED',
  'DISCHARGE_COMPLETED'
];

/**
 * Compliance-Grade State Reducer (Pure Function)
 * Enforces all business invariants at the mutation boundary.
 */
export const reduceState = (
  state: EntityWorkflowState,
  event: WorkflowEvent,
  definition: WorkflowDefinition
): EntityWorkflowState => {
  const transitionName = event.type.replace('WORKFLOW.', '');
  const patientId = state.entityId;
  
  // 1. Immutable State Guard (No mutation after terminal)
  if (state.locked || state.stage === 'DISCHARGE_COMPLETED') {
      return state;
  }

  // 2. Strict Idempotent Apply Guard
  const eventKey = `${event.patientId}:${event.type}:${event.sequence}`;
  if (state.appliedEventSet.includes(eventKey)) {
    return state;
  }

  // 3. Monotonic Sequence Guard
  // Reject backward or duplicate sequence events (except for re-initialization if epoch matches)
  if (event.sequence <= state.seq && event.type !== 'WORKFLOW.INITIATED') {
    return state;
  }

  // 4. Authorization Gate (Internal Reducer Guard)
  if (state.isAuthorized && transitionName !== 'DISCHARGE_COMPLETED' && transitionName !== state.stage) {
      return state;
  }

  // 5. DAG Structural Closure & Admissibility
  const eligible = resolveEligibleTransitions(state, definition);
  if (!eligible.includes(transitionName) && transitionName !== 'INITIATED') {
    return state;
  }

  // 6. Commit Transition (Pure State Creation)
  const nextState: EntityWorkflowState = { 
    ...state, 
    transitionHistory: [...state.transitionHistory, event], 
    stage: transitionName,
    seq: event.sequence,
    epoch: event.epoch,
    lastEvent: { type: event.type, seq: event.sequence },
    stateVersion: state.stateVersion + 1,
    lastUpdateTimestamp: event.timestamp
  };
  
  nextState.completedStates = Array.from(new Set([...state.completedStates, transitionName]));
  nextState.appliedEventSet = [...state.appliedEventSet, eventKey];
  
  // Cache transition Name
  const transitionLedgerKey = `${state.entityId}:${transitionName}`;
  nextState.appliedTransitions = [...state.appliedTransitions, transitionLedgerKey];

  // 7. Post-Transition Rule Enforcement
  if (transitionName === 'DISCHARGE_AUTHORIZED') {
      nextState.isAuthorized = true;
  }

  if (transitionName === 'DISCHARGE_COMPLETED') {
      nextState.locked = true;
  }

  // 8. Deterministic Dependency Projection
  nextState.dependencyState = {
    clinically_cleared: nextState.completedStates.includes('CLINICALLY_CLEARED'),
    insurance_validated: nextState.completedStates.includes('INSURANCE_VALIDATED') || 'pending',
    medication_reconciled: nextState.completedStates.includes('MEDICATION_RECONCILIATED') || 'pending',
    transport_ready: nextState.completedStates.includes('TRANSPORT_READY') || 'pending',
  };

  return nextState;
};

/**
 * Deterministic Closure Engine (Audit Projection Layer)
 */
export class OrchestrationEngine {
  public rebuildState(entityId: string, eventHistory: WorkflowEvent[], definition: WorkflowDefinition): EntityWorkflowState {
    const initialState: EntityWorkflowState = {
      entityId,
      stage: 'INITIATED',
      completedStates: [],
      locked: false,
      lastEvent: null,
      transitionHistory: [],
      appliedTransitions: [],
      appliedEventSet: [],
      stateVersion: 0,
      dependencyState: {
        clinically_cleared: false,
        insurance_validated: 'pending',
        medication_reconciled: 'pending',
        transport_ready: 'pending',
      },
      isAuthorized: false,
      lastUpdateTimestamp: 0,
      seq: 0,
      epoch: 0,
    };

    // Strict temporal sorting ensures deterministic reconstruction
    const sortedEvents = [...eventHistory].sort((a, b) => a.timestamp - b.timestamp);
    return sortedEvents.reduce((acc, event) => reduceState(acc, event, definition), initialState);
  }
}
