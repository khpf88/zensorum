// src/replay/CrossRuntimeExecutor.ts

import {
  GoldenVector,
  TestRunResult,
  ExecutionEnvironmentConfig,
} from '../types';
import { ReplayExecutionRunner } from './ReplayExecutionRunner';
import { CanonicalEncoderInvoker } from '../orchestration/CanonicalEncoderInvoker';
import { HashValidationEngine } from '../comparison/HashValidationEngine';

/**
 * Orchestrates the execution of a single golden vector across all configured environments.
 * Simulates isolated execution contexts and captures results from each.
 */
export class CrossRuntimeExecutor {
  private environments: ExecutionEnvironmentConfig[];
  private replayRunner: ReplayExecutionRunner;
  private encoderInvoker: CanonicalEncoderInvoker;
  private hashEngine: HashValidationEngine;

  constructor(
    environments: ExecutionEnvironmentConfig[],
    replayRunner: ReplayExecutionRunner,
    encoderInvoker: CanonicalEncoderInvoker,
    hashEngine: HashValidationEngine
  ) {
    this.environments = environments;
    this.replayRunner = replayRunner;
    this.encoderInvoker = encoderInvoker;
    this.hashEngine = hashEngine;
  }

  /**
   * Executes a single golden vector across all configured environments.
   * For each environment, it simulates an isolated execution context, runs the replay,
   * encodes its canonical output, and computes its hash.
   * 
   * @param vector The GoldenVector to execute.
   * @returns A Promise resolving to an array of TestRunResult, one for each environment.
   */
  public async executeAcrossEnvs(vector: GoldenVector): Promise<TestRunResult[]> {
    const results: TestRunResult[] = [];
    console.log(`[CrossRT] Executing vector ${vector.id} across ${this.environments.length} environments...`);

    for (const envConfig of this.environments) {
      console.log(`[CrossRT] Running in environment: ${envConfig.id} (${envConfig.os}/${envConfig.nodeVersion})`);
      let result: TestRunResult = {
        inputVectorId: vector.id,
        environment: envConfig,
        status: 'FAIL', // Assume fail until proven pass
      };

      try {
        // --- Simulate Environment Isolation ---
        // In a production implementation, this would involve:
        // 1. Spawning a Docker container or child process with specific Node.js version/OS.
        // 2. Executing the replay, encoder, hasher within that isolated context.
        // 3. Capturing and deserializing the structured output from the isolated context.
        // For this scaffold, we directly call the runners and invokers in the current process, 
        // but the environment configuration is still passed for result attribution.

        const replayOutputs = await this.replayRunner.execute(vector.input);
        const encodedBytes = this.encoderInvoker.encode(replayOutputs.canonicalOutput);
        const finalHash = this.hashEngine.compute(replayOutputs.canonicalOutput);

        result = {
          ...result,
          status: 'PASS',
          replayRunOutput: replayOutputs,
          encodedBytesHashInput: encodedBytes,
          finalHash: finalHash,
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`[CrossRT] Error in env ${envConfig.id} for vector ${vector.id}: ${errorMessage}`);
        result.failureDetails = {
          type: 'unknown',
          message: `Unhandled error during execution: ${errorMessage}`,
        };
      }
      results.push(result);
    }
    return results;
  }
}
