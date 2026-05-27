import { CommandResult } from '../contracts/result';

export type LedgerInspectionResult = {
  executionId: string;
  certificationId?: string;
  ledgerEntryId?: string;
  hashChainValid: boolean;
  previousHash?: string;
  currentHash?: string;
  certificationTimestamp?: string;
};

export type LedgerCommandResult = CommandResult<LedgerInspectionResult>;
