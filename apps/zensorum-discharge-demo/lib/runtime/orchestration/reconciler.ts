import { WorkflowEvent } from '@/types/domain/event';
import { EntityWorkflowState, WorkflowDefinition } from '@/types/domain/workflow-runtime';
import { reduceState } from '@/lib/runtime/orchestration/engine';
import { resolveEligibleTransitions } from '@/lib/runtime/orchestration/resolver';
import { v4 as uuidv4 } from 'uuid';

/**
 * Deterministic Fixpoint Reconciler
 * Performs full DAG reconciliation until state quiescence.
 */
export const reconcileAllEntities = (
  patients: Record<string, EntityWorkflowState>,
  definition: WorkflowDefinition
): Record<string, EntityWorkflowState> => {
  let currentPatients = JSON.parse(JSON.stringify(patients)); // Snapshotted state
  let changed = true;

  // Fixpoint iteration
  while (changed) {
    changed = false;
    
    // Deterministic Entity Ordering
    const entityIds = Object.keys(currentPatients).sort();

    for (const entityId of entityIds) {
      const entity = currentPatients[entityId];
      
      // Deterministic Node Ordering
      const eligible = resolveEligibleTransitions(entity, definition).sort();

      for (const transitionName of eligible) {
        // Create a derived event for this transition
        const derivedEvent: WorkflowEvent = {
          eventId: uuidv4(),
          patientId: entityId,
          workflowId: definition.id,
          type: `WORKFLOW.${transitionName}`,
          sequence: entity.stateVersion + 1,
          timestamp: Date.now(),
          epoch: entity.epoch,
        };

        const nextState = reduceState(entity, derivedEvent, definition);

        // State update check
        if (nextState !== entity) {
          currentPatients[entityId] = nextState;
          changed = true;
          // IMPORTANT: Re-evaluate after any change to enforce fixpoint
          break; 
        }
      }
      if (changed) break; // Break entity loop if change occurred to re-evaluate from scratch
    }
  }

  return currentPatients;
};
