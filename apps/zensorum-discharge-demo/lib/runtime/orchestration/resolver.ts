import { WorkflowDefinition, EntityWorkflowState } from '@/types/domain/workflow-runtime';

/**
 * Pure Dependency Resolver
 * Determines eligibility based on state graph.
 */
export const resolveEligibleTransitions = (
  state: EntityWorkflowState,
  definition: WorkflowDefinition
): string[] => {
  const completed = state.completedStates;

  return definition.states.filter((targetState) => {
    // 1. Root exception
    if (targetState === 'INITIATED') {
      return completed.length === 0;
    }

    // 2. Already completed check
    if (completed.includes(targetState)) {
      return false;
    }

    // 3. Structural parent satisfaction (ALL parents must be completed)
    const parents = definition.transitions
      .filter((t) => t.to === targetState)
      .map((t) => t.from);
    
    const parentsSatisfied = parents.length > 0 && parents.every((p) => completed.includes(p));
    if (!parentsSatisfied) return false;

    // 4. Gate satisfaction (Execution Admissibility)
    const gate = definition.gates.find((g) => g.target === targetState);
    if (gate) {
      return gate.requires.every((req) => completed.includes(req));
    }

    return true;
  });
};
