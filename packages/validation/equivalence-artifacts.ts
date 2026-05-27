import { ExecutionBundle } from '../application-contracts/types/execution-bundle';

export interface EquivalenceArtifacts {
  tsBundle: ExecutionBundle;
  goBundle: ExecutionBundle;
}
