# Runtime Interface Specification (Draft)

To facilitate migration to Go (`/runtime/`), the following TS modules must be encapsulated behind stable interfaces.

## 1. Orchestrator
- **Input:** `Event`, `State`
- **Output:** `DispatchResult`, `DAGTransition`
- **Expectation:** Must be a pure DAG traversal processor.

## 2. Event Bus
- **Input:** `Event`
- **Output:** `Void`
- **Expectation:** Asynchronous, ordered event dispatcher.

## 3. Persistence
- **Input:** `EventEntry`, `StateSnapshot`
- **Output:** `Promise<Success>`, `Snapshot`
- **Expectation:** Stable append-only log interface + state snapshot reader.

## 4. Governance
- **Input:** `Event`, `Policy`
- **Output:** `ValidationResult`
- **Expectation:** Deterministic evaluation engine for FRCS rules.
