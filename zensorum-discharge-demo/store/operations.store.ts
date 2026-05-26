import { create } from 'zustand';
import { WorkflowEvent } from '@/types/domain/event';
import { EntityWorkflowState } from '@/types/domain/workflow-runtime';
import { reduceState } from '@/lib/runtime/orchestration/engine';
import { DISCHARGE_WORKFLOW } from '@/lib/runtime/orchestration/definition';
import { eventBus } from '@/services/runtime/event-bus';

interface OrchestrationStore {
  eventLedger: WorkflowEvent[];
  patients: Record<string, EntityWorkflowState>;
  terminalStates: Record<string, boolean>; // Terminal Lock
  
  // Serialization structures
  eventQueues: Record<string, WorkflowEvent[]>;
  isProcessing: Record<string, boolean>;
  epochByPatient: Record<string, number>;
  lastSequence: Record<string, Record<string, number>>; // Sequence per stage
  
  dispatch: (event: WorkflowEvent) => void;
  processQueue: (patientId: string) => Promise<void>;
  rebuildState: () => void;
}

export const useOperationsStore = create<OrchestrationStore>((set, get) => ({
  eventLedger: [],
  patients: {},
  terminalStates: {},
  eventQueues: {},
  isProcessing: {},
  epochByPatient: {},
  lastSequence: {},

  dispatch: (event) => {
    const currentState = get();
    const patientId = event.patientId;
    
    // Pure Pipe: Enqueue for Deterministic Processing
    const currentQueue = currentState.eventQueues[patientId] || [];
    set({
      eventQueues: {
        ...currentState.eventQueues,
        [patientId]: [...currentQueue, event]
      }
    });

    // Trigger Processor
    get().processQueue(patientId);
  },

  processQueue: async (patientId: string) => {
    const currentState = get();
    if (currentState.isProcessing[patientId]) return;

    set({ isProcessing: { ...currentState.isProcessing, [patientId]: true } });

    let queue = get().eventQueues[patientId] || [];
    
    while (queue.length > 0) {
      const event = queue.shift()!;
      const stage = event.type.replace('WORKFLOW.', '');
      
      set({ eventQueues: { ...get().eventQueues, [patientId]: queue } });

      let patient = get().patients[patientId];

      if (!patient) {
        patient = {
          entityId: patientId, stage: "INITIATED", seq: 0, epoch: 0,
          locked: false, lastEvent: null, completedStates: [], transitionHistory: [],
          appliedTransitions: [], appliedEventSet: [], stateVersion: 0, dependencyState: {}, isAuthorized: false, lastUpdateTimestamp: 0,
        };
      }

      // 1. Authoritative Pure Reducer (The Correctness Kernel)
      // All guards (Idempotency, Monotonicity, Immutability) are inside reduceState
      const nextState = reduceState(patient, event, DISCHARGE_WORKFLOW);
      
      // 2. State Comparison for Commitment
      if (nextState === patient) {
          // No mutation occurred (Guard rejected event)
          queue = get().eventQueues[patientId] || [];
          continue;
      }

      // 3. Post-Reducer Sync (Terminal Lock Cache)
      const nextTerminalStates = { ...get().terminalStates };
      if (nextState.locked) {
        nextTerminalStates[patientId] = true;
        eventBus.lockPatient(patientId); // Hard Stop at Ingress
        console.log("TERMINAL_CONFIRMED", { 
          patientId, 
          workflow_locked: true, 
          reconciliation_stopped: true 
        });
      }

      set({
        eventLedger: [...get().eventLedger, event].slice(-1000),
        patients: { ...get().patients, [patientId]: nextState },
        terminalStates: nextTerminalStates,
        lastSequence: { ...get().lastSequence, [patientId]: { ...(get().lastSequence[patientId] || {}), [stage]: event.sequence } }
      });
      
      queue = get().eventQueues[patientId] || [];
    }

    set({ isProcessing: { ...get().isProcessing, [patientId]: false } });
  },

  rebuildState: () => {},
}));
