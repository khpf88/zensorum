import { 
  GoldenExecutionTrace, 
  CertificationSeal, 
  CertificationReplayReport, 
  ReplayProtocolVersion 
} from '../types';
import { 
  ZensorumScenario, 
  ExecutionBundle 
} from '@zensorum/application-contracts';
import { StableSemanticProjection } from '@zensorum/core/identity/ipa';
import { LedgerEntry } from '@zensorum/ledger/core/entry';

export type ArtifactType = 
  | 'SCENARIO'
  | 'PROJECTION'
  | 'BUNDLE'
  | 'TRACE'
  | 'REPLAY_REPORT'
  | 'CERTIFICATION_REPORT'
  | 'CERTIFICATION_SEAL'
  | 'LEDGER_ENTRY'
  | 'MANIFEST';

export interface ArtifactManifest {
  executionId: string;
  replayProtocolVersion: ReplayProtocolVersion;
  projectionVersion: string;
  canonicalHash: string;
  artifacts: {
    [key in ArtifactType]?: {
      hash: string;
      path: string;
      persistedAt: string;
    }
  };
  certificationState: 'UNCERTIFIED' | 'CERTIFIED' | 'FAILED';
}

export interface ExecutionArtifacts {
  scenario: ZensorumScenario;
  projection: StableSemanticProjection;
  bundle: ExecutionBundle;
  trace?: GoldenExecutionTrace;
  replayReport?: CertificationReplayReport;
  certificationSeal?: CertificationSeal;
  ledgerEntry?: LedgerEntry;
  manifest: ArtifactManifest;
}
