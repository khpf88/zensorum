import { CertificationClosureEngine } from '@zensorum/replay';
import { GoldenExecutionTrace } from '@zensorum/replay';

export class CertificationFacade {
  private engine = new CertificationClosureEngine();

  finalize(trace: GoldenExecutionTrace, ticks: number, hash: string, drift: boolean) {
    return this.engine.finalizeReplayCertification(trace, ticks, hash, drift, true);
  }
}
