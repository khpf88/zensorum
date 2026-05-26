import { ProofResult } from './formal-verification';

export interface ConsistencyMatrix {
  dagValidity_determinism: "CONSISTENT" | "INCONSISTENT";
  dagValidity_hashStability: "CONSISTENT" | "INCONSISTENT";
  determinism_equivalence: "CONSISTENT" | "INCONSISTENT";
  hashStability_equivalence: "CONSISTENT" | "INCONSISTENT";
  invariantClosure_all: "CONSISTENT" | "INCONSISTENT";
}

export interface MetaVerificationReport {
  latticeStatus: "COHERENT" | "INCOHERENT" | "INDETERMINATE";
  consistencyMatrix: ConsistencyMatrix;
  detectedDriftVectors: string[];
  canonicalAssumptionAlignment: "ALIGNED" | "MISALIGNED";
  circularDependencyFlags: string[];
  finalAssessment: string;
}

export interface MetaVerificationEngine {
  verifyLattice(proofs: ProofResult[]): MetaVerificationReport;
}
