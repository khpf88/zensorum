// src/lib/llm/llm_client.ts

/**
 * MOCK LLM CLIENT FOR SDK
 * Temporary implementation to satisfy build dependencies.
 * Must be replaced with actual federated/remote client implementation.
 */
export const llmClient = {
  generateText: async (promptId: string, variables: any, seed: string) => {
    console.log(`[MockLLMClient] Generating text for ${promptId}`);
    return {
      final_output: JSON.stringify({ suggestion: 'SIMULATED_ANALYSIS_RESULT' }),
      metadata: { seed, promptId }
    };
  }
};
