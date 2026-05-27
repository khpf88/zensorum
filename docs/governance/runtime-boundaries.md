# Governance Rules

All architectural decisions MUST strictly adhere to the following rules to ensure Zensorum platform integrity.

## Dependency Isolation Rules
1. **NO UI → Runtime Coupling:** The application layer (`apps/`) MUST NOT import from `runtime/`, `packages/csnl/`, or `packages/workflow-engine/`.
2. **NO Runtime Semantic Interpretation:** The runtime Go VM acts as a pure interpreter. It MUST NOT contain or interpret domain business semantics.
3. **Immutable Artifacts:** `ExecutionBundle` artifacts are immutable after CSNL finalization.
4. **Deterministic Scheduler:** All scheduling decisions are performed by the `DeterministicScheduler` based on immutable `ExecutionSnapshotState`.

## UI Boundary Enforcement
- The UI layer MUST only consume `application-contracts`.
- UI components are prohibited from invoking agents, handlers, or performing orchestration.
- Any attempt to violate this boundary must be caught by the `ApplicationBoundaryValidator` and trigger a CI/CD build failure.
