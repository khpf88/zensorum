// src/replay/types.ts

// Phase 3.9 Immutable Contracts (Assumed to exist for this phase)
// Declared as global functions, implemented as mocks in main.ts
declare function encodeCanonical(dto: CanonicalDTO): Uint8Array;
declare function hashCanonical(dto: CanonicalDTO): string;
declare function normalize<T extends CanonicalDTO>(dto: T): T;

// 1. CORE TYPES (MANDATORY)

// --- Canonical DTOs ---
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

// --- Golden Vector ---
export interface GoldenVector {
  id: string;
  version: string;
  input: CanonicalDTO;
  expectedOutputHash?: string;
  expectedEncodedBytesHash?: string;
}

// --- Test Run Result ---
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

// --- Comparison Result ---
export type FailureType = 'replay' | 'encoding' | 'hash' | 'ordering' | 'unknown';

export interface FailureDetailsDTO {
  type: FailureType;
  message: string;
  divergentPropertyPath?: string;
  expectedValue?: unknown;
  actualValue?: unknown;
  environmentA?: ExecutionEnvironmentConfig;
  environmentB?: ExecutionEnvironmentConfig;
}

export interface ComparisonResult {
  inputVectorId: string;
  status: 'PASS' | 'FAIL';
  failures: FailureDetailsDTO[];
  firstRunResult?: TestRunResult;
}

// --- Validation Report ---
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
