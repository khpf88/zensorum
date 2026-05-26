import { WorkflowEvent } from './event';

export enum StateStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  BLOCKED = 'BLOCKED',
}

export interface WorkflowTransition {
  from: string;
  to: string;
}

export interface WorkflowGate {
  target: string;
  requires: string[];
}

export interface WorkflowDefinition {
  id: string;
  states: string[];
  transitions: WorkflowTransition[];
  gates: WorkflowGate[];
}

export interface EntityWorkflowState {
  entityId: string;
  stage: string;               // Current workflow stage
  seq: number;                 // Monotonic sequence
  epoch: number;               // Current active epoch
  locked: boolean;             // Final completion lock
  lastEvent: { type: string, seq: number } | null;
  completedStates: string[];
  transitionHistory: WorkflowEvent[];
  appliedTransitions: string[];
  appliedEventSet: string[];   // For idempotent apply guard
  stateVersion: number;
  dependencyState: Record<string, boolean | 'pending'>;
  isAuthorized: boolean;
  lastUpdateTimestamp: number;
  _loggedTerminal?: boolean;
}
