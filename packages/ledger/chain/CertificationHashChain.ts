import { createHash } from 'crypto';
import { LedgerEntry } from '@zensorum/ledger/core/entry';

/**
 * Creates tamper-evident links between ledger entries.
 */
export class CertificationHashChain {
  static computeEntryHash(entry: Omit<LedgerEntry, 'entryHash'>, previousHash?: string): string {
    const data = {
      ...entry,
      previousEntryHash: previousHash || 'INITIAL_BLOCK',
    };
    
    // Use canonical deterministic serialization (stable key ordering)
    return createHash('sha256')
      .update(JSON.stringify(this.sortObject(data)))
      .digest('hex');
  }

  private static sortObject(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(this.sortObject);
    }
    return Object.keys(obj)
      .sort()
      .reduce((result: any, key: string) => {
        result[key] = this.sortObject(obj[key]);
        return result;
      }, {});
  }
}
