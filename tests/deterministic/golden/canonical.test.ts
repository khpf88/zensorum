// tests/deterministic/golden/canonical.test.ts
import { DefaultCanonicalEncoder, DefaultCanonicalHasher } from '@zensorum/canonical';

describe('Deterministic Golden Regression', () => {
  const encoder = new DefaultCanonicalEncoder();
  const hasher = new DefaultCanonicalHasher();

  test('canonical encoding and hashing remain byte-identical', async () => {
    // The data we are encoding
    const dto = { data: { a: 1, b: 2 } };
    
    // Perform encoding
    const encoded = encoder.encode(dto);
    const hash = hasher.hash(encoded);

    // Get expected bytes using the exact same logic as DefaultCanonicalEncoder
    const sortedDataKeys = ['data'];
    const sortedInnerKeys = ['a', 'b'];
    // In our encoder, sortedDataKeys is derived from keys. 
    // For {data: {a: 1, b: 2}}, keys are ['data'].
    // The encoding string is JSON.stringify(dto, ['data']). 
    // Wait, the encoder uses Object.keys(data).sort().
    
    // Let's verify encoder logic:
    // const data = dto.data || dto;
    // const sortedDataKeys = Object.keys(data).sort(); // ['a', 'b'] for {a: 1, b: 2}
    // const deterministicString = JSON.stringify(data, sortedDataKeys); 
    // JSON.stringify({a:1, b:2}, ['a', 'b']) -> '{"a":1,"b":2}'
    
    const expected = new TextEncoder().encode('{"a":1,"b":2}');
    
    // Correct hash calculation for this input:
    // bytes are [123, 34, 97, 34, 58, 49, 44, 34, 98, 34, 58, 50, 125]
    // sum: 123+34+97+34+58+49+44+34+98+34+58+50+125 = 838
    const expectedHash = 'mock_hash_838';

    expect(Array.from(encoded)).toEqual(Array.from(expected));
    expect(hash).toBe(expectedHash);
  });
});
