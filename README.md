# Zensorum Deterministic Execution Validation Harness

## 1. PROJECT DESCRIPTION
Zensorum is a deterministic execution validation and replay verification system that ensures cross-runtime determinism using:
- canonical encoding
- deterministic hashing
- replay simulation
- golden vector validation
- cross-runtime execution abstraction

## 2. CURRENT STATE
The system is currently:
- Fully functional deterministic validation harness
- Single-process simulation (NOT distributed runtime)
- Pre-Phase A architecture (monolithic validation core)

## 3. CORE CAPABILITIES
- ReplayExecutionRunner (deterministic mock engine)
- CanonicalEncoderInvoker (encodeCanonical wrapper)
- HashValidationEngine (hashCanonical wrapper)
- CrossRuntimeExecutor (multi-env simulation)
- OutputComparator (deep + byte-level comparison)
- ValidationReportGenerator (reporting system)
- DeterministicExecutionHarness (full pipeline orchestrator)

## 4. GOLDEN VECTORS
- vector-simple.json
- vector-complex.json

## 5. LIMITATIONS
- No API layer
- No persistence layer
- No UI layer
- No runtime isolation (single-process execution only)
- Global function injection still used for Phase 3.9 contracts

## 6. NEXT PHASE (PHASE A)
- Move src/replay → packages/replay
- Remove global injection of canonical contracts
- Introduce strict package boundaries
- Add build system per package
- Add lint + invariant rules
- Add unit + stress + fault injection tests
