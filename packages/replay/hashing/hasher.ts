import { IdentityProjectionAuthority } from '@zensorum/core';
import { ExecutionSnapshotState } from '@zensorum/validation/snapshot';
import { GoldenExecutionTrace } from '../types';

/**
 * DeterministicStateHasher
 * Ensures canonical, environment-independent hashing of runtime state.
 * NOW INTEGRATED WITH IPA.
 */
export class DeterministicStateHasher {

  /**
   * Hashes a snapshot of the runtime state using IPA.
   */
  static hashSnapshot(snapshot: ExecutionSnapshotState): string {
    // Project state using IPA instead of local logic
    const projection = IdentityProjectionAuthority.project(snapshot, 'IPA-v1');
    return IdentityProjectionAuthority.computeIdentity(projection, 'IPA-v1');
  }

  /**
   * Hashes cumulative artifacts (e.g., full Golden Trace).
   */
  static hashArtifact(data: GoldenExecutionTrace): string {
    // IPA handles identity of artifacts
    return IdentityProjectionAuthority.computeIdentity(data, 'IPA-v1');
  }
}

