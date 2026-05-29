export interface CanonicalDTO {
  id: string;
  data: Record<string, unknown>;
}

export interface ReplayTraceDTO {
  steps: Array<{ stepIndex: number; nodeId: string; event: string }>;
}

export interface CanonicalExecutionSnapshot {
  stepIndex: number;
  nodeStates: Array<{ nodeId: string; status: string }>;
  policyStates: Array<{ policyId: string; evaluationResult: boolean }>;
  schedulerContext: { activeNodeId: string; scheduledTicks: number[] };
}

export interface GoldenVector {
  id: string;
  version: string;
  input: CanonicalDTO;
  expectedOutputHash?: string;
  expectedEncodedBytesHash?: string;
}

export interface ExecutionEnvironmentConfig {
  id: string;
  os: string;
  nodeVersion: string;
  cpuArch: string;
}

export interface ReplayRunOutput {
  replayTrace: ReplayTraceDTO;
  canonicalOutput: CanonicalExecutionSnapshot;
}

export interface TestRunResult {
  inputVectorId: string;
  environment: ExecutionEnvironmentConfig;
  status: 'PASS' | 'FAIL';
  replayRunOutput?: ReplayRunOutput;
  encodedBytesHashInput?: Uint8Array;
  finalHash?: string;
  failureDetails?: FailureDetailsDTO;
  executionMetadata?: Record<string, unknown>;
}

export interface ComparisonResult {
  inputVectorId: string;
  status: 'PASS' | 'FAIL';
  failures: FailureDetailsDTO[];
  firstRunResult?: TestRunResult;
}

export interface ValidationReport {
  overallStatus: 'PASS' | 'FAIL';
  summary: {
    totalVectors: number;
    passedVectors: number;
    failedVectors: number;
  };
  results: ComparisonResult[];
  reportTimestamp: string;
}
