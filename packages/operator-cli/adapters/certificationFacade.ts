import { CertificationClosureEngine } from '@zensorum/replay';
import { GoldenExecutionTrace } from '@zensorum/replay';
import { IClock } from '@zensorum/core';

export class CertificationFacade {
  private engine: CertificationClosureEngine;

  constructor(clock: IClock) {
    this.engine = new CertificationClosureEngine(clock);
  }

  finalize(trace: GoldenExecutionTrace, ticks: number, hash: string, drift: boolean) {
    return this.engine.finalizeReplayCertification(trace, ticks, hash, drift, true);
  }
}
