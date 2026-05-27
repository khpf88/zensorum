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
