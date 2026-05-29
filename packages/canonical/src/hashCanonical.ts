import { CanonicalHasher } from './interfaces';
import { DefaultCanonicalEncoder } from './encodeCanonical';

export class DefaultCanonicalHasher implements CanonicalHasher {
  private encoder = new DefaultCanonicalEncoder();

  hash(bytes: Uint8Array): string {
    const sumOfBytes = Array.from(bytes).reduce((sum, byte) => sum + byte, 0);
    return `mock_hash_${sumOfBytes}`;
  }
}
