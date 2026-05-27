import { CanonicalDomainGraph } from '../workflow-engine';
import { CanonicalNormalizationEngine } from './engine';
import { ComposableInvariant } from '../validation/invariant';

export class SemanticEquivalenceChecker {
  private engine = new CanonicalNormalizationEngine();

  /**
   * Two graphs are equivalent if:
   * 1. Normalized forms are structurally identical.
   * 2. Their invariant sets are identical.
   */
  public isEquivalent(
    g1: CanonicalDomainGraph,
    g2: CanonicalDomainGraph,
    i1: ComposableInvariant[],
    i2: ComposableInvariant[]
  ): boolean {
    // 1. Normalize
    const n1 = this.engine.normalize(g1);
    const n2 = this.engine.normalize(g2);

    // 2. Structural Comparison (simplified for now)
    const isStructurallyEqual = JSON.stringify(n1) === JSON.stringify(n2);
    if (!isStructurallyEqual) return false;

    // 3. Invariant Comparison
    const inv1Ids = i1.map(i => i.id).sort();
    const inv2Ids = i2.map(i => i.id).sort();
    
    return JSON.stringify(inv1Ids) === JSON.stringify(inv2Ids);
  }
}
