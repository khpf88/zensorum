import { CAR_Binding } from '@zensorum/application-contracts/types/execution-bundle';

export interface CARGovernanceReport {
  bundleId: string;
  boundCarVersion: string;
  bindingIntegrity: "VALID" | "INVALID";
  replaySafety: "DETERMINISTIC" | "NON_DETERMINISTIC";
  compatibilityNotes: string[];
  detectedViolations: string[];
  lockHash: string;
}

export interface CGVLGovernanceEngine {
  verifyBinding(bundle: any): CARGovernanceReport; // Bundle typed as any for loose coupling, but will cast
}
