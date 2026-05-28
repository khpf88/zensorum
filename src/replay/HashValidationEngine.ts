// src/replay/HashValidationEngine.ts

import { CanonicalDTO } from './types';

/**
 * Computes a cryptographic hash using the hashCanonical function defined in Phase 3.9.
 * This class ensures strict delegation to the immutable contract, with no intermediate mutation or shortcuts.
 */
export class HashValidationEngine {
  /**
   * Computes the deterministic hash for a CanonicalDTO.
   * Delegates strictly to the globally declared hashCanonical function from Phase 3.9.
   * 
   * @param input The CanonicalDTO to hash.
   * @returns A string representing the deterministic hash.
   * @throws Error if hashCanonical fails.
   */
  public compute(input: CanonicalDTO): string {
    // Phase 3.9 contract: hashCanonical(dto) -> string
    // This function is assumed to be globally available and correctly implemented elsewhere
    // as per Phase 3.9 specification.
    try {
      return hashCanonical(input);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Hash computation failed for vector ${input.id}: ${errorMessage}`);
    }
  }
}
