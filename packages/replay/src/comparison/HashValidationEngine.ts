// src/replay/HashValidationEngine.ts

import { CanonicalDTO } from '../types';
import { CanonicalHasher, CanonicalEncoder } from '@zensorum/canonical';

/**
 * Computes a cryptographic hash using the CanonicalHasher contract.
 * This class ensures strict delegation to the injected contract.
 */
export class HashValidationEngine {
  private hasher: CanonicalHasher;
  private encoder: CanonicalEncoder;

  constructor(hasher: CanonicalHasher, encoder: CanonicalEncoder) {
    this.hasher = hasher;
    this.encoder = encoder;
  }

  /**
   * Computes the deterministic hash for a CanonicalDTO.
   * Delegates strictly to the injected hasher.
   * 
   * @param input The CanonicalDTO to hash.
   * @returns A string representing the deterministic hash.
   * @throws Error if hasher fails.
   */
  public compute(input: CanonicalDTO): string {
    try {
      const bytes = this.encoder.encode(input);
      return this.hasher.hash(bytes);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Hash computation failed for vector ${input.id}: ${errorMessage}`);
    }
  }
}
