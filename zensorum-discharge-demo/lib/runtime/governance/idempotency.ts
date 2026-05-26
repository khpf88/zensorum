import { WorkflowEvent } from "@/types/domain/event";

/**
 * Pluggable Storage Interface for Idempotency
 */
export interface IdempotencyStore {
  has(key: string): Promise<boolean>;
  set(key: string): Promise<void>;
  clear(): Promise<void>;
}

/**
 * In-Memory Implementation (Default)
 */
class MemoryIdempotencyStore implements IdempotencyStore {
  private cache: Set<string> = new Set();

  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  async set(key: string): Promise<void> {
    this.cache.add(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

/**
 * Zensorum Idempotency Kernel
 * Enforces exactly-once acceptance at the boundary.
 */
export class IdempotencyKernel {
  constructor(private store: IdempotencyStore = new MemoryIdempotencyStore()) {}

  /**
   * Generates a deterministic key per business requirements.
   * idempotencyKey = patientId + ":" + workflowType + ":" + stage
   */
  public generateKey(event: WorkflowEvent): string {
    // workflowType is implied to be part of the event or derived; 
    // using event.workflowId as proxy for workflowType as defined in the system.
    return `${event.patientId}:${event.workflowId}:${event.type}`;
  }

  /**
   * Checks if an event is unique and registers it.
   */
  public async checkAndRegister(event: WorkflowEvent): Promise<{ accepted: boolean; key: string }> {
    const key = this.generateKey(event);
    
    if (await this.store.has(key)) {
      console.warn("IDEMPOTENCY_HIT", { key, eventId: event.eventId });
      return { accepted: false, key };
    }

    await this.store.set(key);
    console.log("IDEMPOTENCY_ACCEPTED", { key, eventId: event.eventId });
    return { accepted: true, key };
  }
}

export const idempotencyKernel = new IdempotencyKernel();
