// src/replay/GoldenVectorLoader.ts

import { CanonicalDTO, GoldenVector } from './types';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Mock implementation of normalize for the purpose of GoldenVectorLoader.
 * In a real scenario, this would be the Phase 3.9 normalize function.
 * It ensures loaded DTOs are in a canonical, order-stable form before use.
 */
function mockNormalize<T extends CanonicalDTO>(dto: T): T {
  // Phase 3.9 contract: normalize<T>(dto) -> T
  // This function is assumed to be globally available and correctly implemented elsewhere.
  try {
    return normalize(dto);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Normalization failed for DTO ${dto.id}: ${errorMessage}`);
  }
}

/**
 * Loads golden test vectors from a specified file system directory.
 * Ensures deterministic ordering of vector loading and basic schema validation.
 */
export class GoldenVectorLoader {
  private vectorDirectory: string;

  constructor(vectorDirectory: string) {
    this.vectorDirectory = vectorDirectory;
  }

  /**
   * Asynchronously loads all golden vectors from the configured directory.
   * Files are loaded in a deterministic order (sorted by filename).
   * Each loaded vector's input DTO is normalized using mockNormalize.
   *
   * @returns A Promise resolving to an array of GoldenVector objects.
   * @throws Error if the directory cannot be read or if any vector file is invalid.
   */
  public async loadVectors(): Promise<GoldenVector[]> {
    const vectors: GoldenVector[] = [];
    let files: string[];
    try {
      files = await fs.promises.readdir(this.vectorDirectory);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Error reading golden vector directory '${this.vectorDirectory}': ${errorMessage}`);
    }

    // Deterministic ordering of vector loading by sorting file names
    files.sort();

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(this.vectorDirectory, file);
        try {
          const content = await fs.promises.readFile(filePath, 'utf-8');
          const rawVector: GoldenVector = JSON.parse(content);

          // Basic validation for mandatory fields
          if (!rawVector.id || !rawVector.version || !rawVector.input) {
            throw new Error(`Invalid GoldenVector schema: missing 'id', 'version', or 'input' in file ${file}`);
          }

          // Ensure the input DTO is normalized upon loading to enforce consistency
          // This call ensures the loaded input conforms to the canonical ordering.
          rawVector.input = mockNormalize(rawVector.input);

          vectors.push(rawVector);
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          throw new Error(`Failed to load or parse golden vector file '${filePath}': ${errorMessage}`);
        }
      }
    }
    return vectors;
  }
}
