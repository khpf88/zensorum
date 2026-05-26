# Architecture Overview (v2.0 - Hardened)

The Zensorum Discharge Orchestration Runtime is a deterministic, dependency-validated state machine over a Directed Acyclic Graph (DAG), optimized for high-integrity compliance-grade environments.

## Core Architectural Components

1. **Event Ingestion Layer (Boundary Protection)**: 
    - **Hard Terminal Lock**: Ingress layer strictly rejects all events for patients in a terminal state.
    - **Centralized Idempotency Gate**: Utilizes `IdempotencyKernel` to enforce exactly-once semantic processing at the boundary, ensuring every `patientId:workflowId:eventType` pair is processed once.
    - **Per-patient FIFO Queue**: Promise-based serialization ensures no overlapping execution within a patient stream.
    - **Sequence Guard**: Strict `n+1` monotonic validation per patient.


2.  **Pure State Reducer (Correctness Kernel)**:
    - Pure, deterministic function: `(State, Event, DAG) => NewState`.
    - Derives temporal state from event timestamps (no `Date.now()`).
    - Enforces **Internal Monotonicity** and **Applied Event Sets**.
    - Rebuildable from logs via `OrchestrationEngine.rebuildState`.

3.  **Visualization Projection Layer**:
    - Derived exclusively from committed state snapshots.
    - **Referential Stability**: Memoized `nodeTypes`, `edgeTypes`, and graph mapping to prevent React Flow churn.
    - Sorted visual indexing to maintain stable patient positioning.

