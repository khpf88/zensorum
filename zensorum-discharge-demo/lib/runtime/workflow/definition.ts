import { WorkflowDefinition } from '@/types/domain/workflow-runtime';

/**
 * ZENSORUM DISCHARGE WORKFLOW (Authoritative Definition)
 * Demonstrates Parallel Fan-out and Gated Fan-in
 */
export const DISCHARGE_WORKFLOW: WorkflowDefinition = {
  id: 'hospital_discharge_v1',
  states: [
    'INITIATED',
    'CLINICALLY_CLEARED',
    'INSURANCE_VALIDATED',
    'MEDICATION_RECONCILED',
    'TRANSPORT_READY',
    'DISCHARGE_AUTHORIZED',
    'DISCHARGE_COMPLETED'
  ],
  transitions: [
    { from: 'INITIATED', to: 'CLINICALLY_CLEARED' },
    // Parallel Fan-out from Clinically Cleared
    { from: 'CLINICALLY_CLEARED', to: 'INSURANCE_VALIDATED' },
    { from: 'CLINICALLY_CLEARED', to: 'MEDICATION_RECONCILED' },
    { from: 'CLINICALLY_CLEARED', to: 'TRANSPORT_READY' },
    // Transitions into the Gate
    { from: 'INSURANCE_VALIDATED', to: 'DISCHARGE_AUTHORIZED' },
    { from: 'MEDICATION_RECONCILED', to: 'DISCHARGE_AUTHORIZED' },
    { from: 'TRANSPORT_READY', to: 'DISCHARGE_AUTHORIZED' },
    // Final Completion
    { from: 'DISCHARGE_AUTHORIZED', to: 'DISCHARGE_COMPLETED' }
  ],
  gates: [
    {
      target: 'DISCHARGE_AUTHORIZED',
      requires: ['INSURANCE_VALIDATED', 'MEDICATION_RECONCILED', 'TRANSPORT_READY']
    },
    {
      target: 'DISCHARGE_COMPLETED',
      requires: ['DISCHARGE_AUTHORIZED']
    }
  ]
};
