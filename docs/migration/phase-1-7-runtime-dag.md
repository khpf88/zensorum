# Phase 1.7: Runtime Dependency DAG

This document defines the target Directed Acyclic Graph (DAG) for the TypeScript runtime modules.

## DAG Structure
The target structure is hierarchical and acyclic, with dependencies flowing only downwards.

```text
[Orchestrator]
      ↓
[EventBus]
      ↓
[ExecutionManager]
      ↓
[RuntimeState]
      ↓
[Persistence]
      ↓
[Kernel / Governance] (Leaf Nodes)
```

## Module Node Definitions
- **Orchestrator:** Top-level DAG traversal.
- **EventBus:** Inter-module event communication.
- **ExecutionManager:** Coordinates execution flow and state transitions.
- **RuntimeState:** Holds the current state snapshot.
- **Persistence:** Interface for event log and snapshot storage.
- **Kernel/Governance:** Fundamental rules and utility providers.

## Dependency Direction Rules
1. **No Upward Dependencies:** Modules may only depend on modules below them in the DAG.
2. **No Circular Dependencies:** A module cannot transitively depend on itself.
3. **Explicit Interface Boundaries:** All dependencies MUST be via defined interfaces (Phase 1.6), not direct implementation imports.
