import { WorkflowState } from '@/types/domain/patient';

export const StateColorMap: Record<WorkflowState, string> = {
  [WorkflowState.INITIATED]: '#64748b',        // Slate
  [WorkflowState.CLINICALLY_CLEARED]: '#3b82f6', // Blue
  [WorkflowState.MEDICATION_PENDING]: '#eab308', // Amber
  [WorkflowState.INSURANCE_PENDING]: '#f59e0b',  // Amber
  [WorkflowState.TRANSPORT_PENDING]: '#8b5cf6',  // Violet
  [WorkflowState.POLICY_VALIDATION]: '#d946ef',  // Fuchsia
  [WorkflowState.READY_FOR_DISCHARGE]: '#10b981',// Emerald
  [WorkflowState.COMPLETED]: '#064e3b',          // Dark Emerald
  [WorkflowState.ESCALATED]: '#ef4444',          // Red
  [WorkflowState.FAILED]: '#991b1b',             // Dark Red
  [WorkflowState.REPLAYING]: '#8b5cf6',          // Violet
};
