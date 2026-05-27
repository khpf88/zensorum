import { CanonicalDomainGraph } from '../workflow-engine';

/**
 * Normalizes a CanonicalDomainGraph into a deterministic form.
 */
export class CanonicalNormalizationEngine {
  public normalize(graph: CanonicalDomainGraph): CanonicalDomainGraph {
    // 1. Sort nodes deterministically
    const normalizedNodes = [...graph.nodes].sort((a, b) => a.id.localeCompare(b.id));

    // 2. Sort transitions deterministically
    const normalizedTransitions = [...graph.transitions].sort((a, b) => {
      const fromCmp = a.fromNode.localeCompare(b.fromNode);
      if (fromCmp !== 0) return fromCmp;
      return a.toNode.localeCompare(b.toNode);
    });

    // 3. Sort policy bindings and fallbacks
    const normalizedPolicies = [...graph.policyBindings].sort((a, b) => a.policyId.localeCompare(b.policyId));
    const normalizedFallbacks = [...graph.deterministicFallbacks].sort((a, b) => a.nodeId.localeCompare(b.nodeId));

    return {
      ...graph,
      nodes: normalizedNodes,
      transitions: normalizedTransitions,
      policyBindings: normalizedPolicies,
      deterministicFallbacks: normalizedFallbacks,
    };
  }
}
