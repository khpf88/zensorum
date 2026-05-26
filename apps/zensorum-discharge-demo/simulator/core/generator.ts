import { eventBus } from "@/services/runtime/event-bus";
import { v4 as uuidv4 } from 'uuid';
import { resolveEligibleTransitions } from "@/lib/runtime/orchestration/resolver";
import { DISCHARGE_WORKFLOW } from "@/lib/runtime/orchestration/definition";

const activeEntities: any[] = [];
const MAX_CONCURRENT = 8;
const EVENTS_PER_SECOND = 10;

let isRunning = false;
let intervalId: NodeJS.Timeout | null = null;
let rafId: number | null = null;

/**
 * Zensorum Fault-Injection Simulator
 * Simulates parallel execution, async arrival, and noisy delivery.
 */
export const startSimulation = () => {
  if (isRunning) return () => {};
  isRunning = true;
  console.log("STREAM_STARTED");

  const emit = (entityId: string, stateName: string, sequence: number, epoch: number, isDuplicate = false) => {
    const event = {
      eventId: isDuplicate ? `dup-${entityId}-${stateName}` : uuidv4(), // Stable ID per logic
      patientId: entityId,
      workflowId: DISCHARGE_WORKFLOW.id,
      type: `WORKFLOW.${stateName}`,
      sequence,
      timestamp: Date.now(),
      epoch,
    };
    
    // console.log(`[Simulator] ${isDuplicate ? 'RETRY' : 'EMIT'} ${stateName} for ${entityId.slice(0,8)} (seq: ${sequence}, epoch: ${epoch})`);
    eventBus.publish(event as any);
  };

  // Paced Generator
  intervalId = setInterval(() => {
    if (activeEntities.length < MAX_CONCURRENT) {
      const id = uuidv4();
      const entity = {
        id,
        completed: ['INITIATED'],
        seq: 1,
        epoch: 1, // Initial epoch
        nextUpdate: Date.now() + 1000,
      };
      activeEntities.push(entity);
      emit(id, 'INITIATED', entity.seq, entity.epoch);
    }
  }, 3000);

  // Orchestration Chaos Loop
  const runChaos = () => {
    if (!isRunning) return;
    const now = Date.now();

    activeEntities.forEach((entity) => {
      // TERMINATION CHECK: Stop if DISCHARGE_COMPLETED
      if (entity.completed.includes('DISCHARGE_COMPLETED')) return;

      // 1. Get eligible states based on simulated truth (using pure resolver)
      const mockState = { completedStates: entity.completed } as any;
      const eligible = resolveEligibleTransitions(mockState, DISCHARGE_WORKFLOW);

      if (eligible.length > 0 && now >= entity.nextUpdate) {
        // Chaos: Randomly pick from eligible parallel branches
        const target = eligible[Math.floor(Math.random() * eligible.length)];
        
        entity.seq++;
        entity.completed.push(target);
        
        // 2. Fault Injection: Emit event
        emit(entity.id, target, entity.seq, entity.epoch);

        entity.nextUpdate = now + 1500 + Math.random() * 2000;
      }
    });
  };

  intervalId = setInterval(runChaos, 1000); // 1-second tick rate

  return () => {
    isRunning = false;
    if (intervalId) clearInterval(intervalId);
    activeEntities.length = 0;
    console.log("STREAM_STOPPED");
  };
};
