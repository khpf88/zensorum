/**
 * Application-Safe Command Gateway
 */
export interface SubmitDischargeWorkflowCommand {
  type: 'SUBMIT_DISCHARGE';
  patientId: string;
}

export interface ApproveLabReviewCommand {
  type: 'APPROVE_LAB';
  sampleId: string;
}
