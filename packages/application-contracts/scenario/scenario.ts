export interface ZensorumScenario {
  scenarioId: string;
  executionDomain: string;

  csnlVersion: string;
  runtimeVersion: string;
  replayProtocolVersion: string;

  intent: {
    type: string;
    action: string;
    subject?: string;
  };

  payload: Record<string, any>;

  execution: {
    mode: "strict" | "audit"; // Assuming audit could be a mode too, strict as mandatory
    deterministic: boolean;
    allowSideEffects: boolean;
    maxTicks?: number;
  };

  governance: {
    policies?: string[];
    complianceMode?: "strict" | "audit";
  };

  trace: {
    correlationId: string;
    origin: "cli" | "api" | "system";
  };
}
