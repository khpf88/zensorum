import { LedgerEntry } from '@zensorum/ledger/core/entry';
import { CertificationHashChain } from '../chain/CertificationHashChain';

/**
 * Append-only registry of certification outcomes.
 */
export class CertificationRegistry {
  private entries: LedgerEntry[] = [];

  register(entry: Omit<LedgerEntry, 'entryHash' | 'previousEntryHash'>): LedgerEntry {
    const previousEntry = this.entries[this.entries.length - 1];
    const previousHash = previousEntry ? previousEntry.entryHash : undefined;
    
    const entryHash = CertificationHashChain.computeEntryHash(
      { ...entry, previousEntryHash: previousHash },
      previousHash
    );

    const fullEntry: LedgerEntry = {
      ...entry,
      entryHash,
      previousEntryHash: previousHash,
    };

    this.entries.push(fullEntry);
    return fullEntry;
  }

  getAllEntries(): ReadonlyArray<LedgerEntry> {
    return Object.freeze([...this.entries]);
  }
}
