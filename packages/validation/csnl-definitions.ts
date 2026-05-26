export interface CanonicalEvent {
  id: string;
  type: string;
  payload: Record<string, any>; // Normalized according to CAR rules
}

export interface CanonicalDAG {
  nodes: string[];
  edges: Array<{ from: string; to: string }>;
  closureStable: boolean;
}

export interface CanonicalSemanticExecutionBundle {
  originalBundleId: string;
  normalizedEvents: CanonicalEvent[];
  normalizedDAG: CanonicalDAG;
  normalizedStateHashChain: string[];
  semanticEquivalenceClassId: string;
  canonicalizationMetadata: {
    orderingNormalization: "STRICT";
    encodingNormalization: "STRICT";
    numericNormalization: "STRICT";
    structuralNormalization: "STRICT";
  };
}
