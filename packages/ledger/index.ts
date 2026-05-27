import { CertificationRegistry } from './registry/CertificationRegistry';
import { DeterministicExecutionIndex } from './indexing/DeterministicExecutionIndex';
import { AuditQueryEngine } from './audit/AuditQueryEngine';
import { LedgerEntry } from './core/entry';

export class LedgerManager {
  private registry = new CertificationRegistry();
  private index = new DeterministicExecutionIndex();
  public audit = new AuditQueryEngine(this.registry, this.index);

  registerCertification(entry: Omit<LedgerEntry, 'entryHash' | 'previousEntryHash'>) {
    const fullEntry = this.registry.register(entry);
    this.index.addEntry(fullEntry);
    return fullEntry;
  }

  getHistory() {
    return this.registry.getAllEntries();
  }
}
