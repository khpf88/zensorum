import { IdentityProjectionAuthority, ProjectionVersion } from '@zensorum/core/identity/ipa';

export class IPAFacade {
    static computeIdentity(bundle: any, version: ProjectionVersion = 'IPA-v1'): string {
        return IdentityProjectionAuthority.computeIdentity(bundle, version);
    }
}
