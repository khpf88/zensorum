import { EntityWorkflowState } from '@/types/domain/workflow-runtime';
import { DISCHARGE_WORKFLOW } from '@/lib/runtime/orchestration/definition';
import { WORKFLOW_LAYOUT } from './constants';

export interface GraphNodeState {
  id: string;
  type: string;
  label: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'BLOCKED';
  entityId: string;
  position: { x: number, y: number };
}

export interface GraphEdgeState {
  id: string;
  source: string;
  target: string;
  animated: boolean;
}

/**
 * Orchestration Topology Projection
 * Projects complex branching states into a dependency graph.
 */
export const deriveOrchestrationGraph = (entityState: EntityWorkflowState) => {
  const nodes: GraphNodeState[] = DISCHARGE_WORKFLOW.states.map((stateName) => {
    let status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'BLOCKED' = 'PENDING';
    
    if (entityState.completedStates.includes(stateName)) {
      status = 'COMPLETED';
    }

    return {
      id: `${entityState.entityId}-${stateName}`,
      type: 'default', // Using default to avoid nodeTypes warning if not strictly defined
      label: stateName,
      status,
      entityId: entityState.entityId,
      position: WORKFLOW_LAYOUT[stateName] || { x: 0, y: 0 }
    };
  });

  // Edges reflect the authoritative structural transitions
  const edges: GraphEdgeState[] = DISCHARGE_WORKFLOW.transitions.map((t) => ({
    id: `${entityState.entityId}-${t.from}-${t.to}`,
    source: `${entityState.entityId}-${t.from}`,
    target: `${entityState.entityId}-${t.to}`,
    animated: entityState.completedStates.includes(t.from) && !entityState.completedStates.includes(t.to),
  }));

  return { nodes, edges };
};

