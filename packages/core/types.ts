// src/core/types.ts
import { z } from 'zod';

/**
 * SDK-OWNED EVENT SCHEMAS (CONTRACT ALIGNMENT)
 * Strict separation: SDK defines only what it owns (Intent/Identity).
 */

export const ExecutionStatusSchema = z.enum([
  'REQUESTED',
  'VALIDATED',
  'DISPATCHED',
  'EXECUTED',
  'COMPLETED',
  'FAILED'
]);

export type ExecutionStatus = z.infer<typeof ExecutionStatusSchema>;

export const FluxMetadataSchema = z.object({
  correlation_id: z.string().uuid(),
  causation_id: z.string().uuid(),
  root_event_id: z.string().uuid().optional(),
}).strict();

export type FluxMetadata = z.infer<typeof FluxMetadataSchema>;

export interface AgentContext extends FluxMetadata {
  idempotency_key: string;
  causation_id: string;
  timestamp: string;
  seed: string;
  correlation_id: string;
  contract_id: string;
  causal_partition_id: string;
  origin_runtime_id: string;
  federation_hops: number;
}

export const BaseEventSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  timestamp: z.number().int().nonnegative(),
  origin: z.string(),
  event_category: z.string(),
  payload: z.any(),
  idempotency_key: z.string(),
  metadata: FluxMetadataSchema,
}).strict();

export type BaseEvent = z.infer<typeof BaseEventSchema>;
export type FluxEvent = BaseEvent;

export type RunId = string;
export type WorkflowId = string;
export type TenantId = string;
export type ZensorumEvent = BaseEvent;

/**
 * LIFECYCLE CONTRACT
 * SDK emits only REQUESTED-level intent.
 */
export const LifecycleEvents = {
    REQUESTED: 'REQUESTED'
} as const;

export interface EventHandler {
  execute(event: BaseEvent): Promise<BaseEvent[]>;
}

export const SystemValidationFailedEventSchema = BaseEventSchema.extend({
  payload: z.object({ failedStage: z.string(), reason: z.string(), originalEventId: z.string().uuid() }),
});
export const SystemEventValidatedSchema = BaseEventSchema.extend({
  payload: z.object({ originalEventId: z.string().uuid(), message: z.string() }),
});
export const SystemDependencyCycleDetectedEventSchema = BaseEventSchema.extend({
  payload: z.object({ involvedEventIds: z.array(z.string().uuid()), message: z.string() }),
});
export const SystemPolicyRejectedEventSchema = BaseEventSchema.extend({
  payload: z.object({ reason: z.string(), originalEventId: z.string().uuid(), policyId: z.string() }),
});
export const SystemOrchestrationTransitionEventSchema = BaseEventSchema.extend({
  payload: z.object({ originalEventId: z.string().uuid(), status: z.string(), error: z.string().nullable() }),
});
