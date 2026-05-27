import { ReplayValidationEngine } from '@zensorum/replay';
import { GoldenExecutionTrace } from '@zensorum/replay';

export class ReplayFacade {
  private engine = new ReplayValidationEngine();

  async validate(trace: GoldenExecutionTrace) {
    return await this.engine.replay(trace);
  }
}
