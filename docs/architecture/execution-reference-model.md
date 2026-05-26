# Execution Reference Model (ERM)

This document defines the current execution semantics of the TypeScript runtime (`src/`).

## Event Lifecycle
1. **Ingestion:** Events enter via the `EventBus` (`src/core/event_bus.ts`).
2. **Validation:** Events are checked against schemas (`src/domain/event_schemas.ts`) and FRCS rules (`src/governance/`).
3. **Orchestration:** `Orchestrator` (`src/core/orchestrator.ts`) determines the DAG traversal.
4. **Persistence:** Events are written to the `PersistenceLayer` (`src/core/persistence_layer.ts`).
5. **State Update:** `RuntimeState` (`src/core/runtime_state.ts`) is updated based on processed events.
6. **Join Evaluation:** Invariants and join conditions are evaluated.
7. **Fixpoint:** The system iterates until a fixpoint is reached.

## Key Behaviors
- **Deterministic:** The system must produce the same result for the same event sequence, enforced by `ReplayEngine` (`src/core/replay_engine.ts`).
- **FRCS:** Governance is checked at the entry point of every major state transition.
