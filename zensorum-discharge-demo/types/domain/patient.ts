export enum WorkflowState {
  INITIATED = 'INITIATED',
  CLINICALLY_CLEARED = 'CLINICALLY_CLEARED',
  MEDICATION_PENDING = 'MEDICATION_PENDING',
  INSURANCE_PENDING = 'INSURANCE_PENDING',
  TRANSPORT_PENDING = 'TRANSPORT_PENDING',
  POLICY_VALIDATION = 'POLICY_VALIDATION',
  READY_FOR_DISCHARGE = 'READY_FOR_DISCHARGE',
  COMPLETED = 'COMPLETED',
  ESCALATED = 'ESCALATED',
  FAILED = 'FAILED',
  REPLAYING = 'REPLAYING',
}

export interface Patient {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  dischargePriority: number;
  workflowState: WorkflowState;
  dependencies: string[];
  governanceStatus: 'clean' | 'blocked' | 'escalated';
  assignedDepartment: string;
  replayId?: string;
  createdAt: string;
  updatedAt: string;
}
