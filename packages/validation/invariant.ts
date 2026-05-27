/**
 * Transformation Invariant Model
 */

export interface TransformationInvariantContract {
  stage: string;
  preconditions: string[];
  postconditions: string[];
  preservedProperties: string[];
  forbiddenMutations: string[];
}

/**
 * A ComposableInvariant extends a base contract with metadata for propagation and composition.
 */
export interface ComposableInvariant extends TransformationInvariantContract {
  id: string;
  dependenceWeight: number; // For conflict resolution
}

export type CompositionRule = 'STRENGTHEN' | 'WEAKEN' | 'MERGE';

export interface InvariantCompositionRules {
  rule: CompositionRule;
  onConflict: 'REJECT' | 'PRIORITIZE';
}

/**
 * Interface for verifying invariant adherence during transformation
 */
export interface InvariantChecker<TInput, TOutput> {
  verify(input: TInput, output: TOutput, contract: TransformationInvariantContract): boolean;
}

/**
 * Formalizes the propagation of invariants across transformations.
 */
export interface InvariantPropagationMap {
  inputInvariantId: string;
  outputInvariantId: string;
  rule: InvariantCompositionRules;
}
