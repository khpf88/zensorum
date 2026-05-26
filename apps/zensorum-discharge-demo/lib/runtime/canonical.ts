/**
 * Deterministic canonicalization engine for TypeScript (Phase 3.2).
 * Mirrors the Go implementation in runtime/internal/parity/canonical.go.
 */

export function canonicalize(input: any): string {
  const processed = process(input);
  return JSON.stringify(processed);
}

function process(input: any): any {
  if (input === undefined) return undefined;
  if (input === null) return null;

  if (typeof input === 'bigint') {
    return input.toString();
  }

  if (typeof input === 'number') {
    if (isNaN(input)) throw new Error('NaN not allowed');
    if (!isFinite(input)) throw new Error('Infinity not allowed');
    
    // Mirror Go: reflect.Int (as number) vs reflect.Float (as string)
    if (Number.isInteger(input)) {
      return input;
    } else {
      return input.toFixed(0);
    }
  }

  if (Array.isArray(input)) {
    return input.map(process);
  }

  if (typeof input === 'object') {
    // Step 3: Sort keys
    const keys = Object.keys(input).sort();
    const result: Record<string, any> = {};
    for (const key of keys) {
      const val = process(input[key]);
      if (val !== undefined) {
        result[key] = val;
      }
    }
    return result;
  }

  return input;
}
