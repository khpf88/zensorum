# Phase 1.8: Enforcement Plan

This document outlines the systematic structural enforcement plan to harden the runtime for Phase 2 migration.

## 1. Script Isolation (Status: In Progress)
- **Action:** Created `src/lib/runtime-api.ts` as the sole facade for scripts.
- **Next Step:** Update all scripts in `scripts/` to import from `@lib/runtime-api` (or relative path `../lib/runtime-api`) instead of `../core/*`.

## 2. Tsconfig Alias Cleanup (Action Required)
- **Target:** Remove `@core/*`, `@domain/*`, etc., from `tsconfig.json`.
- **Strategy:**
    1. Identify all files using these aliases via `grep`.
    2. Replace them with explicit relative imports (`../../core/file`).
    3. Remove alias from `tsconfig.json`.
    4. Verify build success.

## 3. Circular Dependency Breaking (Implementation)
- **Target:** Cycles identified in Phase 1.7.
- **Action:**
    1. Implement interfaces in `src/lib/interfaces/`.
    2. Refactor `Kernel` and `Orchestrator` to depend on interfaces rather than implementations.
    3. Inject dependencies via constructor injection (not singletons) where feasible within the TS constraints.

## 4. Enforcement Constraints
- **NO behavioral changes allowed.**
- **Structural changes ONLY.**
- **Verification via CI/Test Run after each step.**
