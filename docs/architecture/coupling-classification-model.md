# Coupling Classification Model

## 1. Strong Coupling (High Risk)
- **Direct Imports:** Direct imports between `src/core` modules (`orchestrator` importing `eventBus` directly).
- **Circular Dependencies:** Mutual dependency between `kernel`, `runtime_state`, `execution_manager`.
- **Shared Mutable State:** Global singletons used for `orchestrator`, `contractRegistry`, `handlerRegistry`.

## 2. Soft Coupling
- **Event-based communication:** The `EventBus` provides a mechanism for decoupling, but currently, modules often bypass it with direct method calls.

## 3. Hidden Coupling (Critical Findings)
- **`tsconfig` Aliases:** `@core/*` mapping creates an implicit assumption that all these modules are "core", but it doesn't enforce encapsulation.
- **`scripts/` Imports:** Direct relative path imports (`../src/core/`) make it impossible to move `src/core/` without breaking all existing `scripts/`.
- **Implicit State:** Global objects used for configuration and registry create implicit dependencies across the entire `src/` hierarchy.
