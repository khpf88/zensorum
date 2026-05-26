# Phase 1.5: Coupling Analysis

This document identifies coupling risks between the TypeScript runtime (`src/`) and the rest of the repository.

## High-Risk Dependency Areas
1. **Implicit Coupling via `@core/*`:** `zensorum-runtime/tsconfig.json` mappings hide the complexity of dependencies on `src/core/`.
2. **Scripts Coupling:** `zensorum-runtime/scripts/` (e.g., `smoke-test.ts`, `runtime-certification.ts`) directly import `src/core/*` modules, creating a tight dependency that makes refactoring `src/core/` difficult without breaking existing tests.
3. **Internal Circular Dependencies:** `src/core/` shows complex mutual dependencies between `kernel`, `runtime_state`, `execution_manager`, and `event_dispatcher`.
4. **Dist/ Artifact Leakage:** `zensorum-runtime/dist/` contains remnants and direct references to `src/core/` files, potentially leading to build/runtime issues if these are not cleaned before migration.

## Recommendation for Migration
- Decouple `scripts/` from direct `src/core/` imports, perhaps through an abstraction layer or stable SDK.
- Flatten or re-structure `src/core/` to break circular dependencies *before* the Phase 2 migration implementation.
