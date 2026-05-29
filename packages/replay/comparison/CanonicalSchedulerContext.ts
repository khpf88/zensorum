
/**
 * Strict structure for scheduler context during canonical replay.
 * Ensures deterministic, reproducible execution flow.
 */
export interface CanonicalSchedulerContext {
    activeNodeId: string;
    scheduledTicks: number[];
    isDeterministic: boolean;
}
