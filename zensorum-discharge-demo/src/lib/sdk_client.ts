import { 
  PublicApiAdapter, 
  SdkClient, 
  StreamType
} from './sdk_interfaces';
import { 
  RunId, 
  WorkflowId, 
  TenantId,
  ZensorumEvent
} from '../../core/types';

/**
 * Zensorum SDK Client
 * 
 * A constitutional authoring surface for the Zensorum Runtime.
 * Provides rich operational semantics for intent authoring, observation, and inspection.
 */
export class ZensorumClient implements SdkClient {
  constructor(
    public readonly api: PublicApiAdapter
  ) {}

  /**
   * Authors a governed operational intent.
   * This is the primary entry point for triggering execution.
   */
  public async authorIntent(
    workflowId: WorkflowId, 
    tenantId: TenantId, 
    params: Record<string, any>
  ): Promise<RunId> {
    // console.log(`[SDK] Authoring intent for workflow: ${workflowId}`);
    return this.api.authorizeIntent(workflowId, tenantId, params);
  }

  /**
   * Subscribes to a classified operational stream.
   */
  public observe(
    runId: RunId, 
    type: StreamType, 
    handler: (event: ZensorumEvent) => void
  ): void {
    const stream = this.api.getClassifiedStream(runId, type);
    
    (async () => {
      for await (const event of stream) {
        handler(event);
      }
    })();
  }

  /**
   * Reconstructs the authoritative causal lineage of a run.
   */
  public async inspectLineage(runId: RunId): Promise<ZensorumEvent[]> {
    const stream = this.api.getClassifiedStream(runId, StreamType.PROJECTION);
    const events: ZensorumEvent[] = [];
    
    for await (const event of stream) {
      events.push(event);
    }
    
    return events;
  }

  /**
   * Coordinates the resumption of a suspended run.
   */
  public async coordinateContinuation(
    runId: RunId, 
    token: any, 
    signal: any
  ): Promise<void> {
    return this.api.coordinateContinuation(runId, token, signal);
  }
}
