# Phase 1.6: Dependency Graph (Normalization)

## Structural Overview
The Zensorum runtime is currently structured with high-risk coupling between test/utility scripts and the core execution logic.

## Module-to-Module Dependencies (Key Findings)
- **`scripts/` -> `src/core/`**: Tight coupling. Scripts import `eventBus`, `persistenceLayer`, `orchestrator`, `contractRegistry` directly using relative paths (`../src/core/...`).
- **`src/core/` -> `src/core/`**: Circular dependencies exist between `kernel`, `runtime_state`, `execution_manager`, and `event_dispatcher`.
- **`tsconfig.json` mappings**: `@core/*` mapping creates an abstraction layer that *seems* clean but hides the true coupling of files when direct imports *also* exist (as seen in `scripts/`).

## Runtime-Critical Paths
- `orchestrator` → `eventBus` → `persistenceLayer`
- `orchestrator` → `handlerRegistry` → `contractRegistry`

## Future Go Targets
All components listed under `src/core/` MUST be mapped to an equivalent structure in `/runtime/internal/` and access must be governed by stable, interface-based contracts, not direct imports.
