# Bootstrap Context: Zensorum Phases 4–5

## 1. System Positioning
Zensorum is a deterministic, event-sourced execution kernel. Phases 4 and 5 establish the verification, explainability, platformization, and formal proof layers over the canonical execution truth.

## 2. Execution Pipeline
The following pipeline represents the system-wide execution and verification flow:

Execution Kernel (Truth)
      ↓
FIS (Phase 4.1: Observational Verification)
      ↓
Parity Evaluation
      ↓
PEE (Phase 4.2: Causal Divergence Explanation)
      ↓
Platformization (Phase 4.3: Read-Only Externalization)
      ↓
Formal Verification (Phase 5: Proof Semantics)

## 3. High-Level Invariants
1. **Deterministic Parity**: TypeScript and Go runtimes MUST produce byte-identical outputs (`ExecutionBundle`, `InvariantReport`, `ParityExplainabilityReport`, and platform artifacts).
2. **Observational Separation**: FIS, PEE, and Platformization layers are strictly observational and MUST NOT influence execution truth.
3. **Canonical Serialization**: All canonicalized outputs MUST follow lexicographical key ordering and strict JSON serialization rules.
4. **Pure Function Evaluation**: All verification and diagnostic logic MUST be stateless, I/O isolated, and deterministic.

## 4. System Recovery
This architecture is reconstructible from the following documentation:
- /docs/architecture/phase-4-fis.md
- /docs/architecture/phase-4-pee.md
- /docs/architecture/phase-4-platformization.md
- /docs/architecture/phase-5-formal-verification.md
