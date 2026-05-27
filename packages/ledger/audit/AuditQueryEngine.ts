import { CertificationRegistry } from '../registry/CertificationRegistry';
import { DeterministicExecutionIndex } from '../indexing/DeterministicExecutionIndex';
import { LedgerEntry } from '../core/entry';

export class AuditQueryEngine {
  constructor(
    private registry: CertificationRegistry,
    private index: DeterministicExecutionIndex
  ) {}

  listCertifiedExecutionsForSchemaVersion(version: string): LedgerEntry[] {
    return this.registry.getAllEntries().filter(e => 
      e.replayReport.replayStatus === 'SUCCESS' && 
      e.schemaVersion === version
    );
  }

  findTracesByStatus(status: string): LedgerEntry[] {
    return this.index.getByStatus(status);
  }
}
