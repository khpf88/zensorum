# Circular Dependency Resolution Plan

## Identified Circles
1. `Kernel` <-> `Orchestrator`
2. `ExecutionManager` <-> `RuntimeState`

## Resolution Strategy
1. **Interface Inversion:** Introduce a `KernelInterfaces` module. `Orchestrator` will depend on the interface of `Kernel` rather than the implementation, breaking the cycle.
2. **Event-Driven Decoupling:** `ExecutionManager` and `RuntimeState` should not communicate directly. Use an intermediary `EventBus` for updates (`ExecutionManager` emits `StateUpdateEvent`, `RuntimeState` consumes it).
3. **Dependency Injection:** Replace static singleton references with explicit Dependency Injection (DI) during initialization.
