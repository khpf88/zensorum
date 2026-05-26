export interface ProofResult {
  property: string;
  assumptions: string[];
  traceId: string;
  result: "PROVED" | "NOT_PROVED" | "INDETERMINATE";
  evidence: Record<string, any>;
  determinismHash: string;
}

export interface FormalProofEngine<T> {
  prove(artifacts: T): ProofResult;
}
