# Phase 4.1: Formal Invariant System (FIS)

## 1. System Positioning
FIS is the first verification layer over the Execution Kernel. It is strictly observational and post-execution.

## 2. Formal Responsibilities
- Validate `ExecutionBundle` integrity.
- Enforce DAG topological validity.
- Verify state transition continuity.
- Detect cross-runtime (TS/Go) parity failures.

## 3. Non-Negotiable Constraints
- **Observational Only**: Must NOT block ingestion or mutate execution.
- **Deterministic**: Every validator MUST be a pure, I/O-isolated function.
- **Parity Guarantee**: TS and Go outputs MUST be byte-identical.
- **Hash Constraint**: SHA-256 over canonical JSON (lexicographical keys, sorted arrays).

## 4. Input/Output Contracts
- Input: `ExecutionBundle` (Canonical Schema).
- Output: `InvariantReport` (Violations: Structural, Temporal, Hash, Replay, Lineage, Equivalence, State, FRCS).

## 5. Deterministic Rules
- **Ordering**: 1. `stepIndex` ASC, 2. `parentDepth` ASC, 3. `eventId` LEX ASC.
- **State Transition**: `stateHash[n] = SHA-256(canonicalSerialize(stateHash[n-1] + payload))`.

## 6. Cross-Runtime Parity Guarantees
TS_output == Go_output (byte-for-byte). Any divergence → `EquivalenceViolation` (Fatal Parity Failure).

## 7. Forbidden Behaviors
- Modifying execution semantics.
- Introducing probabilistic reasoning.
- Allowing ingestion blocking.
- Referencing runtime-specific metadata (`runtimeMeta`) in parity hashes.
