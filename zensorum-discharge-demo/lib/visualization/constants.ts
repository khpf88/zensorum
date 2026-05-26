/**
 * React Flow Constants
 * Defined outside components to ensure absolute reference stability.
 */
export const NODE_TYPES = {};
export const EDGE_TYPES = {};
export const DEFAULT_EDGE_OPTIONS = {
  style: { strokeWidth: 1 },
};
export const CONNECTION_LINE_STYLE = { stroke: '#fff' };

export const WORKFLOW_LAYOUT: Record<string, { x: number, y: number }> = {
  'INITIATED': { x: 0, y: 0 },
  'CLINICALLY_CLEARED': { x: 0, y: 100 },
  'INSURANCE_VALIDATED': { x: -150, y: 200 },
  'MEDICATION_RECONCILIATED': { x: 0, y: 200 },
  'TRANSPORT_READY': { x: 150, y: 200 },
  'DISCHARGE_AUTHORIZED': { x: 0, y: 300 },
  'DISCHARGE_COMPLETED': { x: 0, y: 400 }
};
