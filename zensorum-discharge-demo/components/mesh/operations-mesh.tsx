'use client';

import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Panel,
  Node,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useOperationsStore } from '@/store/operations.store';
import { deriveGraphElements } from '@/store/selectors/graph.selectors';
import { DEFAULT_EDGE_OPTIONS, CONNECTION_LINE_STYLE } from '@/lib/visualization/constants';

/**
 * OperationsMesh
 * Visualizes the hardened dependency-driven orchestration topology.
 * Optimized for high-frequency streaming with minimal React Flow churn.
 */
export function OperationsMesh() {
  // 1. Stable State Selection
  const patients = useOperationsStore((state) => state.patients);
  
  // 2. Referential Stability Anchors
  // These MUST be stable to prevent React Flow from remounting the entire graph
  const nodeTypes = useMemo(() => ({}), []);
  const edgeTypes = useMemo(() => ({}), []);

  // 3. Memoized Graph Projection
  const graphData = useMemo(() => {
    return deriveGraphElements(patients);
  }, [patients]);

  // 3. Stable Node Transformation
  // Maps domain graph data to React Flow primitives with stable IDs
  const nodes: Node[] = useMemo(() => {
    return graphData.nodes.map((node) => {
      const isCompleted = node.status === 'COMPLETED';

      return {
        id: node.id, // Stable ID: patientId + stage
        type: 'default',
        data: { label: node.label },
        position: node.position,
        draggable: false,
        selectable: false,
        style: { 
          background: isCompleted ? '#064e3b' : '#111827', 
          color: isCompleted ? '#10b981' : '#64748b',
          borderRadius: '2px',
          padding: '6px',
          fontSize: '8px',
          width: 140,
          textAlign: 'center',
          border: isCompleted ? '1px solid #10b981' : '1px solid #1e293b',
          boxShadow: isCompleted ? '0 0 10px rgba(16, 185, 129, 0.2)' : 'none',
          transition: 'all 0.4s ease',
          pointerEvents: isCompleted ? 'none' : 'auto',
          opacity: isCompleted ? 0.9 : 1
        }
      };
    });
  }, [graphData.nodes]);

  // 4. Stable Edge Transformation
  const edges: Edge[] = useMemo(() => {
    return graphData.edges.map(edge => ({
      id: edge.id, // Stable ID: patientId + from + to
      source: edge.source,
      target: edge.target,
      animated: edge.animated,
      style: { 
          stroke: edge.animated ? '#3b82f6' : '#1e293b', 
          strokeWidth: edge.animated ? 2 : 1,
          opacity: edge.animated ? 1 : 0.4
      }
    }));
  }, [graphData.edges]);

  // 5. Early exit if no data (prevents React Flow initialization with empty sets)
  if (Object.keys(patients).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#070A0F] text-slate-500 font-mono text-xs uppercase tracking-widest">
        Awaiting Orchestration Stream...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }} className="bg-[#070A0F]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        connectionLineStyle={CONNECTION_LINE_STYLE}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll
        selectionKeyCode={null}
        multiSelectionKeyCode={null}
      >
        <Background color="#0f172a" gap={20} />
        <Controls />
        <Panel position="top-right" className="bg-[#0F172A]/90 backdrop-blur-md p-2 text-[10px] font-mono text-cyan-400 border border-[#1E293B]">
          ZENSORUM ORCHESTRATION KERNEL v2.0
        </Panel>
      </ReactFlow>
    </div>
  );
}


