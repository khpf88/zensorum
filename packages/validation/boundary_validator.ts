import { ValidationResult } from './checkpoints';

/**
 * ApplicationBoundaryValidator: Enforces isolation of the application layer.
 */
export class ApplicationBoundaryValidator {
  // List of forbidden package prefixes for application imports
  private readonly forbiddenImports = [
    '../runtime',
    '../packages/workflow-engine',
    '../packages/csnl',
    '../packages/binding',
    '../packages/validation'
  ];

  public validateImport(importPath: string): ValidationResult {
    const isForbidden = this.forbiddenImports.some(prefix => importPath.startsWith(prefix));
    
    if (isForbidden) {
      return { 
        valid: false, 
        errors: [`Architectural Violation: Application layer cannot import from ${importPath}`] 
      };
    }
    
    return { valid: true, errors: [] };
  }
}
