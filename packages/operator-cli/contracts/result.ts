export type ExecutionPayload = {
  executionId: string;
  traceId: string;
  canonicalHash: string;
  status: "success" | "failed";
  message?: string;
};

export type CommandResult<T> = {
  command: string;
  deterministic: true;
  success: boolean;
  executionId?: string;
  replayId?: string;
  certificationId?: string;
  ledgerEntryId?: string;
  replayProtocolVersion?: string;
  projectionVersion?: string;
  payload: T;
};
