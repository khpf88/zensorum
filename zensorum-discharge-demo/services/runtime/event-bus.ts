import { WorkflowEvent } from "@/types/domain/event";
import { idempotencyKernel } from "@/lib/runtime/governance/idempotency";

type EventCallback = (event: WorkflowEvent) => void;

/**
 * High-Integrity Event Transport
 */
class EventBus {
  private subscribers: Set<EventCallback> = new Set();
  private queues: Map<string, Promise<void>> = new Map();
  private lastSequenceByPatient: Map<string, number> = new Map();
  private lockedPatients: Set<string> = new Set();

  public subscribe(callback: EventCallback) {
    this.subscribers.add(callback);
    console.log("LISTENER_REGISTERED");
    return () => {
      this.subscribers.delete(callback);
      console.log("LISTENER_CLEANED");
    };
  }

  public lockPatient(patientId: string) {
    this.lockedPatients.add(patientId);
  }

  /**
   * Sequential Emission Pipeline
   * Ensures per-patient FIFO execution via promise chaining.
   */
  public async publish(event: WorkflowEvent): Promise<void> {
    const patientId = event.patientId;
    
    // 0. Hard Terminal Lock (Ingress Protection)
    if (this.lockedPatients.has(patientId)) {
        console.error("REJECTED_POST_TERMINAL", { 
          patientId, 
          eventId: event.eventId,
          type: event.type 
        });
        return;
    }

    // 1. Ingress Idempotency Gate (Boundary Protection)
    // Drop duplicates BEFORE they even enter the queue
    const { accepted, key } = await idempotencyKernel.checkAndRegister(event);

    if (!accepted) {
      // Log suppressed duplicates as requested
      return;
    }

    // 2. Get or initialize the promise chain for this patient
    const previousPromise = this.queues.get(patientId) || Promise.resolve();
    
    // 3. Chain the new publication task
    const currentPromise = previousPromise.then(async () => {
      try {
        await this.internalPublish(event, key);
      } catch (error) {
        console.error(`[EventBus] Critical error in patient stream ${patientId}:`, error);
      }
    });

    // 4. Update the queue map
    this.queues.set(patientId, currentPromise);

    // Return the promise to maintain the async contract
    return currentPromise;
  }

  private async internalPublish(event: WorkflowEvent, eventKey: string) {
    const patientId = event.patientId;
    const lastSeq = this.lastSequenceByPatient.get(patientId) ?? 0;

    // 1. Validate Sequence (Light Compliance Layer)
    if (event.sequence !== lastSeq + 1) {
      const error = {
        name: "SEQ_GAP_DETECTED",
        patientId,
        expected: lastSeq + 1,
        received: event.sequence,
        type: event.type
      };
      console.error("[EventBus] Sequence Gap Detected:", error);
      throw error;
    }

    // 2. Accepted for Emission
    console.log("ACCEPTED", { 
      eventKey, 
      eventId: event.eventId,
      type: event.type 
    });

    // 3. Emit Event (Propagation to Subscribers)
    this.subscribers.forEach((callback) => callback(event));

    // 4. Update Sequence Tracker
    this.lastSequenceByPatient.set(patientId, event.sequence);
  }
}


// Singleton ensures single bus instance across HMR
export const eventBus = new EventBus();

