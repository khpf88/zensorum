// src/replay/ValidationReportGenerator.ts

import { ComparisonResult, ValidationReport, FailureDetailsDTO } from './types';
import { sanitizeValueForReport } from './OutputComparator'; // Re-use sanitize function

/**
 * Generates and prints a comprehensive deterministic validation report based on comparison results.
 */
export class ValidationReportGenerator {
  /**
   * Generates a ValidationReport object from an array of ComparisonResult.
   * 
   * @param comparisonResults An array of ComparisonResult, summarizing each golden vector's comparison.
   * @returns A ValidationReport object.
   */
  public generate(comparisonResults: ComparisonResult[]): ValidationReport {
    const totalVectors = comparisonResults.length;
    const failedVectors = comparisonResults.filter(r => r.status === 'FAIL').length;
    const passedVectors = totalVectors - failedVectors;
    const overallStatus = failedVectors > 0 ? 'FAIL' : 'PASS';

    const report: ValidationReport = {
      overallStatus,
      summary: {
        totalVectors,
        passedVectors,
        failedVectors,
      },
      results: comparisonResults,
      reportTimestamp: new Date().toISOString(), // Non-deterministic metadata, but fine for report generation
    };

    this.printReport(report);
    return report;
  }

  /**
   * Prints a human-readable summary of the validation report to the console.
   * 
   * @param report The ValidationReport to print.
   */
  private printReport(report: ValidationReport): void {
    console.log('\n--- Zensorum Deterministic Validation Report ---');
    console.log(`Overall Status: ${report.overallStatus}`);
    console.log(`Total Vectors: ${report.summary.totalVectors}`);
    console.log(`Passed: ${report.summary.passedVectors}`);
    console.log(`Failed: ${report.summary.failedVectors}`);
    console.log(`Report Generated: ${report.reportTimestamp}`);

    if (report.overallStatus === 'FAIL') {
      console.log('\n--- Failed Vectors ---');
      report.results.filter(r => r.status === 'FAIL').forEach(result => {
        console.error(`\nVector ID: ${result.inputVectorId}`);
        result.failures.forEach(failure => {
          this.printFailureDetails(failure);
        });
      });
    }
    console.log('\n--- End of Report ---');
  }

  /**
   * Prints detailed information for a single failure to the console.
   * 
   * @param failure The FailureDetailsDTO to print.
   */
  private printFailureDetails(failure: FailureDetailsDTO): void {
    console.error(`  Failure Type: ${failure.type}`);
    console.error(`  Message: ${failure.message}`);
    if (failure.divergentPropertyPath) {
      console.error(`  Divergent Path: ${failure.divergentPropertyPath}`);
    }
    if (failure.environmentA && failure.environmentB) {
      console.error(`  Environments Compared: ${failure.environmentA.id} vs ${failure.environmentB.id}`);
    }
    // Print sanitized values if available and not excessively large
    if (failure.expectedValue !== undefined) {
      console.error(`  Expected (from ${failure.environmentA?.id || 'base'}): ${sanitizeValueForReport(failure.expectedValue)}`);
    }
    if (failure.actualValue !== undefined) {
      console.error(`  Actual (from ${failure.environmentB?.id || 'current'}): ${sanitizeValueForReport(failure.actualValue)}`);
    }
  }
}
