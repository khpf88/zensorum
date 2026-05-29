import { ArtifactType, ArtifactManifest } from './artifact-types';

export interface ExecutionArtifactStore {
  putArtifact<T>(executionId: string, type: ArtifactType, data: T): Promise<void>;
  getArtifact<T>(executionId: string, type: ArtifactType): Promise<T | null>;
  getManifest(executionId: string): Promise<ArtifactManifest | null>;
  exists(executionId: string, type?: ArtifactType): Promise<boolean>;
}
