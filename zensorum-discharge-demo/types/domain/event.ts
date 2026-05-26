import { WorkflowState } from './patient';

/**
 * Canonical Workflow Event Model
 * eventId is the ONLY deduplication key.
 */
export type WorkflowEvent = {
  eventId: string;        // globally unique and STABLE event id
  patientId: string;
  workflowId: string;     // canonical workflow identifier
  type: string;
  sequence: number;        // monotonic per patient stream
  timestamp: number;
  epoch: number;           // temporal isolation counter
  payload?: any;
};

export type RuntimeEvent = WorkflowEvent;
