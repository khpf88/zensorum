import { WorkflowState } from './patient';

/**
 * Event-to-State Mapping
 * Used by the reducer to project events into patient states.
 */
export const EventToWorkflowMap: Record<string, WorkflowState> = {
  'WORKFLOW.INITIATED': WorkflowState.INITIATED,
  'WORKFLOW.CLINICALLY_CLEARED': WorkflowState.CLINICALLY_CLEARED,
  'WORKFLOW.POLICY_VALIDATION_PASSED': WorkflowState.POLICY_VALIDATION,
  'WORKFLOW.INSURANCE_VALIDATION_COMPLETED': WorkflowState.INSURANCE_PENDING,
  'WORKFLOW.MEDICATION_RECONCILIATION_STARTED': WorkflowState.MEDICATION_PENDING,
  'WORKFLOW.TRANSPORT_REQUESTED': WorkflowState.TRANSPORT_PENDING,
  'WORKFLOW.DISCHARGE_AUTHORIZED': WorkflowState.READY_FOR_DISCHARGE,
  'WORKFLOW.DISCHARGE_COMPLETED': WorkflowState.COMPLETED,
};
