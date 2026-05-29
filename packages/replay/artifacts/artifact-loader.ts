import { ExecutionArtifactStore } from './ExecutionArtifactStore';
import { FileSystemArtifactStore } from './FileSystemArtifactStore';
import { ArtifactType, ArtifactManifest } from './artifact-types';
import { ArtifactSerializer } from './artifact-serializer';

export class ArtifactLoader {
  constructor(private store: ExecutionArtifactStore) {}

  async loadExecution(executionId: string) {
    const manifest = await this.store.getManifest(executionId);
    if (!manifest) throw new Error(`Execution ${executionId} not found in store.`);

    return {
      manifest,
      scenario: await this.store.getArtifact(executionId, 'SCENARIO'),
      projection: await this.store.getArtifact(executionId, 'PROJECTION'),
      bundle: await this.store.getArtifact(executionId, 'BUNDLE'),
      trace: await this.store.getArtifact(executionId, 'TRACE'),
      replayReport: await this.store.getArtifact(executionId, 'REPLAY_REPORT'),
      certificationSeal: await this.store.getArtifact(executionId, 'CERTIFICATION_SEAL'),
    };
  }
}
