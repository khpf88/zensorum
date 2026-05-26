/**
 * Canonical lifecycle vocabulary for Zensorum.
 * SDK is restricted to REQUESTED intent-only emissions.
 */

export enum LifecycleStatus {
    REQUESTED = 'REQUESTED',
    VALIDATED = 'VALIDATED',
    DISPATCHED = 'DISPATCHED',
    EXECUTED = 'EXECUTED',
    COMPLETED = 'COMPLETED'
}

/**
 * SDK-allowed subset of lifecycle states (intent-only).
 */
export const SDKAllowedIntent = [LifecycleStatus.REQUESTED];
