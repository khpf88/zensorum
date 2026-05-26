import { EntityWorkflowState } from '@/types/domain/workflow-runtime';
import { deriveOrchestrationGraph } from '@/lib/visualization/event-to-graph';

export const deriveGraphElements = (patients: Record<string, EntityWorkflowState>) => {
  const allNodes: any[] = [];
  const allEdges: any[] = [];

  // Sort patient IDs to ensure stable visual indexing
  const sortedPatientIds = Object.keys(patients).sort();

  sortedPatientIds.forEach((patientId, index) => {
    const patient = patients[patientId];
    const { nodes, edges } = deriveOrchestrationGraph(patient);
    
    // Offset each patient's graph for visualization (Grid layout)
    const offsetNodes = nodes.map(n => ({
        ...n,
        position: { 
            x: n.position.x + (index * 400), 
            y: n.position.y 
        }
    }));

    allNodes.push(...offsetNodes);
    allEdges.push(...edges);
  });

  return { nodes: allNodes, edges: allEdges };
};

