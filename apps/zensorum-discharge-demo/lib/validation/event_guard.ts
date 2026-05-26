export interface ContractError {
    code: "SDK_CONTRACT_VIOLATION";
    reason: string;
}

/**
 * Deterministic validation of SDK event envelope.
 */
export function validateEvent(event: any): { valid: boolean; error?: ContractError } {
    // 1. Presence Checks
    const requiredFields = ['id', 'type', 'timestamp', 'origin', 'event_category', 'payload', 'idempotency_key', 'metadata'];
    for (const field of requiredFields) {
        if (event[field] === undefined || event[field] === '') {
            return { valid: false, error: { code: "SDK_CONTRACT_VIOLATION", reason: `missing required field: ${field}` } };
        }
    }

    // 2. Idempotency Key Validation
    if (typeof event.idempotency_key !== 'string' || event.idempotency_key.trim() === '') {
        return { valid: false, error: { code: "SDK_CONTRACT_VIOLATION", reason: "invalid idempotency_key" } };
    }

    // 3. Metadata Integrity
    if (!event.metadata.correlation_id || !event.metadata.causation_id) {
        return { valid: false, error: { code: "SDK_CONTRACT_VIOLATION", reason: "missing mandatory metadata: correlation_id or causation_id" } };
    }

    return { valid: true };
}
