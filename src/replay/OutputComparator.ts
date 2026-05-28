// src/replay/OutputComparator.ts

import {
  TestRunResult,
  ComparisonResult,
  FailureDetailsDTO,
  FailureType,
  ExecutionEnvironmentConfig,
} from './types';
import * as util from 'util'; // For deep comparison/diffing

/**
 * Performs a deep and byte-for-byte strict equality comparison between two values.
 * Uses util.isDeepStrictEqual for objects/primitives and byte array comparison for Uint8Arrays.
 * 
 * @param a The first value to compare.
 * @param b The second value to compare.
 * @returns true if values are deeply and strictly equal, false otherwise.
 */
function deepStrictAndByteEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  // Handle Uint8Array specifically for byte-for-byte comparison
  if (a instanceof Uint8Array && b instanceof Uint8Array) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // Fallback to Node.js's deep strict equality for all other types
  return util.isDeepStrictEqual(a, b);
}

/**
 * Attempts to find the earliest path where two objects diverge.
 * This helper is crucial for providing precise failure reporting.
 * 
 * @param objA The first object.
 * @param objB The second object.
 * @param currentPath The current path string (for recursion).
 * @returns The divergent path string, or empty string if no divergence or not comparable.
 */
function findDivergentPath(objA: unknown, objB: unknown, currentPath: string = ''): string {
  if (deepStrictAndByteEqual(objA, objB)) {
    return ''; // No divergence here
  }

  // If one is primitive or null, and they are not equal, then this is the divergence point
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null || objA instanceof Uint8Array || objB instanceof Uint8Array) {
    return currentPath;
  }

  const keysA = Object.keys(objA as Record<string, unknown>).sort();
  const keysB = Object.keys(objB as Record<string, unknown>).sort();
  const allKeys = new Set([...keysA, ...keysB]);

  for (const key of allKeys) {
    const valueA = (objA as Record<string, unknown>)[key];
    const valueB = (objB as Record<string, unknown>)[key];
    const newPath = currentPath ? `${currentPath}.${key}` : key;

    // Recursively check for divergence
    const subPath = findDivergentPath(valueA, valueB, newPath);
    if (subPath) {
      return subPath;
    }
  }
  return ''; // Should not be reached if initial deepStrictAndByteEqual was false
}

/**
 * Sanitizes a value for inclusion in failure reports to prevent excessively large outputs.
 * 
 * @param value The value to sanitize.
 * @param maxLength Max string length before truncation for stringified values.
 * @returns The sanitized value.
 */
export function sanitizeValueForReport(value: unknown, maxLength: number = 500): unknown {
  if (value instanceof Uint8Array) {
    // Show length and a snippet of bytes
    return `Uint8Array[${value.length}] - first 50 bytes: ${Array.from(value.slice(0, Math.min(value.length, 50))).map(b => b.toString(16).padStart(2, '0')).join('')}${value.length > 50 ? '...' : ''}`;
  }
  if (typeof value === 'object' && value !== null) {
    try {
      const stringified = JSON.stringify(value);
      if (stringified.length > maxLength) {
        return stringified.substring(0, maxLength) + '... (truncated)';
      }
      return value; // Return original object if not too large
    } catch {
      return "[Unstringifiable Object]";
    }
  }
  return value;
}


/**
 * Compares a set of TestRunResults for a single golden vector across different environments.
 * Identifies and classifies any deterministic divergences according to strict rules.
 */
export class OutputComparator {
  /**
   * Compares the results of executing a golden vector across multiple environments.
   * It performs deep equality checks for DTOs, byte-for-byte for encoded outputs, 
   * and string equality for hashes. Classifies failures into specific types.
   * 
   * @param results An array of TestRunResult, typically from CrossRuntimeExecutor.
   * @returns A ComparisonResult summarizing the comparison outcome.
   * @throws Error if results array is empty or contains invalid data for comparison.
   */
  public compare(results: TestRunResult[]): ComparisonResult {
    if (results.length === 0) {
      throw new Error('OutputComparator received an empty results array for comparison.');
    }

    const firstRun = results[0];
    const failures: FailureDetailsDTO[] = [];

    // If only one result, no cross-environment comparison is possible, but it's not a failure
    if (results.length === 1) {
      return {
        inputVectorId: firstRun.inputVectorId,
        status: 'PASS',
        failures: [], // No failures from comparison
        firstRunResult: firstRun,
      };
    }

    // Compare the first run against all subsequent runs
    for (let i = 1; i < results.length; i++) {
      const currentRun = results[i];
      const envA = firstRun.environment;
      const envB = currentRun.environment;

      // Ensure both runs have outputs before comparison (e.g., not failed early)
      if (!firstRun.replayRunOutput || !currentRun.replayRunOutput) {
        failures.push(this.createFailure(
          'unknown',
          `One or both runs (Env A: ${envA.id}, Env B: ${envB.id}) failed to produce replay outputs.`,
          '', // No specific path, as whole output is missing
          firstRun.replayRunOutput, currentRun.replayRunOutput, envA, envB
        ));
        continue; // Skip detailed comparison if outputs are missing
      }

      // 1. Replay Failure Check (Deep structural comparison of replay trace and canonical output DTOs)
      const replayOutputsEqual = deepStrictAndByteEqual(firstRun.replayRunOutput, currentRun.replayRunOutput);
      if (!replayOutputsEqual) {
        // Attempt to isolate an ordering failure if possible, otherwise it's a general replay failure.
        // This is a simplification; a true ordering failure check would compare content sets, ignoring order.
        const divergentPath = findDivergentPath(firstRun.replayRunOutput, currentRun.replayRunOutput);
        failures.push(this.createFailure(
          'replay', // Or 'ordering' if a more sophisticated check determined only order differed
          'Replay outputs (trace or canonical snapshot) diverged.',
          divergentPath,
          firstRun.replayRunOutput,
          currentRun.replayRunOutput,
          envA, envB
        ));
      }

      // 2. Encoding Failure Check (Byte-for-byte comparison of Uint8Array)
      const encodedBytesEqual = deepStrictAndByteEqual(firstRun.encodedBytesHashInput, currentRun.encodedBytesHashInput);
      if (!encodedBytesEqual) {
        failures.push(this.createFailure(
          'encoding',
          'Encoded bytes hash input diverged.',
          'encodedBytesHashInput', // Specific property
          firstRun.encodedBytesHashInput,
          currentRun.encodedBytesHashInput,
          envA, envB
        ));
      }

      // 3. Hash Failure Check (Strict string comparison)
      if (firstRun.finalHash !== currentRun.finalHash) {
        // This is a hash failure if encoded bytes are equal but hash differs
        const type: FailureType = encodedBytesEqual ? 'hash' : 'encoding'; // If bytes diverged, it's an encoding issue, not hash function itself
        failures.push(this.createFailure(
          type,
          'Final hash diverged.',
          'finalHash', // Specific property
          firstRun.finalHash,
          currentRun.finalHash,
          envA, envB
        ));
      }
    }

    return {
      inputVectorId: firstRun.inputVectorId,
      status: failures.length > 0 ? 'FAIL' : 'PASS',
      failures: failures,
      firstRunResult: firstRun,
    };
  }

  /**
   * Helper to create a structured FailureDetailsDTO.
   * 
   * @param type The classified type of failure.
   * @param message A descriptive message for the failure.
   * @param divergentPropertyPath Optional path to the diverging property.
   * @param expectedValue Optional expected value for the divergent property.
   * @param actualValue Optional actual value for the divergent property.
   * @param envA The environment config of the baseline run.
   * @param envB The environment config of the current run being compared.
   * @returns A populated FailureDetailsDTO.
   */
  private createFailure(
    type: FailureType,
    message: string,
    divergentPropertyPath: string = '',
    expectedValue: unknown,
    actualValue: unknown,
    envA: ExecutionEnvironmentConfig,
    envB: ExecutionEnvironmentConfig
  ): FailureDetailsDTO {
    return {
      type,
      message,
      divergentPropertyPath,
      expectedValue: sanitizeValueForReport(expectedValue),
      actualValue: sanitizeValueForReport(actualValue),
      environmentA: envA,
      environmentB: envB,
    };
  }
}
