# Phase 1: Dependency Mapping (TS -> Go)

This document maps current TypeScript implementations to future Go runtime structural targets.

| TS Path (`src/`) | Go Target (`/runtime/internal/`) | Notes |
| :--- | :--- | :--- |
| `src/core/eventbus` | `runtime/internal/eventbus` | Future mapping only |
| `src/core/orchestrator` | `runtime/internal/orchestrator` | Future mapping only |
| `src/core/replay_engine` | `runtime/internal/replay` | Future mapping only |
| `src/core/persistence_layer` | `runtime/internal/persistence` | Future mapping only |
| `src/governance` | `runtime/internal/governance` | Future mapping only |

## Constraints
- **NO CODE MOVEMENT** permitted in Phase 1.
- This mapping is for analysis and structural preparation only.

## Critical Coupling Observations
`src/core/` is the primary hub for the TypeScript runtime. Key coupling points identified:
- Heavy dependency from `zensorum-runtime/scripts/` (e.g., `smoke-test.ts`, `replay-certification.ts`) on `src/core/` components (`orchestrator`, `event_bus`, `persistence_layer`).
- `zensorum-runtime/tsconfig.json` defines `@core/*` mapping to `src/core/*`, creating implicit architectural coupling.
- High coupling within `src/core/` itself, evidenced by complex inter-file dependencies (e.g., `kernel`, `runtime_state`, `execution_manager`).
