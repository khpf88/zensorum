
export interface StableSemanticProjection {
    [key: string]: any;
}

export type ProjectionVersion = 'IPA-v1';

/**
 * IdentityProjectionAuthority (IPA)
 * 
 * Central authority for deterministic execution identity.
 * NO OTHER MODULE MAY COMPUTE EXECUTION IDENTITY.
 */
export class IdentityProjectionAuthority {
    static project(bundle: any, version: ProjectionVersion): StableSemanticProjection {
        // Implementation will be based on the Stratification rules defined in previous phase
        // For now, this is a placeholder enforcing the IPA requirement.
        return this.normalize(bundle);
    }

    static computeIdentity(bundle: any, version: ProjectionVersion): string {
        const projection = this.project(bundle, version);
        return this.hash(projection);
    }

    private static readonly EXCLUDED_KEYS = new Set([
        'executionIdentity',
        'SchemaVersion', 
        'schemaVersion',
        'timestamp', 
        'timestamps',
        'executionTimeNs',
        'executionStep',
        'buildId',
        'runtimeMeta', // Often contains volatile info
        'snapshotHash', // Derivative
        'replayHash',
        'frcsDecisions', // Runtime decisions
        'eventOrder',
        'stateHashTimeline'
    ]);

    private static normalize(obj: any): any {
        const normalize = IdentityProjectionAuthority.normalize.bind(IdentityProjectionAuthority);
        // IPA Logic: deterministic normalization
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Map) {
            return Object.fromEntries(
                Array.from(obj.entries())
                    .sort(([a], [b]) => String(a).localeCompare(String(b)))
                    .map(([k, v]) => [k, normalize(v)])
            );
        }
        if (obj instanceof Set) {
            return Array.from(obj.values())
                .sort((a, b) => String(a).localeCompare(String(b)))
                .map(normalize);
        }
        if (Array.isArray(obj)) return obj.map(normalize);
        return Object.keys(obj)
            .sort()
            .reduce((result: any, key: string) => {
                // IPA Rule: Exclude transient/non-stable fields (governance rules)
                if (!key.startsWith('_') && !IdentityProjectionAuthority.EXCLUDED_KEYS.has(key)) {
                    result[key] = normalize(obj[key]);
                }
                return result;
            }, {});
    }

    private static hash(projection: StableSemanticProjection): string {
        // Deterministic hashing implementation
        return require('crypto').createHash('sha256')
            .update(JSON.stringify(projection))
            .digest('hex');
    }
}
