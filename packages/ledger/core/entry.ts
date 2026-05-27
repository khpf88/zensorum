import { CertificationSeal, CertificationReplayReport, ReplayProtocolVersion } from '@zensorum/replay/types';

export interface LedgerEntry {
  executionIdentity: string;
  projectionVersion: string;
  schemaVersion: string;
  artifactHash: string; // Hash of the GoldenExecutionTrace
  finalTraceHash: string; // finalExecutionHash from replay
  
  lineage: {
    previousIdentity?: string;
    transformationSource?: string;
  };

  certificationSeal: CertificationSeal;
  replayReport: CertificationReplayReport;

  timestamp: string;

  entryHash: string;
  previousEntryHash?: string;
}
