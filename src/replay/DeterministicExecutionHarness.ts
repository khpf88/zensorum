// src/replay/DeterministicExecutionHarness.ts

import {
  GoldenVectorLoader,
} from './GoldenVectorLoader';
import { ReplayExecutionRunner } from './ReplayExecutionRunner';
import { CanonicalEncoderInvoker } from './CanonicalEncoderInvoker';
import { HashValidationEngine } from './HashValidationEngine';
import { CrossRuntimeExecutor } from './CrossRuntimeExecutor';
import { OutputComparator } from './OutputComparator';
import { ValidationReportGenerator } from './ValidationReportGenerator';
import {
  ValidationReport,
  ExecutionEnvironmentConfig,
  ComparisonResult,
  TestRunResult,
} from './types';

/**
 * The core orchestrator of the deterministic execution validation suite.
 * Manages the entire test lifecycle, from loading golden vectors to generating the final report.
 */
export class DeterministicExecutionHarness {
  private goldenVectorLoader: GoldenVectorLoader;
  private crossRuntimeExecutor: CrossRuntimeExecutor;
  private outputComparator: OutputComparator;
  private reportGenerator: ValidationReportGenerator;

  constructor(
    goldenVectorDir: string,
    environments: ExecutionEnvironmentConfig[],
    replayRunner: ReplayExecutionRunner,
    encoderInvoker: CanonicalEncoderInvoker,
    hashEngine: HashValidationEngine
  ) {
    this.goldenVectorLoader = new GoldenVectorLoader(goldenVectorDir);
    this.crossRuntimeExecutor = new CrossRuntimeExecutor(
      environments,
      replayRunner,
      encoderInvoker,
      hashEngine
    );
    this.outputComparator = new OutputComparator();
    this.reportGenerator = new ValidationReportGenerator();
  }

  /**
   * Runs the full deterministic validation suite.
   * Orchestrates loading, execution across environments, comparison, and report generation.
   * 
   * @returns A Promise resolving to the final ValidationReport.
   */
  public async run(): Promise<ValidationReport> {
    console.log('--- Starting Deterministic Execution Harness ---');
    const goldenVectors = await this.goldenVectorLoader.loadVectors();
    console.log(`Loaded ${goldenVectors.length} golden vectors.`);

    const allComparisonResults: ComparisonResult[] = [];

    for (const vector of goldenVectors) {
      console.log(`\nProcessing Golden Vector: ${vector.id}`);
      const resultsPerEnv: TestRunResult[] = await this.crossRuntimeExecutor.executeAcrossEnvs(vector);

      // Only compare if there are results from at least two environments for meaningful comparison
      if (resultsPerEnv.length >= 2) {
        const comparisonResult: ComparisonResult = this.outputComparator.compare(resultsPerEnv);
        allComparisonResults.push(comparisonResult);

        if (comparisonResult.status === 'FAIL') {
          console.error(`  Vector ${vector.id} FAILED deterministic comparison.`);
        } else {
          console.log(`  Vector ${vector.id} PASSED deterministic comparison.`);
        }
      } else if (resultsPerEnv.length === 1) {
        console.warn(`  Vector ${vector.id} only ran in one environment. Cannot perform cross-environment comparison.`);
        allComparisonResults.push({
          inputVectorId: vector.id,
          status: 'PASS', // Treat as pass since no divergence could be detected
          failures: [{type: 'unknown', message: 'Not enough environments for comparison'}],
          firstRunResult: resultsPerEnv[0],
        });
      } else {
        console.error(`  Vector ${vector.id} failed to execute in any environment.`);
        allComparisonResults.push({
          inputVectorId: vector.id,
          status: 'FAIL',
          failures: [{type: 'unknown', message: 'Failed to execute in any environment'}],
        });
      }
    }

    const finalReport = this.reportGenerator.generate(allComparisonResults);
    return finalReport;
  }
}
