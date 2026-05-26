import { WorkflowState } from './patient';

/**
 * FSM Transition Registry
 * Defines the EXACT event required to move from CurrentState -> NextState
 */
export const FSM_TRANSITIONS: Record<WorkflowState, { next: WorkflowState | null, event: string }> = {
  [WorkflowState.INITIATED]: { 
    next: WorkflowState.CLINICALLY_CLEARED, 
    event: 'WORKFLOW.CLINICALLY_CLEARED' 
  },
  [WorkflowState.CLINICALLY_CLEARED]: { 
    next: WorkflowState.POLICY_VALIDATION, 
    event: 'WORKFLOW.POLICY_VALIDATION_PASSED' 
  },
  [WorkflowState.POLICY_VALIDATION]: { 
    next: WorkflowState.INSURANCE_PENDING, 
    event: 'WORKFLOW.INSURANCE_VALIDATION_COMPLETED' 
  },
  [WorkflowState.INSURANCE_PENDING]: { 
    next: WorkflowState.MEDICATION_PENDING, 
    event: 'WORKFLOW.MEDICATION_RECONCILIATION_STARTED' 
  },
  [WorkflowState.MEDICATION_PENDING]: { 
    next: WorkflowState.TRANSPORT_PENDING, 
    event: 'WORKFLOW.TRANSPORT_REQUESTED' 
  },
  [WorkflowState.TRANSPORT_PENDING]: { 
    next: WorkflowState.READY_FOR_DISCHARGE, 
    event: 'WORKFLOW.DISCHARGE_AUTHORIZED' 
  },
  [WorkflowState.READY_FOR_DISCHARGE]: { 
    next: WorkflowState.COMPLETED, 
    event: 'WORKFLOW.DISCHARGE_COMPLETED' 
  },
  [WorkflowState.COMPLETED]: { next: null, event: '' },
  [WorkflowState.ESCALATED]: { next: null, event: '' },
  [WorkflowState.FAILED]: { next: null, event: '' },
  [WorkflowState.REPLAYING]: { next: null, event: '' },
};
