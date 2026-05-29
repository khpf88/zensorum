import { ReplayCommandResult } from '../../contracts/replayResult';
import { ReplayValidationEngine } from '@zensorum/replay';
import { ErrorFormatter } from '../../diagnostics/errorFormatter';
import { FailureType } from '../../contracts/failure';
import { FileSystemArtifactStore, GoldenExecutionTrace } from '@zensorum/replay';
import { DeterministicClock } from '@zensorum/core';
import * as path from 'path';

export class ReplayService {
  private engine = new ReplayValidationEngine(new DeterministicClock());
  private artifactStore = new FileSystemArtifactStore(path.resolve(process.cwd(), '.artifacts'), new DeterministicClock());
//...

  async runReplay(executionId: string): Promise<ReplayCommandResult | any> {
    try {
      // 1. Load Persisted Trace
      const trace = await this.artifactStore.getArtifact<GoldenExecutionTrace>(executionId, 'TRACE');

      if (!trace) {
        return ErrorFormatter.format('replay', FailureType.REPLAY_PARITY_FAILURE, `Execution trace not found for ID: ${executionId}`, { executionId });
      }

      // 2. Validate Replay via Engine
      const report = await this.engine.replay(trace);

      // 3. Persist Replay Report
      await this.artifactStore.putArtifact(executionId, 'REPLAY_REPORT', report);
//...

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
