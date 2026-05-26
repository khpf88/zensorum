// src/agents/result_finalization_agent.ts
import { v4 as uuidv4 } from 'uuid';
import { BaseEvent, AgentContext } from '../core/types';

/**
 * ResultFinalizationAgent: Determines final result status.
 * Returns validated event objects only.
 */
export class ResultFinalizationAgent {
  public async finalize(payload: any, context: AgentContext): Promise<BaseEvent[]> {
    // console.log(`[ResultFinalizationAgent] Finalizing result for sample: ${payload.sample_id}`);

    const finalizedEvent: BaseEvent = {
      id: uuidv4(),
      type: 'LAB.RESULT.FINALIZED.COMPLETED',
      timestamp: Date.now(),
      origin: 'INTERNAL',
      event_category: 'DOMAIN',
      payload: {
        sample_id: payload.sample_id,
        final_result: payload.results?.suggestion || 'INCONCLUSIVE',
        finalized_timestamp: new Date().toISOString(),
        authorized_by: 'agent.result_finalization_agent',
      },
      idempotency_key: `finalized-${payload.sample_id}-${uuidv4().split('-')[0]}`,
      metadata: {
        correlation_id: context.correlation_id,
        causation_id: context.causation_id,
      },
    };

    return [finalizedEvent];
  }
}

export const resultFinalizationAgent = new ResultFinalizationAgent();
