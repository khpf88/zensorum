export interface CAR_Binding {
  carVersionId: string;
  bindingMode: "STRICT" | "LEGACY_REPLAY" | "TRANSITIONAL";
  lockHash: string;
  effectiveScope: {
    appliesTo: string[];
    immutableDuringReplay: boolean;
  };
}

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
