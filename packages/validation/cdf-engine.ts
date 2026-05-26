export interface VerificationState {
  executionHash: string;
  carVersionId: string;
  carBindingStatus: "VALID" | "INVALID";
  proofLatticeStatus: {
    DAGValidity: "PROVED" | "NOT_PROVED" | "INDETERMINATE";
    Determinism: "PROVED" | "NOT_PROVED" | "INDETERMINATE";
    HashStability: "PROVED" | "NOT_PROVED" | "INDETERMINATE";
    Equivalence: "PROVED" | "NOT_PROVED" | "INDETERMINATE";
    InvariantClosure: "PROVED" | "NOT_PROVED" | "INDETERMINATE";
  };
  metaVerificationStatus: "COHERENT" | "INCOHERENT" | "INDETERMINATE";
  replayAttestation: {
    deterministic: boolean;
    crossRuntimeParity: boolean;
    carLockVerified: boolean;
  };
  certificationBundleIntegrity: "VALID" | "INVALID";
}

export type CertificationResult = "CERTIFIED" | "UNCERTIFIED";

export interface CertificationFailureReason {
  type:
    | "PROOF_FAILURE"
    | "META_INCOHERENCE"
    | "CAR_BINDING_FAILURE"
    | "REPLAY_NON_DETERMINISM"
    | "CROSS_RUNTIME_PARITY_FAILURE"
    | "CERTIFICATION_INTEGRITY_FAILURE";
  affectedComponent: string[];
  description: string;
}

export function evaluateCertification(state: VerificationState): {
  result: CertificationResult;
  reason?: CertificationFailureReason;
} {
  // 1. Primary Gate (Hard Fail Conditions)
  if (state.carBindingStatus === "INVALID") {
    return {
      result: "UNCERTIFIED",
      reason: {
        type: "CAR_BINDING_FAILURE",
        affectedComponent: ["carBindingStatus"],
        description: "CAR binding status is invalid."
      }
    };
  }

  if (state.certificationBundleIntegrity === "INVALID") {
    return {
      result: "UNCERTIFIED",
      reason: {
        type: "CERTIFICATION_INTEGRITY_FAILURE",
        affectedComponent: ["certificationBundleIntegrity"],
        description: "Certification bundle integrity is invalid."
      }
    };
  }

  if (state.metaVerificationStatus !== "COHERENT") {
    return {
      result: "UNCERTIFIED",
      reason: {
        type: "META_INCOHERENCE",
        affectedComponent: ["metaVerificationStatus"],
        description: "Meta-verification status is not COHERENT."
      }
    };
  }

  if (
    !state.replayAttestation.deterministic ||
    !state.replayAttestation.crossRuntimeParity ||
    !state.replayAttestation.carLockVerified
  ) {
    return {
      result: "UNCERTIFIED",
      reason: {
        type: "REPLAY_NON_DETERMINISM",
        affectedComponent: ["replayAttestation"],
        description: "Replay attestation requirements not met."
      }
    };
  }

  // 2. Proof Lattice Gate
  const failedProofs = Object.entries(state.proofLatticeStatus)
    .filter(([_, status]) => status !== "PROVED")
    .map(([proof]) => proof);

  if (failedProofs.length > 0) {
    return {
      result: "UNCERTIFIED",
      reason: {
        type: "PROOF_FAILURE",
        affectedComponent: failedProofs,
        description: "One or more proofs failed validation."
      }
    };
  }

  // 3. Success Condition
  return { result: "CERTIFIED" };
}
