import { CommandResult } from '../contracts/result';

export type ReplayResult = {
  executionId: string;
  replayProtocolVersion: string;
  parity: boolean;
  schedulerParity?: boolean;
  runtimeStateParity?: boolean;
  driftDetected: boolean;
  driftSummary?: {
    nodeCount: number;
    mismatchCount: number;
  };
};

export type ReplayCommandResult = CommandResult<ReplayResult>;
