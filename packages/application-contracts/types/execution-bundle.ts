
export interface CAR_Binding {
  carVersionId: string;
  bindingMode: "STRICT" | "LEGACY_REPLAY" | "TRANSITIONAL";
  lockHash: string;
  effectiveScope: {
    appliesTo: string[];
    immutableDuringReplay: boolean;
  };
}

export interface FrcsDecision {
  nodeId: string;
  decisionType: string;
  decisionHash: string;
}

export interface DagValidationResult {
  nodeId: string;
  isValid: boolean;
  errorCode: string | null;
  validationHash: string;
}

export interface EventOrderEntry {
  index: number;
  eventId: string;
  parentEventIds: string[];
  orderHash: string;
}

export interface StateHashEntry {
  stepIndex: number;
  stateHash: string;
}

export interface RuntimeMeta {
  version: string;
  buildId: string;
  executionTimeNs: number;
}

export interface ExecutionBundle {
  runId: string;
  executionIdentity: string; // IPA-derived semantic anchor
  runtime: "ts" | "go";
  eventStreamHash: string;
  frcsDecisions: FrcsDecision[];
  dagValidationResults: DagValidationResult[];
  eventOrder: EventOrderEntry[];
  stateHashTimeline: StateHashEntry[];
  finalStateHash: string;
  replayHash: string;
  runtimeMeta: RuntimeMeta;
  carBinding: CAR_Binding;
}
