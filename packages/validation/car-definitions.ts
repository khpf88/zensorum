export interface CanonicalSerializationSpec {
  format: "JSON-CANONICAL-v1";
  ordering: "STRICT-KEY-ALPHABETICAL";
  excludedMetadataFields: string[];
}

export interface CanonicalDAGSpec {
  acyclicRequirement: boolean;
  parentClosureIntegrity: boolean;
  genesisNodeUniqueness: boolean;
}

export interface CanonicalOrderingSpec {
  topologicalRequirement: "STRICT-CAUSAL";
  tieBreaker: "EVENT-ID-LEXICOGRAPHICAL";
}

export interface CanonicalHashSpec {
  algorithm: "SHA-256";
  inputExclusions: string[]; // Fields ignored during hashing
}

export interface CanonicalReplaySpec {
  stateHashChainConsistency: boolean;
  finalStateHashVerification: boolean;
}

export interface CanonicalParitySpec {
  modelEquivalence: "BYTE-IDENTICAL-OUTPUTS";
  artifactParity: boolean;
}

export interface CanonicalInvariantSpec {
  validationStage: "POST-EXECUTION";
  determinismRequirement: boolean;
}

export interface CanonicalAssumptionSet {
  serializationRules: CanonicalSerializationSpec;
  dagRules: CanonicalDAGSpec;
  orderingRules: CanonicalOrderingSpec;
  hashRules: CanonicalHashSpec;
  replaySemantics: CanonicalReplaySpec;
  crossRuntimeEquivalenceRules: CanonicalParitySpec;
  invariantDefinitions: CanonicalInvariantSpec;
}

export interface CAR_Version {
  versionId: string;
  parentVersionId: string | null;
  changeType: "INITIAL" | "AMENDMENT" | "EXTENSION" | "DEPRECATION";
  canonicalDiff: string;
  effectiveTimestamp: string;
}

export interface CanonicalAssumptionRegistry {
  version: CAR_Version;
  spec: CanonicalAssumptionSet;
}
