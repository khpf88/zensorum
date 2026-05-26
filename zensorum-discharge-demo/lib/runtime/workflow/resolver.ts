import { WorkflowDefinition, EntityWorkflowState } from '@/types/domain/workflow-runtime';

/**
 * Dependency Resolver: The Brain of the Orchestration Runtime.
 * Determines what can happen next based on gates and parallel state.
 */
export class DependencyResolver {
  constructor(private definition: WorkflowDefinition) {}

  /**
   * Calculates which states are eligible for activation.
   */
  public getEligibleStates(state: EntityWorkflowState): string[] {
    const { completedStates } = state;

    return this.definition.states.filter((stateName) => {
      // 1. Cannot be already completed
      if (completedStates.includes(stateName)) {
        return false;
      }

      // 2. Must have all prerequisites from gates satisfied
      const gate = this.definition.gates.find(g => g.target === stateName);
      if (gate) {
        const satisfiesGate = gate.requires.every(req => completedStates.includes(req));
        if (!satisfiesGate) return false;
      }

      // 3. Must have a path from a completed state
      const hasParent = this.definition.transitions.some(t => 
        t.to === stateName && completedStates.includes(t.from)
      );
      
      // Root state exception (INITIATED)
      if (stateName === 'INITIATED' && completedStates.length === 0) return true;

      return hasParent;
    });
  }

  /**
   * Validates if a transition is currently legal.
   */
  public isTransitionLegal(state: EntityWorkflowState, targetState: string): boolean {
      return this.getEligibleStates(state).includes(targetState);
  }
}
