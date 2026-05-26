# Circular Dependency Elimination Report

This document outlines the strategy for resolving existing circular dependencies identified during structural analysis.

## 1. Cycle: `Kernel` <-> `Orchestrator`
- **Breakdown:** `Kernel` calls `Orchestrator` to dispatch events, and `Orchestrator` calls `Kernel` for platform capabilities/primitives.
- **Resolution Strategy:** Interface Inversion. Create a `KernelCapability` interface that `Orchestrator` consumes. `Kernel` implements this interface but no longer depends on `Orchestrator`.

## 2. Cycle: `ExecutionManager` <-> `RuntimeState`
- **Breakdown:** `ExecutionManager` directly updates `RuntimeState`, which in turn triggers `ExecutionManager` for validation checks.
- **Resolution Strategy:** Event-Driven Decoupling. `ExecutionManager` will emit `StateTransitionEvent`. `RuntimeState` will subscribe to these events via the `EventBus` to update its internal state, removing the direct dependency.

## Note on Structural Integrity
These resolutions represent structural reorientation only. There are **no changes to runtime execution behavior** in Phase 1.7.
