import { describe, it, expect } from 'vitest';
import { canonicalize } from '../../lib/runtime/canonical';

describe('Canonicalize', () => {
  it('should handle key ordering chaos', () => {
    const input = { z: 1, a: 2, m: 3 };
    const expected = '{"a":2,"m":3,"z":1}';
    expect(canonicalize(input)).toBe(expected);
  });

  it('should handle nested structures', () => {
    const input = { b: { c: 2 }, a: 1 };
    const expected = '{"a":1,"b":{"c":2}}';
    expect(canonicalize(input)).toBe(expected);
  });

  it('should handle deep arrays', () => {
    const input = { arr: [3, 1, 2] };
    const expected = '{"arr":[3,1,2]}';
    expect(canonicalize(input)).toBe(expected);
  });

  it('should remove undefined keys', () => {
    const input = { a: 1, b: undefined };
    const expected = '{"a":1}';
    expect(canonicalize(input)).toBe(expected);
  });
});
