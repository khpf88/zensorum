import { ExecutionBundle } from '../application-contracts/types/execution-bundle';
import { CanonicalSemanticExecutionBundle } from './csnl-definitions';

export interface CSNL_Normalizer {
  normalize(bundle: ExecutionBundle): CanonicalSemanticExecutionBundle;
}
