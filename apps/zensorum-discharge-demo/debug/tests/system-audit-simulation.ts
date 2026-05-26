import { eventBus } from "@/services/runtime/event-bus";
import { v4 as uuidv4 } from 'uuid';
import { DISCHARGE_WORKFLOW } from "@/lib/runtime/orchestration/definition";
import { useOperationsStore } from "@/store/operations.store";

async function runSystemAuditSimulation() {
  console.log("--- ZENSORUM SYSTEM AUDIT SIMULATION v2.0 ---");
  
  // Initialize Store Subscription
  const dispatch = useOperationsStore.getState().dispatch;
  eventBus.subscribe((event) => {
    dispatch(event as any);
  });

  const logs: string[] = [];
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  // Intercept logs for audit analysis
  console.log = (...args) => { logs.push(`[LOG] ${args[0]} ${JSON.stringify(args[1] || '')}`); originalConsoleLog(...args); };
  console.warn = (...args) => { logs.push(`[WARN] ${args[0]} ${JSON.stringify(args[1] || '')}`); originalConsoleWarn(...args); };
  console.error = (...args) => { logs.push(`[ERROR] ${args[0]} ${JSON.stringify(args[1] || '')}`); originalConsoleError(...args); };

  const auditPatients = {
    IDEMPOTENCY: 'audit-patient-idempotency',
    ORDERING: 'audit-patient-ordering',
    TERMINAL: 'audit-patient-terminal'
  };

  const tasks: Promise<void>[] = [];

  // --- 1. IDEMPOTENCY AUDIT ---
  tasks.push((async () => {
    const id = auditPatients.IDEMPOTENCY;
    const event = {
      eventId: 'unique-init-1',
      patientId: id,
      workflowId: DISCHARGE_WORKFLOW.id,
      type: 'WORKFLOW.INITIATED',
      sequence: 1,
      timestamp: Date.now(),
      epoch: 1
    };
    
    await eventBus.publish(event);
    await eventBus.publish(event); // Exact Duplicate (Ingress Suppression)
    
    await eventBus.publish({
      ...event,
      eventId: 'different-id-same-transition',
      sequence: 2 // Semantic Duplicate (Transition Suppression - TRANSITION_SUPPRESSED)
    });
  })());

  // --- 2. ORDERING AUDIT ---
  tasks.push((async () => {
    const id = auditPatients.ORDERING;
    // INITIATED (OK)
    await eventBus.publish({
      eventId: uuidv4(), patientId: id, workflowId: DISCHARGE_WORKFLOW.id,
      type: 'WORKFLOW.INITIATED', sequence: 1, timestamp: Date.now(), epoch: 1
    });
    // Jump to sequence 3 (Should be caught by sequence guard in reducer)
    await eventBus.publish({
      eventId: uuidv4(), patientId: id, workflowId: DISCHARGE_WORKFLOW.id,
      type: 'WORKFLOW.CLINICALLY_CLEARED', sequence: 3, timestamp: Date.now(), epoch: 1
    });
  })());

  // --- 3. TERMINAL AUDIT ---
  tasks.push((async () => {
    const id = auditPatients.TERMINAL;
    const stages = [
      'INITIATED', 'CLINICALLY_CLEARED', 'INSURANCE_VALIDATED', 
      'MEDICATION_RECONCILIATED', 'TRANSPORT_READY', 
      'DISCHARGE_AUTHORIZED', 'DISCHARGE_COMPLETED'
    ];

    for (let i = 0; i < stages.length; i++) {
      await eventBus.publish({
        eventId: `terminal-seq-${i}`, patientId: id, workflowId: DISCHARGE_WORKFLOW.id,
        type: `WORKFLOW.${stages[i]}`, sequence: i + 1, timestamp: Date.now(), epoch: 1
      });
    }

    // Try to inject event AFTER completion
    await eventBus.publish({
      eventId: 'post-terminal-leak', patientId: id, workflowId: DISCHARGE_WORKFLOW.id,
      type: 'WORKFLOW.LATE_TASK', sequence: 8, timestamp: Date.now(), epoch: 1
    });
  })());

  await Promise.all(tasks);
  await new Promise(r => setTimeout(r, 500));

  // --- ANALYSIS ---
  console.log("\n--- AUDIT INVARIANT VERIFICATION ---");
  
  const results = {
    idempotency: { status: "PASS", violations: [] as string[] },
    ordering: { status: "PASS", violations: [] as string[] },
    terminal: { status: "PASS", violations: [] as string[] },
    eventbus: { status: "PASS", violations: [] as string[] }
  };

  // 1. Idempotency Check
  const acceptedInitiated = logs.filter(l => l.includes('ACCEPTED') && l.includes('INITIATED') && l.includes(auditPatients.IDEMPOTENCY));
  if (acceptedInitiated.length !== 1) {
    results.idempotency.status = "FAIL";
    results.idempotency.violations.push(`Expected 1 INITIATED emission, found ${acceptedInitiated.length}`);
  }

  // 2. Ordering Check
  const orderingPatientState = useOperationsStore.getState().patients[auditPatients.ORDERING];
  if (orderingPatientState?.completedStates.length !== 1) {
    results.ordering.status = "FAIL";
    results.ordering.violations.push(`Ordering patient accepted invalid jump. States: ${orderingPatientState?.completedStates.join(',')}`);
  }

  // 3. Terminal Check
  const terminalPatientState = useOperationsStore.getState().patients[auditPatients.TERMINAL];
  const terminalEvents = logs.filter(l => l.includes(auditPatients.TERMINAL) && l.includes('ACCEPTED'));
  if (terminalEvents.length > 7) {
    results.terminal.status = "FAIL";
    results.terminal.violations.push(`Terminal patient accepted more than 7 events. Found ${terminalEvents.length}`);
  }
  if (!terminalPatientState?.locked) {
    results.terminal.status = "FAIL";
    results.terminal.violations.push("Terminal patient state not locked.");
  }

  // 4. Event Bus Correctness
  const duplicateSuppressed = logs.filter(l => l.includes('DUPLICATE_SUPPRESSED'));
  const transitionSuppressed = logs.filter(l => l.includes('TRANSITION_SUPPRESSED'));
  if (duplicateSuppressed.length === 0) {
    results.eventbus.status = "FAIL";
    results.eventbus.violations.push("Bus failed to suppress ingress duplicates.");
  }
  if (transitionSuppressed.length === 0) {
    results.eventbus.status = "FAIL";
    results.eventbus.violations.push("Bus failed to suppress semantic transitions.");
  }

  // Output Results
  Object.entries(results).forEach(([invariant, data]) => {
    console.log(`\nInvariant: ${invariant.toUpperCase()}`);
    console.log(`Status: ${data.status}`);
    data.violations.forEach(v => console.log(`  - VIOLATION: ${v}`));
  });

  const isCompliant = Object.values(results).every(r => r.status === "PASS");
  
  console.log("\n-----------------------------------------");
  console.log(`AUDIT-GRADE COMPLIANT: ${isCompliant ? "YES" : "NO"}`);
  console.log("-----------------------------------------");

  // Restore consoles
  console.log = originalConsoleLog;
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
}

runSystemAuditSimulation().catch(console.error);
