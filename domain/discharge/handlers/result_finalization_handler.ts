// src/handlers/result_finalization_handler.ts
import { EventHandler } from '../../packages/core/types';
import { ZensorumClient } from '../../apps/zensorum-discharge-demo/src/lib/sdk_client';

/**
 * Handler for LAB.RESULT.FINALIZED.COMPLETED via SDK
 */
export class ResultFinalizationHandler implements EventHandler {
  constructor(private client: ZensorumClient) {}

  public async execute(event: any): Promise<any[]> {
    // console.log(`[ResultFinalizationHandler] Finalizing result via SDK: ${event.event_id}`);
    
    // SDK authoring integration
    await this.client.authorIntent(
      'DISCHARGE_FINALIZATION_WORKFLOW',
      'TENANT_HOSPITAL_01',
      { sample_id: event.payload.sample_id }
    );
    
    return []; // Future: Observe events via client instead of return events
  }
}
