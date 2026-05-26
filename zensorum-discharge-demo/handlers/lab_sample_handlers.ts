// src/handlers/lab_sample_handlers.ts
import { BaseEvent, EventHandler, AgentContext } from '../core/types';
import { v4 as uuidv4 } from 'uuid';
import { agentBridge } from '../core/agent_bridge';
import { sampleAnalysisAgent } from '../agents/sample_analysis_agent';

/**
 * Handler for LAB.SAMPLE.SUBMITTED.REQUESTED
 */
export class LabSampleSubmittedHandler implements EventHandler {
  public async execute(event: BaseEvent): Promise<BaseEvent[]> {
    // console.log(`[LabSampleSubmittedHandler] Processing submission for sample: ${event.payload.sample_id}`);

    const completedEvent: BaseEvent = {
      id: uuidv4(),
      type: 'LAB.SAMPLE.SUBMITTED.COMPLETED',
      timestamp: Date.now(),
      origin: 'INTERNAL',
      event_category: 'DOMAIN',
      payload: {
        sample_id: event.payload.sample_id,
        received_timestamp: new Date().toISOString(),
      },
      idempotency_key: `completed-${event.idempotency_key}`,
      metadata: {
        correlation_id: event.metadata.correlation_id,
        causation_id: event.id,
      },
    };

    return [completedEvent];
  }
}

/**
 * Handler for LAB.SAMPLE.ANALYSIS.REQUESTED
 */
export class LabSampleAnalysisHandler implements EventHandler {
  public async execute(event: BaseEvent): Promise<BaseEvent[]> {
    // console.log(`[LabSampleAnalysisHandler] Delegating analysis for sample: ${event.payload.sample_id}`);

    // G3. Agents MUST be invoked by handlers
    return await agentBridge.invokeAgent(
      'SampleAnalysisAgent',
      async (payload: any, context: AgentContext) => {
        return await sampleAnalysisAgent.analyze(payload, context);
      },
      event
    );
  }
}
