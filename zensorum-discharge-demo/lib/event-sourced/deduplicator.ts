import { WorkflowEvent } from '@/types/domain/event';

/**
 * Global Deduplication Gate
 * Strategy: Composite Key [patientId + type + sequence]
 */
class GlobalDeduplicator {
  private seenKeys: Set<string> = new Set();

  public shouldProcess(event: WorkflowEvent): boolean {
    // Identity is now governed ONLY by the stable eventId
    const key = event.eventId;
    
    if (this.seenKeys.has(key)) {
      return false;
    }
    
    this.seenKeys.add(key);
    return true;
  }

  public reset() {
    this.seenKeys.clear();
  }

  public isProcessed(eventId: string): boolean {
    return this.seenKeys.has(eventId);
  }
}

export const globalDeduplicator = new GlobalDeduplicator();
