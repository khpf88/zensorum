// src/replay/GoldenVectorLoader.ts

import { CanonicalDTO, GoldenVector } from './types';
import * as fs from 'fs';
import * as path from 'path';
import { CanonicalNormalizer } from '@zensorum/canonical';

/**
 * Loads golden test vectors from a specified file system directory.
 * Ensures deterministic ordering of vector loading and basic schema validation.
 */
export class GoldenVectorLoader {
  private vectorDirectory: string;
  private normalizer: CanonicalNormalizer;

  constructor(vectorDirectory: string, normalizer: CanonicalNormalizer) {
    this.vectorDirectory = vectorDirectory;
    this.normalizer = normalizer;
  }

  /**
   * Asynchronously loads all golden vectors from the configured directory.
   * Files are loaded in a deterministic order (sorted by filename).
   * Each loaded vector's input DTO is normalized using the injected normalizer.
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
          rawVector.input = this.normalizer.normalize(rawVector.input);

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
