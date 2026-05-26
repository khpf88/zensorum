export interface ReplaySession {
  id: string;
  originalRunId: string;
  startTime: string;
  events: any[];
  currentIndex: number;
  status: 'idle' | 'playing' | 'paused' | 'completed';
}

export interface TelemetrySnapshot {
  activeWorkflows: number;
  eventsPerSecond: number;
  governanceDecisionRate: number;
  escalationCount: number;
  replayQueueDepth: number;
  systemLatencyMs: number;
  dischargeThroughput: number;
  timestamp: string;
}
