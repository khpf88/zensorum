// src/replay/CanonicalEncoderInvoker.ts

import { CanonicalDTO } from './types';

/**
 * Invokes the canonical encoder defined in Phase 3.9.
 * This class acts as a wrapper, strictly adhering to the contract.
 */
export class CanonicalEncoderInvoker {
  /**
   * Encodes a CanonicalDTO into a Uint8Array using the specified canonical encoding.
   * Delegates strictly to the globally declared encodeCanonical function from Phase 3.9.
   * 
   * @param input The CanonicalDTO to encode.
   * @returns A Uint8Array representing the canonical byte sequence.
   * @throws Error if encodeCanonical fails.
   */
  public encode(input: CanonicalDTO): Uint8Array {
    // Phase 3.9 contract: encodeCanonical(dto) -> Uint8Array
    // This function is assumed to be globally available and correctly implemented elsewhere
    // as per Phase 3.9 specification.
    try {
      return encodeCanonical(input);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Canonical encoding failed for vector ${input.id}: ${errorMessage}`);
    }
  }
}
