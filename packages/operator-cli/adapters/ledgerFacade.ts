import { LedgerManager } from '@zensorum/ledger';

export class LedgerFacade {
  private manager = new LedgerManager();

  getHistory() {
    return this.manager.getHistory();
  }
}
