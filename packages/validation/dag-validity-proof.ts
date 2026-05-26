import { FormalProofEngine, ProofResult } from './formal-verification';
import { DagLineageValidator } from './dag-validator';
import { ExecutionBundle } from '../../zensorum-discharge-demo/types/runtime/execution-bundle';

export class DAGValidityProofEngine implements FormalProofEngine<ExecutionBundle> {
  private validator = new DagLineageValidator();

  prove(bundle: ExecutionBundle): ProofResult {
    const result = this.validator.check(bundle);

    return {
      property: "DAG Structural Correctness",
      assumptions: ["DAG is acyclic", "Deterministic topological ordering exists"],
      traceId: bundle.runId,
      result: result.valid ? "PROVED" : "NOT_PROVED",
      evidence: { violations: result.violations },
      determinismHash: bundle.eventStreamHash // Use eventStreamHash as base for proof determinism
    };
  }
}
