import { CommandResult } from '../contracts/result';

export type CertificationResult = {
  executionId: string;
  certified: boolean;
  certificationId?: string;
  certificationHash?: string;
  replayValidated: boolean;
  identityValidated: boolean;
  ledgerCommitted?: boolean;
};

export type CertificationCommandResult = CommandResult<CertificationResult>;
