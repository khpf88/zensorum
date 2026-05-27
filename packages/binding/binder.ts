import { CanonicalDomainGraph } from '@zensorum/workflow-engine';
import { ExecutionSemanticBinding } from './types';

/**
 * Maps a CanonicalDomainGraph to its deterministic execution semantics.
 */
export interface SemanticBinder {
  bind(graph: CanonicalDomainGraph): ExecutionSemanticBinding;
}
