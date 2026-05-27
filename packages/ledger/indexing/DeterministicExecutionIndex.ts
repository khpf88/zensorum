import { LedgerEntry } from '@zensorum/ledger/core/entry';

/**
 * Deterministic index for queryable access.
 */
export class DeterministicExecutionIndex {
  private indexByIdentity: Map<string, LedgerEntry[]> = new Map();
  private indexByStatus: Map<string, LedgerEntry[]> = new Map();

  addEntry(entry: LedgerEntry) {
    // Identity
    const identityEntries = this.indexByIdentity.get(entry.executionIdentity) || [];
    identityEntries.push(entry);
    this.indexByIdentity.set(entry.executionIdentity, identityEntries);

    // Status
    const statusEntries = this.indexByStatus.get(entry.replayReport.replayStatus) || [];
    statusEntries.push(entry);
    this.indexByStatus.set(entry.replayReport.replayStatus, statusEntries);
  }

  getByIdentity(identity: string): LedgerEntry[] {
    return this.indexByIdentity.get(identity) || [];
  }

  getByStatus(status: string): LedgerEntry[] {
    return this.indexByStatus.get(status) || [];
  }
}
