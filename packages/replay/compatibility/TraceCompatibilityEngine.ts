import { GoldenExecutionTrace, ReplayProtocolVersion, CompatibilityStatus } from '../types';

/**
 * Ensures determinism across system evolution.
 */
export class TraceCompatibilityEngine {
  // Current runtime protocol version
  private readonly CURRENT_VERSION: ReplayProtocolVersion = { major: 1, minor: 0, patch: 0 };

  /**
   * Validates if a trace can be replayed under the current runtime version.
   */
  validateTraceCompatibility(trace: GoldenExecutionTrace): CompatibilityStatus {
    if (trace.version.major !== this.CURRENT_VERSION.major) {
      return 'INCOMPATIBLE';
    }
    if (trace.version.minor < this.CURRENT_VERSION.minor) {
      return 'DEGRADED_COMPATIBILITY';
    }
    return 'COMPATIBLE';
  }
}
