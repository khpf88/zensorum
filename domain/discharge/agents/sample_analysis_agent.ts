// src/agents/sample_analysis_agent.ts
import { v4 as uuidv4 } from 'uuid';
import { BaseEvent, AgentContext } from '../../packages/core/types';
import { llmClient } from '../../apps/zensorum-discharge-demo/lib/llm/llm_client';
import { LLMOutputValidator, LabAnalysisSuggestionSchema } from '../../apps/zensorum-discharge-demo/lib/llm/output_validator';

/**
 * SampleAnalysisAgent: Reasons about lab sample data using LLM simulation.
 * Returns validated event objects only.
 */
export class SampleAnalysisAgent {
  public async analyze(payload: any, context: AgentContext): Promise<BaseEvent[]> {
    const snapshot = await llmClient.generateText(
      'lab-sample-analysis-suggestion',
      {
        sampleId: payload.sample_id,
        analysisType: payload.analysis_type,
      },
      context.seed
    );

    const res = snapshot.final_output;
    const validation = LLMOutputValidator.validate(LabAnalysisSuggestionSchema, res);
    const parsed = validation.parsed as { suggestion: string } | null;
    const suggestion = validation.isValid && parsed ? parsed.suggestion : 'INCONCLUSIVE';

    const completedEvent: BaseEvent = {
      id: uuidv4(),
      type: 'LAB.SAMPLE.ANALYSIS.COMPLETED',
      timestamp: Date.now(),
      origin: 'INTERNAL',
      event_category: 'DOMAIN',
      payload: {
        sample_id: payload.sample_id,
        analysis_type: payload.analysis_type,
        completed_at: new Date().toISOString(),
        results: { suggestion },
        analyst_id: 'agent.sample_analysis_agent'
      },
      idempotency_key: `analysis-completed-${payload.sample_id}-${uuidv4().split('-')[0]}`,
      metadata: {
        correlation_id: context.correlation_id,
        causation_id: context.causation_id,
      },
    };

    return [completedEvent];
  }
}

export const sampleAnalysisAgent = new SampleAnalysisAgent();
