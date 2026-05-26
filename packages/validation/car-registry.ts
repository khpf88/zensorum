import { CanonicalAssumptionRegistry } from './car-definitions';

export const INITIAL_CAR_VERSION: CanonicalAssumptionRegistry = {
  version: {
    versionId: "v1.0.0",
    parentVersionId: null,
    changeType: "INITIAL",
    canonicalDiff: "N/A",
    effectiveTimestamp: "2026-05-25T00:00:00Z"
  },
  spec: {
    serializationRules: {
      format: "JSON-CANONICAL-v1",
      ordering: "STRICT-KEY-ALPHABETICAL",
      excludedMetadataFields: ["timestamp", "origin"]
    },
    dagRules: {
      acyclicRequirement: true,
      parentClosureIntegrity: true,
      genesisNodeUniqueness: true
    },
    orderingRules: {
      topologicalRequirement: "STRICT-CAUSAL",
      tieBreaker: "EVENT-ID-LEXICOGRAPHICAL"
    },
    hashRules: {
      algorithm: "SHA-256",
      inputExclusions: ["runtimeMeta"]
    },
    replaySemantics: {
      stateHashChainConsistency: true,
      finalStateHashVerification: true
    },
    crossRuntimeEquivalenceRules: {
      modelEquivalence: "BYTE-IDENTICAL-OUTPUTS",
      artifactParity: true
    },
    invariantDefinitions: {
      validationStage: "POST-EXECUTION",
      determinismRequirement: true
    }
  }
};
