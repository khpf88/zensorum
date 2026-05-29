import { CanonicalExecutionSnapshot } from '../comparison/CanonicalExecutionSnapshot';
import { ReplayProtocolVersion, LegacySnapshot } from '../types';
import { LegacySnapshotConverter } from './LegacySnapshotConverter';

/**
 * Maps historical snapshot schemas to current canonical format.
 */
export class SnapshotEvolutionMapper {
  private legacySnapshotConverter: LegacySnapshotConverter;

  constructor() {
    this.legacySnapshotConverter = new LegacySnapshotConverter();
  }

  /**
   * Transforms old snapshot representation to current version.
   * This now uses a deterministic migration flow via LegacySnapshotConverter.
   */
  map(oldSnapshot: LegacySnapshot, fromVersion: ReplayProtocolVersion): CanonicalExecutionSnapshot {
    // Deterministically convert and validate the legacy snapshot.
    return this.legacySnapshotConverter.convert(oldSnapshot, fromVersion);
  }
}
