// src/main.ts

import { DeterministicExecutionHarness } from '@zensorum/replay';
import { ReplayExecutionRunner } from '@zensorum/replay';
import { CanonicalEncoderInvoker } from '@zensorum/replay';
import { HashValidationEngine } from '@zensorum/replay';
import { ExecutionEnvironmentConfig } from '@zensorum/replay';
import { DefaultCanonicalEncoder, DefaultCanonicalHasher, DefaultCanonicalNormalizer } from '@zensorum/canonical';
import * as path from 'path';

// Instantiate canonical services explicitly
const canonicalEncoder = new DefaultCanonicalEncoder();
const canonicalHasher = new DefaultCanonicalHasher();
const canonicalNormalizer = new DefaultCanonicalNormalizer();


// --- EXAMPLE GOLDEN VECTOR TEST ---
// Assuming golden-vectors folder at project root for GoldenVectorLoader.
const exampleGoldenVectorDir = path.join(__dirname, '../golden-vectors');

/**
 * The main entrypoint for running the Deterministic Execution Validation Harness.
 * Initializes the harness, executes the validation suite, and prints the final report.
 */
async function main(): Promise<void> {
  // 1. Define example environments for cross-runtime simulation.
  // These objects define the characteristics of the simulated environments.
  const environments: ExecutionEnvironmentConfig[] = [
    { id: 'env-linux-node18', os: 'Linux', nodeVersion: '18.x', cpuArch: 'x64' },
    { id: 'env-macos-node20', os: 'macOS', nodeVersion: '20.x', cpuArch: 'x64' },
    { id: 'env-linux-node18-different-cpu', os: 'Linux', nodeVersion: '18.x', cpuArch: 'arm64' },
    // Add more diverse environments to simulate broader test coverage
  ];

  // 2. Instantiate core components of the validation harness.
  const replayRunner = new ReplayExecutionRunner();
  const encoderInvoker = new CanonicalEncoderInvoker(canonicalEncoder);
  const hashEngine = new HashValidationEngine(canonicalHasher, canonicalEncoder);

  // 3. Initialize the DeterministicExecutionHarness.
  const harness = new DeterministicExecutionHarness(
    exampleGoldenVectorDir,
    environments,
    replayRunner,
    encoderInvoker,
    hashEngine,
    canonicalNormalizer
  );

  // 4. Run the deterministic validation suite and handle the report.
  try {
    const report = await harness.run();
    console.log(`\nFinal Determinism Status: ${report.overallStatus}`);
    if (report.overallStatus === 'FAIL') {
      process.exit(1); // Exit with non-zero code to indicate failure in CI pipelines
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('\nAn unhandled error occurred during harness execution:', errorMessage);
    process.exit(1); // Indicate critical failure
  }
}

// Execute the main function when the script is run.
main();
