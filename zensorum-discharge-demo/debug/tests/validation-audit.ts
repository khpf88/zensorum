import { eventBus } from "@/services/runtime/event-bus";
import { v4 as uuidv4 } from 'uuid';
import { DISCHARGE_WORKFLOW } from "@/lib/runtime/orchestration/definition";

async function runValidationAudit() {
  console.log("--- ZENSORUM COMPLIANCE AUDIT: EMISSION INTEGRITY ---");
  
  const patients = Array.from({ length: 5 }, (_, i) => `patient-alpha-${i}`);
  const results: Record<string, { events: any[], errors: any[] }> = {};
  
  patients.forEach(id => {
    results[id] = { events: [], errors: [] };
  });

  // Subscribe to capture successful emissions
  const unsubscribe = eventBus.subscribe((event) => {
    results[event.patientId].events.push(event);
  });

  console.log("STREAMING: Concurrent Workflows + Burst Pattern...");

  const tasks: Promise<void>[] = [];

  // 1. Success Cases (Concurrent + Random Timing)
  patients.slice(0, 3).forEach(patientId => {
    tasks.push((async () => {
      for (let seq = 1; seq <= 3; seq++) {
        await new Promise(r => setTimeout(r, Math.random() * 50));
        await eventBus.publish({
          eventId: uuidv4(),
          patientId,
          workflowId: DISCHARGE_WORKFLOW.id,
          type: seq === 1 ? 'WORKFLOW.INITIATED' : `WORKFLOW.STAGE_${seq}`,
          sequence: seq,
          timestamp: Date.now(),
          epoch: 1
        });
      }
    })());
  });

  // 2. Failure Case: Sequence Gap
  const gapPatient = patients[3];
  tasks.push((async () => {
    try {
      // Seq 1 (OK)
      await eventBus.publish({
        eventId: uuidv4(),
        patientId: gapPatient,
        workflowId: DISCHARGE_WORKFLOW.id,
        type: 'WORKFLOW.INITIATED',
        sequence: 1,
        timestamp: Date.now(),
        epoch: 1
      });
      // Seq 3 (GAP - Expected error)
      await eventBus.publish({
        eventId: uuidv4(),
        patientId: gapPatient,
        workflowId: DISCHARGE_WORKFLOW.id,
        type: 'WORKFLOW.STAGE_3',
        sequence: 3,
        timestamp: Date.now(),
        epoch: 1
      });
    } catch (e: any) {
      results[gapPatient].errors.push(e);
    }
  })());

  // 3. Failure Case: Duplicate (Idempotency)
  const dupPatient = patients[4];
  tasks.push((async () => {
    const event = {
      eventId: uuidv4(),
      patientId: dupPatient,
      workflowId: DISCHARGE_WORKFLOW.id,
      type: 'WORKFLOW.INITIATED',
      sequence: 1,
      timestamp: Date.now(),
      epoch: 1
    };
    await eventBus.publish(event);
    await eventBus.publish(event); // Duplicate eventId (Ingress suppression)
    
    // Transition Idempotency Case: Same transition, different eventId
    await eventBus.publish({
      ...event,
      eventId: uuidv4(), // Different eventId
      sequence: 2 // This would normally be accepted if we only checked eventKey
    });
  })());

  await Promise.all(tasks);
  // Wait a bit for async chain completion
  await new Promise(r => setTimeout(r, 200));

  unsubscribe();

  console.log("\n--- AUDIT SUMMARY BY PATIENT ---");
  let allPassed = true;

  Object.entries(results).forEach(([id, data]) => {
    console.log(`\nPatient: ${id}`);
    const sequences = data.events.map(e => e.sequence);
    console.log(`  Received Sequences: ${sequences.join(" -> ")}`);
    
    let status = "PASS";
    
    // Check FIFO / Monotonicity
    for (let i = 1; i < sequences.length; i++) {
        if (sequences[i] <= sequences[i-1]) {
            status = "FAIL: Interleaving detected";
            allPassed = false;
        }
    }

    if (id === gapPatient) {
        const hasGapError = sequences.length === 1; // Should stop after first event if gap caught? 
        // Actually, our current implementation logs and throws but doesn't stop the next chain link.
        // But the second publish with seq 3 WILL throw in internalPublish.
        console.log(`  Audit: Sequence Gap Protection... ${sequences.length === 1 ? "PASSED" : "FAILED (Accepted Gap)"}`);
        if (sequences.length !== 1) allPassed = false;
    }

    if (id === dupPatient) {
        console.log(`  Audit: Idempotency Protection... ${sequences.length === 1 ? "PASSED" : "FAILED (Accepted Duplicate)"}`);
        if (sequences.length !== 1) allPassed = false;
    }

    if (id.startsWith("patient-alpha") && id !== gapPatient && id !== dupPatient) {
        console.log(`  Audit: Monotonic Integrity... ${sequences.length === 3 ? "PASSED" : "FAILED (Missing Events)"}`);
        if (sequences.length !== 3) allPassed = false;
    }
  });

  console.log("\n-----------------------------------------");
  console.log(`FINAL STATUS: ${allPassed ? "✅ ALL INVARIANTS PASSED" : "❌ AUDIT FAILED"}`);
  console.log("-----------------------------------------");
}

runValidationAudit().catch(console.error);
