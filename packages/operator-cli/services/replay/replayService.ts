import { ReplayCommandResult } from '../../contracts/replayResult';
import { ReplayFacade } from '../../adapters/replayFacade';
import { ErrorFormatter } from '../../diagnostics/errorFormatter';
import { FailureType } from '../../contracts/failure';

export class ReplayService {
  private facade = new ReplayFacade();

  async runReplay(executionId: string): Promise<ReplayCommandResult | any> {
    try {
      const trace = { bundle: { runId: executionId }, schedulerSnapshots: [] } as any;
      const report = await this.facade.validate(trace);
      
      if (report.replayStatus !== 'SUCCESS') {
          return ErrorFormatter.format('replay', FailureType.REPLAY_PARITY_FAILURE, 'Parity mismatch detected', { executionId });
      }

      return {
        command: 'replay',
        deterministic: true,
        success: true,
        executionId,
        replayId: 'rep_' + executionId,
        replayProtocolVersion: '0.1.0',
        payload: {
          executionId,
          replayProtocolVersion: '0.1.0',
          parity: report.hashParity,
          driftDetected: report.driftDetected,
        }
      };
    } catch (e) {
      return ErrorFormatter.format('replay', FailureType.UNKNOWN_DETERMINISTIC_FAILURE, (e as Error).message, { executionId });
    }
  }
}
