# Phase 4.2: Parity Explainability Engine (PEE)

## 1. System Positioning
PEE acts as the deterministic diagnostic layer, triggered strictly upon the detection of an `EquivalenceViolation` by FIS (Phase 4.1).

## 2. Formal Responsibilities
- Reconstruct deterministic execution traces from `ExecutionBundle` snapshots.
- Map cross-runtime divergence to specific trace points.
- Categorize divergence (State, Hash, Ordering, FRCS, TerminalState).
- Generate deterministic diagnostic traces.

## 3. Non-Negotiable Constraints
- **Observational Only**: No influence on execution, DAG, or FIS.
- **Pure Function**: Deterministic input snapshot → identical report.
- **Trace Reconstruction**: Must use direct DAG ancestry (not heuristics).
- **Fail-Safe**: MUST NOT throw; returns `UnknownDivergence` on internal inconsistency.

## 4. Input/Output Contracts
- Input: `PEEInput` (Immutable `ExecutionBundle`, `FIS InvariantReport`, Runtime Snapshots).
- Output: `ParityExplainabilityReport`.

## 5. Deterministic Rules
- **Divergence Pipeline**: 1. Hash Scan, 2. Ordering Check, 3. Canonical Hash Check, 4. FRCS Check, 5. Terminal State Check, 6. Fallback.
- **Causal Trace**: Queue-based traversal of `parentEventIds`, sorted lexicographically.

## 6. Cross-Runtime Parity Guarantees
PEE_TS(input) == PEE_GO(input) (Byte-identical report outputs).

## 7. Forbidden Behaviors
- Modifying execution/DAG/State.
- Reconciling/Fixing divergence.
- Inferring missing data/heuristics.
- Triggering execution/replay.
