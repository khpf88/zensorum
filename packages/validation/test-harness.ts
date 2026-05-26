import { ProofResult } from './formal-verification';
import { MetaVerificationReport } from './meta-verification';
import { CARGovernanceReport } from './cavl-governance';
import { FormalCertificationBundle } from './fvcl-certification';
import { CertificationResult } from './cdf-engine';

export interface BundleResult {
  executionBundleId: string;
  determinismStatus: "PASS" | "FAIL";
  parityStatus: "PASS" | "FAIL";
  certificationStatus: "PASS" | "FAIL";
}

export interface TestHarnessReport {
  suiteId: string;
  overallStatus: "PASS" | "FAIL";
  determinismMatrix: Record<string, any>;
  crossRuntimeParityMatrix: Record<string, any>;
  carBindingIntegrityMatrix: Record<string, any>;
  failedComponents: string[];
  failureCategories: string[];
  perBundleResults: BundleResult[];
  immutableSignature: string;
}

export interface ZensorumTestHarness {
  runSuite(goldenSet: any[]): TestHarnessReport;
}
