import { GoldenExecutionTrace, CertificationSeal, CertificationReplayReport } from '../types';
import { IdentityProjectionAuthority } from '@zensorum/core';
import { IClock } from '@zensorum/core/runtime/clock/IClock';
import { v4 as uuidv4 } from 'uuid';

/**
 * Enforces deterministic certification closure rules.
 */
export class CertificationClosureEngine {
  private clock: IClock;

  constructor(clock: IClock) {
    this.clock = clock;
  }
  
  /**
   * Finalizes replay and produces certification seal if valid.
   */
  finalizeReplayCertification(
    trace: GoldenExecutionTrace,
    replayedTicks: number,
    actualFinalHash: string,
    driftDetected: boolean,
    schedulerConsistency: boolean
  ): CertificationSeal {
    
    // Validate Invariants
    const isComplete = trace.schedulerSnapshots.length === replayedTicks;
    const hasParity = trace.finalExecutionHash === actualFinalHash;
    const identity = IdentityProjectionAuthority.computeIdentity(trace.bundle, 'IPA-v1');
    const identityMatch = identity === trace.bundle.executionIdentity;

    if (!isComplete || !hasParity || driftDetected || !schedulerConsistency || !identityMatch) {
      throw new Error(`Certification Invariant Violation: 
        Complete: ${isComplete}, 
        Parity: ${hasParity}, 
        Drift: ${driftDetected}, 
        Scheduler: ${schedulerConsistency}, 
        Identity: ${identityMatch}`);
    }

    const seal: Omit<CertificationSeal, 'certificationHash'> = {
      certificationId: uuidv4(),
      executionIdentity: identity,
      projectionVersion: 'IPA-v1',
      schemaVersion: '1.0.0',
      replayStatus: 'CERTIFIED',
      finalExecutionHash: actualFinalHash,
      certificationTimestamp: this.clock.now(),
      certificationAuthority: 'Zensorum Empirical Authority v1',
    };

    const certificationHash = IdentityProjectionAuthority.computeIdentity(seal, 'IPA-v1');

    return {
      ...seal,
      certificationHash
    };
  }
}
