import * as fs from 'fs/promises';
import * as path from 'path';
import { ExecutionArtifactStore } from './ExecutionArtifactStore';
import { ArtifactType, ArtifactManifest } from './artifact-types';
import { ArtifactSerializer } from './artifact-serializer';
import { IClock } from '@zensorum/core/runtime/clock/IClock';

export class FileSystemArtifactStore implements ExecutionArtifactStore {
  private baseDir: string;
  private clock: IClock;

  constructor(baseDir: string, clock: IClock) {
    this.baseDir = baseDir;
    this.clock = clock;
  }
// ... (rest of the file, need to update updateManifest and getExecutionDir)

  private getExecutionDir(executionId: string): string {
    return path.join(this.baseDir, 'executions', executionId);
  }

  private getArtifactPath(executionId: string, type: ArtifactType): string {
    const filename = this.getFilename(type);
    return path.join(this.getExecutionDir(executionId), filename);
  }

  private getFilename(type: ArtifactType): string {
    switch (type) {
      case 'SCENARIO': return 'scenario.json';
      case 'PROJECTION': return 'projection.json';
      case 'BUNDLE': return 'bundle.json';
      case 'TRACE': return 'trace.json';
      case 'REPLAY_REPORT': return 'replay-report.json';
      case 'CERTIFICATION_REPORT': return 'certification-report.json';
      case 'CERTIFICATION_SEAL': return 'certification-seal.json';
      case 'LEDGER_ENTRY': return 'ledger-entry.json';
      case 'MANIFEST': return 'manifest.json';
      default: throw new Error(`Unknown artifact type: ${type}`);
    }
  }

  async putArtifact<T>(executionId: string, type: ArtifactType, data: T): Promise<void> {
    const dir = this.getExecutionDir(executionId);
    await fs.mkdir(dir, { recursive: true });

    const filePath = this.getArtifactPath(executionId, type);
    const serialized = ArtifactSerializer.serialize(data);
    await fs.writeFile(filePath, serialized, 'utf8');

    // Update manifest if it's not the manifest itself
    if (type !== 'MANIFEST') {
      await this.updateManifest(executionId, type, data, filePath);
    }
  }

  async getArtifact<T>(executionId: string, type: ArtifactType): Promise<T | null> {
    const filePath = this.getArtifactPath(executionId, type);
    try {
      const content = await fs.readFile(filePath, 'utf8');
      return ArtifactSerializer.deserialize(content) as T;
    } catch (e) {
      return null;
    }
  }

  async getManifest(executionId: string): Promise<ArtifactManifest | null> {
    return this.getArtifact<ArtifactManifest>(executionId, 'MANIFEST');
  }

  async exists(executionId: string, type?: ArtifactType): Promise<boolean> {
    const targetPath = type 
      ? this.getArtifactPath(executionId, type)
      : this.getExecutionDir(executionId);
    
    try {
      await fs.access(targetPath);
      return true;
    } catch {
      return false;
    }
  }

  private async updateManifest(executionId: string, type: ArtifactType, data: unknown, filePath: string): Promise<void> {
    let manifest = await this.getManifest(executionId);

    if (!manifest) {
      manifest = {
        executionId,
        replayProtocolVersion: { major: 0, minor: 1, patch: 0 },
        projectionVersion: 'IPA-v1',
        canonicalHash: '', // Will be updated by bundle persistence
        artifacts: {},
        certificationState: 'UNCERTIFIED'
      };
    }

    const hash = ArtifactSerializer.computeHash(data);
    
    manifest.artifacts[type] = {
      hash,
      path: path.relative(this.baseDir, filePath),
      persistedAt: this.clock.now()
    };

    if (type === 'BUNDLE') {
        manifest.canonicalHash = (data as { metadata?: { bundleHash?: string } })?.metadata?.bundleHash || hash;
    }

    if (type === 'CERTIFICATION_SEAL') {
        manifest.certificationState = 'CERTIFIED';
    }

    // Save updated manifest directly to avoid recursion
    const manifestPath = this.getArtifactPath(executionId, 'MANIFEST');
    await fs.writeFile(manifestPath, ArtifactSerializer.serialize(manifest), 'utf8');
  }
}
