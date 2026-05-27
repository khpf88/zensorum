import { BaseEvent } from '../../../../packages/core/types';

export interface SDKEvent {
    id: string;
    type: string;
    timestamp: number;
    origin: string;
    event_category: string;
    payload: unknown;
    idempotency_key: string;
    metadata?: {
        correlation_id: string;
        causation_id: string;
        root_event_id?: string;
        version?: string;
    };
}

/**
 * Projects SDK Event to Runtime Envelope.
 * Strict structural projection (subset transform only).
 * Maps SDK fields to Runtime field names.
 * NO semantic enrichment, injection, or runtime default initialization.
 */
export function toRuntimeEvent(event: SDKEvent): any {
    // Structural mapping from SDK Intent -> Runtime Envelope.
    return {
        event_id: event.id,
        event_type: event.type,
        event_category: event.event_category,
        timestamp: new Date(event.timestamp).toISOString(),
        source: event.origin,
        payload: event.payload,
        idempotency_key: event.idempotency_key,
        metadata: {
            source: event.origin,
            correlation_id: event.metadata?.correlation_id || '',
            causation_id: event.metadata?.causation_id || '',
        }
    };
}
