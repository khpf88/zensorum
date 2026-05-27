import { DeterministicFailure, FailureType } from '../contracts/failure';

export class ErrorFormatter {
  static format(
    command: string,
    type: FailureType,
    message: string,
    traceIds: { executionId?: string, replayId?: string, certificationId?: string, ledgerEntryId?: string }
  ): DeterministicFailure {
    return {
      failureType: type,
      ...traceIds,
      message,
      deterministic: true
    };
  }
}
