import { CanonicalDomainGraph } from './types';
import { TransformationInvariantContract, InvariantPropagationMap } from '@zensorum/validation/invariant';

/**
 * Workflow Compiler Interface
 * Responsibility: Compiles Domain-level workflow definitions into the
 * Canonical Domain Graph (CDG) intermediate representation.
 */
export interface WorkflowCompiler {
  /**
   * Compiles an abstract domain workflow into the formal Canonical Domain Graph.
   * @param domainWorkflow The workflow definition object from the /domain layer.
   * @returns A CanonicalDomainGraph ready for CSNL transformation.
   */
  compile(domainWorkflow: any): CanonicalDomainGraph;

  /**
   * Declares the invariants that this compiler guarantees during transformation.
   */
  getInvariants(): TransformationInvariantContract;

  /**
   * Defines how input invariants map to output invariants.
   */
  getTransformationMap(): InvariantPropagationMap[];
}
