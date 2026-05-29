export type FailureType = 'replay' | 'encoding' | 'hash' | 'ordering' | 'unknown';

export interface FailureDetailsDTO {
  type: FailureType;
  message: string;
  divergentPropertyPath?: string;
  expectedValue?: unknown;
  actualValue?: unknown;
  environmentA?: any; // Avoiding dependency cycle with ExecutionEnvironmentConfig
  environmentB?: any;
}
