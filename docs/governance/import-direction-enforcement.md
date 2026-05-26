# Import Direction Enforcement Model

This document defines the rules for all future TypeScript imports within the Zensorum runtime to ensure a directed dependency graph.

## Core Rules

### Rule 1: Downward-Only Dependencies
All imports MUST flow in the direction defined by the DAG:
`Orchestrator` → `EventBus` → `ExecutionManager` → `RuntimeState` → `Persistence` → `Kernel/Governance`

### Rule 2: No Circular Imports
Any `import` that creates a cycle (direct or transitive) is strictly prohibited.

### Rule 3: Interface-Only Imports
All imports between modules MUST be via defined interfaces (`src/lib/interfaces/`). Direct implementation imports are forbidden.

### Rule 4: No Alias-Based Hidden Coupling
All imports MUST be explicit relative or absolute file paths (e.g., `import { X } from '../../eventbus/interface'`). `tsconfig` path aliases (e.g., `@core/*`) are deprecated and will be removed in a future structural cleanup phase.

## Enforcement
These rules are conceptually enforced in Phase 1.7 to prepare for automated CI enforcement in Phase 2.
