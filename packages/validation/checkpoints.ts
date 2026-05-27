import { DomainWorkflowDefinition } from './types';
import { CanonicalDomainGraph } from '../workflow-engine';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// Checkpoint 1: Domain
export interface DomainValidator {
  validate(workflow: DomainWorkflowDefinition): ValidationResult;
}

// Checkpoint 2: Compiler
export interface CompilerValidator {
  validate(domainWorkflow: DomainWorkflowDefinition, graph: CanonicalDomainGraph): ValidationResult;
}

// Checkpoint 3: Runtime Compatibility
export interface CompatibilityValidator {
  validate(graph: CanonicalDomainGraph): ValidationResult;
}

// Checkpoint 4: UI Boundary
export interface BoundaryValidator {
  validate(uiPayload: any): ValidationResult;
}
