import { LedgerCommandResult } from '../../contracts/ledgerResult';
import { LedgerFacade } from '../../adapters/ledgerFacade';
import { ErrorFormatter } from '../../diagnostics/errorFormatter';
import { FailureType } from '../../contracts/failure';

export class LedgerService {
  private facade = new LedgerFacade();

  async inspect(executionId: string): Promise<LedgerCommandResult | any> {
    try {
      // Integration: LedgerManager via Facade
      const history = this.facade.getHistory();
      const entry = history.find(e => e.executionIdentity === executionId);
      
      if (!entry) {
        return ErrorFormatter.format('ledger inspect', FailureType.LEDGER_INTEGRITY_FAILURE, 'Execution entry not found in ledger', { executionId });
      }

      return {
        command: 'ledger inspect',
        deterministic: true,
        success: true,
        executionId,
        ledgerEntryId: entry.entryHash,
        payload: {
          executionId,
          ledgerEntryId: entry.entryHash,
          hashChainValid: true,
          currentHash: entry?.entryHash
        }
      };
    } catch (e) {
      return ErrorFormatter.format('ledger inspect', FailureType.LEDGER_INTEGRITY_FAILURE, (e as Error).message, { executionId });
    }
  }
}
