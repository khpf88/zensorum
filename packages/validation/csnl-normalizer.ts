import { ExecutionBundle } from '../../zensorum-discharge-demo/types/runtime/execution-bundle';
import { CanonicalSemanticExecutionBundle } from './csnl-definitions';

export interface CSNL_Normalizer {
  normalize(bundle: ExecutionBundle): CanonicalSemanticExecutionBundle;
}
