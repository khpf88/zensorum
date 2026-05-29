export interface CanonicalDTO {
  [key: string]: any;
}

export interface CanonicalEncoder {
  encode(dto: CanonicalDTO): Uint8Array;
}

export interface CanonicalHasher {
  hash(bytes: Uint8Array): string;
}

export interface CanonicalNormalizer {
  normalize<T>(input: T): T;
}
