// src/replay/CanonicalEncoderInvoker.ts

import { CanonicalDTO } from '../types';
import { CanonicalEncoder } from '@zensorum/canonical';

/**
 * Invokes the canonical encoder defined in Phase 3.9.
 * This class acts as a wrapper, strictly adhering to the contract.
 */
export class CanonicalEncoderInvoker {
  private encoder: CanonicalEncoder;

  constructor(encoder: CanonicalEncoder) {
    this.encoder = encoder;
  }

  /**
   * Encodes a CanonicalDTO into a Uint8Array using the specified canonical encoding.
   * Delegates strictly to the injected encoder.
   * 
   * @param input The CanonicalDTO to encode.
   * @returns A Uint8Array representing the canonical byte sequence.
   * @throws Error if encode fails.
   */
  public encode(input: CanonicalDTO): Uint8Array {
    try {
      return this.encoder.encode(input);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Canonical encoding failed for vector ${input.id}: ${errorMessage}`);
    }
  }
}
