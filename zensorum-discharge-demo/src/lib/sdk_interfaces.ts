import { RunId, WorkflowId, TenantId, BaseEvent, ZensorumEvent } from '../../core/types';

/**
 * Flux Stability Domains
 */
export enum StabilityDomain {
  CONSTITUTIONAL = 'CONSTITUTIONAL',
  OPERATIONAL = 'OPERATIONAL',
  EXPERIMENTAL = 'EXPERIMENTAL',
  INTERNAL = 'INTERNAL',
}

/**
 * Classified Operational Streams
 */
export enum StreamType {
  OPERATIONAL_TRUTH = 'OPERATIONAL_TRUTH',
  PROJECTION = 'PROJECTION',
  OBSERVABILITY = 'OBSERVABILITY',
}

export interface PublicApiAdapter {
  // Intent Authorization
  authorizeIntent(workflowId: string, tenantId: string, intent: any): Promise<string>;

  // Continuity Coordination
  coordinateContinuation(runId: string, token: any, signal: any): Promise<void>;

  // Inspection Hub
  getRunState(runId: string): Promise<any>;
  getClassifiedStream(runId: string, type: StreamType): AsyncIterable<any>;

  // Replay Diagnostics
  verifyReplay(runId: string, expectedEvents: any[]): Promise<boolean>;
}

export interface SdkClient {
  // Authoring Surface
  authorIntent(workflowId: string, tenantId: string, params: Record<string, any>): Promise<string>;

  // Observation
  observe(runId: string, type: StreamType, handler: (event: any) => void): void;

  // Inspection
  inspectLineage(runId: string): Promise<any[]>;
}

 /**
  * Southbound Ports (Persistence & Infrastructure)
  */
 export interface EventStorePort {
   append(events: ZensorumEvent[]): Promise<void>;
   getStream(runId: RunId): Promise<ZensorumEvent[]>;
 }

 export interface ArtifactPort {

  put(data: Buffer, contentType: string): Promise<string>;
  get(uri: string): Promise<Buffer>;
}

/**
 * East/West Ports (Capabilities & Plugins)
 */
export interface PluginPort {
  // Receipt-Only Realization
  realize(capability: string, input: any, context: any): Promise<{ receipt_id: string; output: any }>;
  listCapabilities(): string[];
}

/**
 * Kernel Ports (Hexagonal Architecture)
 */
export interface KernelEgressPort {
  onEventEmitted(event: BaseEvent): void;
  onLifecycleTransition(transition: { runId: RunId; status: string }): void;
}
