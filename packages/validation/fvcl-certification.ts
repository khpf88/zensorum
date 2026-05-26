import { ProofResult } from './formal-verification';
import { MetaVerificationReport } from './meta-verification';
import { CARGovernanceReport } from './cavl-governance';

export interface FormalCertificationBundle {
  bundleId: string;
  executionHash: string;
  carVersionId: string;
  carBindingLockHash: string;
  proofLatticeHash: string;
  includedProofResults: string[];
  metaVerificationStatus: "COHERENT" | "INCOHERENT" | "UNKNOWN";
  governanceStatus: "VALID" | "INVALID";
  replayAttestation: {
    deterministic: boolean;
    crossRuntimeParity: boolean;
    verifiedCarLock: boolean;
  };
  certificationStatus: "CERTIFIED" | "UNCERTIFIED";
  immutableSignature: string;
}

export interface FVCL_CertificationEngine {
  certify(
    executionBundleId: string,
    proofResults: ProofResult[],
    metaReport: MetaVerificationReport,
    governanceReport: CARGovernanceReport
  ): FormalCertificationBundle;
}
