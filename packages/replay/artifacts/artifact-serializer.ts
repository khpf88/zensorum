import { IdentityProjectionAuthority } from '@zensorum/core';

export class ArtifactSerializer {
  /**
   * Deterministically serializes an artifact to a JSON string.
   * Assumes input is already IPA-canonicalized.
   */
  static serialize(data: unknown): string {
    return JSON.stringify(data, (key, value) => {
      if (value && typeof value === 'object' && value.__type === 'Map') {
        return {
          __type: 'Map',
          entries: value.entries
        };
      }
      return value;
    }, 2);
  }

  /**
   * Deserializes a JSON string back to an artifact, restoring Map objects.
   */
  static deserialize(json: string): unknown {
    return JSON.parse(json, (key, value) => {
      if (value && typeof value === 'object' && value.__type === 'Map') {
        return new Map(value.entries);
      }
      return value;
    });
  }

  /**
   * Computes a deterministic hash for an artifact.
   */
  static computeHash(data: unknown): string {
    return IdentityProjectionAuthority.computeIdentity(data, 'IPA-v1');
  }
}
