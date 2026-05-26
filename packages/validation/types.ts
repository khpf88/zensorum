export interface InvariantResult {
  valid: boolean;
  violations: Violation[];
}

export interface Violation {
  code: string;
  message: string;
  context: Record<string, any>;
}

export interface InvariantChecker<T> {
  check(bundle: T): InvariantResult;
}
