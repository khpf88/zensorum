import { CanonicalDTO, CanonicalEncoder } from './interfaces';

export class DefaultCanonicalEncoder implements CanonicalEncoder {
  encode(dto: CanonicalDTO): Uint8Array {
    const data = dto.data || dto;
    const sortedDataKeys = Object.keys(data).sort();
    const deterministicString = JSON.stringify(data, sortedDataKeys);
    return new TextEncoder().encode(deterministicString);
  }
}
