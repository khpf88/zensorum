import { LedgerManager } from '@zensorum/ledger';
import { LedgerEntry } from '@zensorum/ledger/core/entry';

export class LedgerFacade {
  private manager = new LedgerManager();

  registerCertification(entry: Omit<LedgerEntry, 'entryHash' | 'previousEntryHash'>) {
    return this.manager.registerCertification(entry);
  }

  getHistory() {
    return this.manager.getHistory();
  }
}
