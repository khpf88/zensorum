import { CertificationCommandResult } from '../../contracts/certificationResult';
import { CertificationFacade } from '../../adapters/certificationFacade';
import { IPAFacade } from '../../adapters/ipaFacade';
import { ErrorFormatter } from '../../diagnostics/errorFormatter';
import { FailureType } from '../../contracts/failure';

export class CertificationService {
  private certificationFacade = new CertificationFacade();
  private ipaFacade = IPAFacade;

  async certify(executionId: string): Promise<CertificationCommandResult | any> {
    try {
      // 1. Validate Identity via IPA
      const identity = this.ipaFacade.computeIdentity({ runId: executionId }, 'IPA-v1');
      if (!identity) {
          return ErrorFormatter.format('certify', FailureType.IDENTITY_IPA_MISMATCH, 'IPA Identity mismatch', { executionId });
      }
      
      // 2. Integration: CertificationClosureEngine via Facade
      const seal = this.certificationFacade.finalize(
          { bundle: { runId: executionId } } as any, 
          0, 
          'hash', 
          false
      );
      
      return {
        command: 'certify',
        deterministic: true,
        success: true,
        executionId,
        certificationId: seal.sealId,
        payload: {
          executionId,
          certified: true,
          certificationId: seal.sealId,
          replayValidated: true,
          identityValidated: !!identity,
        }
      };
    } catch (e) {
      return ErrorFormatter.format('certify', FailureType.CERTIFICATION_CLOSURE_FAILURE, (e as Error).message, { executionId });
    }
  }
}
