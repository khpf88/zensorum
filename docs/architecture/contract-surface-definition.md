# Contract Surface Definition

This document defines the conceptual boundary of the TypeScript core that must remain stable during the migration.

## Core Services (Stable Interfaces)
The following modules must expose stable interfaces that the Go runtime can consume/replicate:
- **Event Bus:** Event ingestion and propagation (`src/core/event_bus.ts`).
- **Orchestrator:** DAG traversal logic (`src/core/orchestrator.ts`).
- **Persistence:** Read/Write semantics for events/state (`src/core/persistence_layer.ts`).
- **Governance:** FRCS validation logic (`src/governance/`).

## Immutable Contracts
These structures define the system's deterministic behavior and are NOT allowed to change during migration:
- **Event Schemas:** Structure of events (`src/domain/event_schemas.ts`).
- **State Models:** Structure of the runtime state (`src/core/runtime_state.ts`).
- **Invariants:** Business and system rules defined in governance.
