/**
 * Formal Execution Trace API
 */
export interface NodeSummary {
  nodeId: string;
  status: 'PENDING' | 'EXECUTING' | 'COMPLETED' | 'FAILED';
  completedAt?: string;
}

export interface ExecutionTrace {
  workflowId: string;
  executionId: string;
  nodeExecutionSummaries: NodeSummary[];
  executionTimeline: { event: string; timestamp: string }[];
  uiSafeStatus: 'RUNNING' | 'FINISHED' | 'ERROR';
  deterministicReplayReference: string;
}
