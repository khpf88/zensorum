import { 
  EntityWorkflowState, 
  WorkflowDefinition
} from '@/types/domain/workflow-runtime';
import { WorkflowEvent } from '@/types/domain/event';
import { DependencyResolver } from './resolver';

/**
 * Zensorum Orchestration Reducer
 * Rebuilds state purely from event log with dependency awareness.
 */
export function reduceOrchestrationState(
  state: EntityWorkflowState, 
  event: WorkflowEvent, 
  resolver: DependencyResolver
): EntityWorkflowState {
  
  // 0. Defense-in-Depth Idempotency Check
  if (state.appliedEventSet.includes(event.eventId)) {
    return state;
  }

  // 1. Monotonic Sequence Validation
  if (event.sequence !== state.seq + 1) {
    console.warn(`[Runtime] Sequence Gap Rejected. Entity: ${state.entityId}, Event: ${event.type}, Expected: ${state.seq + 1}, Got: ${event.sequence}`);
    return state;
  }

  // 2. Transition Validity Check
  const targetState = event.type.replace('WORKFLOW.', '');
  if (!resolver.isTransitionLegal(state, targetState)) {
    console.error(`[Runtime] Illegal Orchestration Step: ${targetState} is not eligible for ${state.entityId}. Dependencies missing or state already complete.`);
    return state;
  }

  // 3. Commit State
  return {
    ...state,
    completedStates: Array.from(new Set([...state.completedStates, targetState])),
    transitionHistory: [...state.transitionHistory, event],
    appliedEventSet: [...state.appliedEventSet, event.eventId],
    seq: event.sequence,
    stateVersion: state.stateVersion + 1,
    lastUpdateTimestamp: event.timestamp,
    lastEvent: { type: event.type, seq: event.sequence }
  };
}
