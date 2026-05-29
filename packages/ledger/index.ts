import { CertificationRegistry } from './registry/CertificationRegistry';
import { DeterministicExecutionIndex } from './indexing/DeterministicExecutionIndex';
import { AuditQueryEngine } from './audit/AuditQueryEngine';
import { LedgerEntry } from './core/entry';
import * as fs from 'fs';
import * as path from 'path';

export class LedgerManager {
  private registry = new CertificationRegistry();
  private index = new DeterministicExecutionIndex();
  public audit = new AuditQueryEngine(this.registry, this.index);
  private ledgerPath = path.resolve(process.cwd(), '.artifacts/ledger/chain.json');

  constructor() {
    this.load();
  }

  private load() {
    if (fs.existsSync(this.ledgerPath)) {
      try {
        const data = fs.readFileSync(this.ledgerPath, 'utf8');
        const entries: LedgerEntry[] = JSON.parse(data);
        entries.forEach(entry => {
          this.registry.register(entry);
          this.index.addEntry(entry);
        });
      } catch (e) {
        console.error('Failed to load ledger:', e);
      }
    }
  }

  private save() {
    const entries = this.registry.getAllEntries();
    const dir = path.dirname(this.ledgerPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.ledgerPath, JSON.stringify(entries, null, 2), 'utf8');
  }

  registerCertification(entry: Omit<LedgerEntry, 'entryHash' | 'previousEntryHash'>) {
    const fullEntry = this.registry.register(entry);
    this.index.addEntry(fullEntry);
    this.save();
    return fullEntry;
  }

  getHistory() {
    return this.registry.getAllEntries();
  }
}
