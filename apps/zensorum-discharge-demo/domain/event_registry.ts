// src/domain/event_registry.ts
import { z } from 'zod';
import { 
  BaseEvent, 
  FluxEvent, 
  SystemValidationFailedEventSchema,
  SystemEventValidatedSchema,
  SystemDependencyCycleDetectedEventSchema,
  SystemPolicyRejectedEventSchema,
  SystemOrchestrationTransitionEventSchema
} from '../core/types';
import { 
  LabSampleSubmittedRequestedSchema, 
  LabSampleSubmittedCompletedSchema,
  LabSampleAnalysisRequestedSchema,
  LabSampleAnalysisCompletedSchema,
  LabResultFinalizedCompletedSchema
} from './event_schemas';

export enum EventCategory {
  EXECUTABLE_INTENT = 'EXECUTABLE_INTENT',
  TERMINAL_EVENT = 'TERMINAL_EVENT',
  SYSTEM_OBSERVABILITY = 'SYSTEM_OBSERVABILITY',
  POLICY_EVENT = 'POLICY_EVENT',
  GOVERNANCE_EVENT = 'GOVERNANCE_EVENT'
}

interface EventDefinition {
  schema: z.ZodSchema;
  category: EventCategory;
}

/**
 * EventRegistry manages event-to-schema mapping and dynamic validation.
 * Central component for FLUX EVENT CONTRACT v1 enforcement.
 */
export class EventRegistry {
  private definitions = new Map<string, EventDefinition>();

  constructor() {
    // 1. Domain Events (Laboratory)
    this.register('LAB.SAMPLE.SUBMITTED.REQUESTED', LabSampleSubmittedRequestedSchema, EventCategory.EXECUTABLE_INTENT);
    this.register('LAB.SAMPLE.SUBMITTED.COMPLETED', LabSampleSubmittedCompletedSchema, EventCategory.TERMINAL_EVENT);
    this.register('LAB.SAMPLE.ANALYSIS.REQUESTED', LabSampleAnalysisRequestedSchema, EventCategory.EXECUTABLE_INTENT);
    this.register('LAB.SAMPLE.ANALYSIS.COMPLETED', LabSampleAnalysisCompletedSchema, EventCategory.EXECUTABLE_INTENT);
    this.register('LAB.RESULT.FINALIZED.COMPLETED', LabResultFinalizedCompletedSchema, EventCategory.TERMINAL_EVENT);

    // 2. Governance Events
    this.register('SYSTEM.VALIDATION.FAILED', SystemValidationFailedEventSchema, EventCategory.GOVERNANCE_EVENT);
    this.register('SYSTEM.POLICY.REJECTED', SystemPolicyRejectedEventSchema, EventCategory.POLICY_EVENT);

    // 3. System Observability Events
    this.register('SYSTEM.EVENT.VALIDATED', SystemEventValidatedSchema, EventCategory.SYSTEM_OBSERVABILITY);
    this.register('SYSTEM.DEPENDENCY.CYCLE_DETECTED', SystemDependencyCycleDetectedEventSchema, EventCategory.SYSTEM_OBSERVABILITY);

    // 4. Orchestration Transition Events
    this.register('SYSTEM.ORCHESTRATION.DISPATCHED', SystemOrchestrationTransitionEventSchema, EventCategory.SYSTEM_OBSERVABILITY);
    this.register('SYSTEM.ORCHESTRATION.EXECUTED', SystemOrchestrationTransitionEventSchema, EventCategory.SYSTEM_OBSERVABILITY);
    this.register('SYSTEM.ORCHESTRATION.COMPLETED', SystemOrchestrationTransitionEventSchema, EventCategory.SYSTEM_OBSERVABILITY);
    this.register('SYSTEM.ORCHESTRATION.FAILED', SystemOrchestrationTransitionEventSchema, EventCategory.SYSTEM_OBSERVABILITY);
  }

  register(eventType: string, schema: z.ZodSchema, category: EventCategory) {
    this.definitions.set(eventType, { schema, category });
  }

  getSchema(eventType: string): z.ZodSchema | undefined {
    return this.definitions.get(eventType)?.schema;
  }

  getCategory(eventType: string): EventCategory | undefined {
    return this.definitions.get(eventType)?.category;
  }

  getAllRegisteredEvents(): string[] {
    return Array.from(this.definitions.keys());
  }

  validate(rawEvent: unknown): FluxEvent {
    const baseResult = (rawEvent as any).event_type;
    if (!baseResult) {
      throw new Error(`FLUX_VALIDATION_ERROR: Missing event_type`);
    }

    const definition = this.definitions.get(baseResult);
    if (!definition) {
      throw new Error(`FLUX_VALIDATION_ERROR: Unknown event_type: ${baseResult}`);
    }

    const result = definition.schema.safeParse(rawEvent);
    if (!result.success) {
      throw new Error(`FLUX_VALIDATION_ERROR: ${result.error.message}`);
    }

    return result.data as FluxEvent;
  }
}

export const eventRegistry = new EventRegistry();
