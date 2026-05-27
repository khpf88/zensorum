import { CommandResult } from '../contracts/result';

export class OutputFormatter {
  static format<T>(result: CommandResult<T>): string {
    // Ensure deterministic ordering for serialization
    const orderedResult = {
        command: result.command,
        deterministic: result.deterministic,
        success: result.success,
        executionId: result.executionId,
        replayId: result.replayId,
        certificationId: result.certificationId,
        ledgerEntryId: result.ledgerEntryId,
        replayProtocolVersion: result.replayProtocolVersion,
        projectionVersion: result.projectionVersion,
        payload: result.payload
    };
    return JSON.stringify(orderedResult, null, 2);
  }
}
