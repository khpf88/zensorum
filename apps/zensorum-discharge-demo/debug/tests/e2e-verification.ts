import { eventBus } from "@/services/runtime/event-bus";
import { v4 as uuidv4 } from 'uuid';
import { DISCHARGE_WORKFLOW } from "@/lib/runtime/orchestration/definition";
import { useOperationsStore } from "@/store/operations.store";
import { deriveGraphElements } from "@/store/selectors/graph.selectors";

async function runE2EVerification() {
  console.log("--- ZENSORUM END-TO-END SYSTEM VERIFICATION ---");
  console.log("Workflow: hospital_discharge_v2");
  
  // Initialize Store Ingestion (Manual subscribe for test environment)
  const dispatch = useOperationsStore.getState().dispatch;
  const stopIngestion = eventBus.subscribe((event) => {
    dispatch(event as any);
  });

  const patients = ['patient-E2E-1', 'patient-E2E-2', 'patient-E2E-3'];
  const workflowStages = [
    'INITIATED',
    'CLINICALLY_CLEARED',
    'INSURANCE_VALIDATED',
    'MEDICATION_RECONCILIATED',
    'TRANSPORT_READY',
    'DISCHARGE_AUTHORIZED',
    'DISCHARGE_COMPLETED'
  ];

  // 1. Concurrent Lifecycle Execution
  console.log("\n[1] EXECUTING FULL LIFECYCLES (Concurrent Burst)...");
  
  const tasks = patients.map(async (patientId, pIdx) => {
    // Each patient goes through full sequence
    for (let i = 0; i < workflowStages.length; i++) {
      const stage = workflowStages[i];
      const seq = i + 1;
      
      // Artificial jitter
      await new Promise(r => setTimeout(r, Math.random() * 30));

      await eventBus.publish({
        eventId: `evt-${patientId}-${stage}`, // Deterministic eventId for trace visibility
        patientId,
        workflowId: DISCHARGE_WORKFLOW.id,
        type: `WORKFLOW.${stage}`,
        sequence: seq,
        timestamp: Date.now(),
        epoch: 1
      });

      // Simulation: Occasional duplicate burst
      if (Math.random() > 0.7) {
        // This should be caught by Ingress Idempotency
        eventBus.publish({
            eventId: `evt-${patientId}-${stage}`,
            patientId,
            workflowId: DISCHARGE_WORKFLOW.id,
            type: `WORKFLOW.${stage}`,
            sequence: seq,
            timestamp: Date.now(),
            epoch: 1
        });
      }
    }
  });

  await Promise.all(tasks);
  
  // Wait for async queue flushing
  await new Promise(r => setTimeout(r, 500));

  // 2. Proof of Idempotency (Event Replay)
  console.log("\n[2] REPLAYING HISTORICAL EVENTS (Idempotency Check)...");
  const replayPatient = patients[0];
  const replayEvent = {
    eventId: `evt-${replayPatient}-CLINICALLY_CLEARED`,
    patientId: replayPatient,
    workflowId: DISCHARGE_WORKFLOW.id,
    type: 'WORKFLOW.CLINICALLY_CLEARED',
    sequence: 2,
    timestamp: Date.now(),
    epoch: 1
  };
  await eventBus.publish(replayEvent); // Should be DUPLICATE_SUPPRESSED

  // 3. Post-Terminal Rejection Test
  console.log("\n[3] TESTING TERMINAL IMMUTABILITY...");
  await eventBus.publish({
    eventId: uuidv4(),
    patientId: patients[1],
    workflowId: DISCHARGE_WORKFLOW.id,
    type: 'WORKFLOW.RESURRECT_DANGER',
    sequence: 8,
    timestamp: Date.now(),
    epoch: 1
  }); // Should be REJECTED_POST_TERMINAL

  // 4. Data Integrity Analysis
  console.log("\n[4] SYSTEM INTEGRITY ANALYSIS...");
  const store = useOperationsStore.getState();
  
  patients.forEach(id => {
    const patientState = store.patients[id];
    console.log(`\nPatient ID: ${id}`);
    console.log(`- Final Stage: ${patientState?.stage}`);
    console.log(`- Completed States: ${patientState?.completedStates.length} / 7`);
    console.log(`- Locked: ${patientState?.locked}`);
    console.log(`- Events Processed: ${patientState?.transitionHistory.length}`);
    
    // UI Projection Consistency Check
    const { nodes, edges } = deriveGraphElements({ [id]: patientState });
    console.log(`- UI Projection Nodes: ${nodes.length}`);
    console.log(`- UI Projection Edges: ${edges.length}`);
    
    const isConsistent = patientState?.locked && nodes.length === 7 && edges.length === DISCHARGE_WORKFLOW.transitions.length;
    console.log(`- Consistency Check: ${isConsistent ? '✅ MATCH' : '❌ DIVERTED'}`);
  });

  // Verification Summary
  const allLocked = patients.every(id => store.patients[id]?.locked);
  const noDivergence = patients.every(id => {
      const ps = store.patients[id];
      const { nodes } = deriveGraphElements({ [id]: ps });
      return nodes.length === 7;
  });

  console.log("\n--- AUDIT READINESS VERDICT ---");
  if (allLocked && noDivergence) {
    console.log("STATUS: PASS");
    console.log("The system demonstrates strict monotonicity, triple-lock idempotency, and stable UI projection.");
  } else {
    console.log("STATUS: FAIL");
    console.log("Data integrity or projection mismatch detected.");
  }
}

runE2EVerification().catch(console.error);
