import { WorkflowDefinition } from '@/types/domain/workflow-runtime';

/**
 * ZENSORUM DISCHARGE WORKFLOW (Hardened Definition)
 * Parallel Fan-out + Gated Fan-in
 */
export const DISCHARGE_WORKFLOW: WorkflowDefinition = {
  id: 'hospital_discharge_v2',
  states: [
    'INITIATED',
    'CLINICALLY_CLEARED',
    'INSURANCE_VALIDATED',
    'MEDICATION_RECONCILIATED',
    'TRANSPORT_READY',
    'DISCHARGE_AUTHORIZED',
    'DISCHARGE_COMPLETED'
  ],
  transitions: [
    { from: 'INITIATED', to: 'CLINICALLY_CLEARED' },
    // Parallel Fan-out
    { from: 'CLINICALLY_CLEARED', to: 'INSURANCE_VALIDATED' },
    { from: 'CLINICALLY_CLEARED', to: 'MEDICATION_RECONCILIATED' },
    { from: 'CLINICALLY_CLEARED', to: 'TRANSPORT_READY' },
    // Fan-in to Gate
    { from: 'INSURANCE_VALIDATED', to: 'DISCHARGE_AUTHORIZED' },
    { from: 'MEDICATION_RECONCILIATED', to: 'DISCHARGE_AUTHORIZED' },
    { from: 'TRANSPORT_READY', to: 'DISCHARGE_AUTHORIZED' },
    // Final
    { from: 'DISCHARGE_AUTHORIZED', to: 'DISCHARGE_COMPLETED' }
  ],
  gates: [
    {
      target: 'DISCHARGE_AUTHORIZED',
      requires: ['INSURANCE_VALIDATED', 'MEDICATION_RECONCILIATED', 'TRANSPORT_READY']
    },
    {
      target: 'DISCHARGE_COMPLETED',
      requires: ['DISCHARGE_AUTHORIZED']
    }
  ]
};
