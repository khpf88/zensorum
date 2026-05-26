// src/core/agent_bridge.ts
import { BaseEvent } from './types';

/**
 * MOCK AGENT BRIDGE FOR SDK
 * Temporary implementation to satisfy build dependencies.
 * MUST be replaced with actual agent communication logic.
 */
export const agentBridge = {
  dispatch: async (event: BaseEvent) => {
    console.log(`[MockAgentBridge] Dispatching event: ${event.type}`);
  },
  invokeAgent: async (agentName: string, action: any, event: BaseEvent) => {
    console.log(`[MockAgentBridge] Invoking agent: ${agentName}`);
    // Mock context construction - SDK needs to provide this properly based on event
    const context: any = {
      correlation_id: event.metadata.correlation_id,
      causation_id: event.id,
      timestamp: Date.now().toString(),
      seed: 'mock-seed',
      contract_id: 'mock-contract',
      causal_partition_id: 'mock-partition',
      origin_runtime_id: 'mock-runtime',
      federation_hops: 0,
    };
    return await action(event.payload, context);
  }
};
