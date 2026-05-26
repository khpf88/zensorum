# Functional Requirements (Hardened)

1. **Deterministic Execution**: Pure reducer model ensures that given the same event history, the runtime produces identical state graphs.
2. **Triple-Lock Idempotency**:
    *   **Ingress Lock**: Unique `eventId` deduplication.
    *   **Transition Lock**: Semantic `patientId:workflowId:eventType` suppression.
    *   **Reducer Lock**: `appliedEventSet` guard within the state machine.
3. **DAG Consistency**: Authoritative dependency resolver requires completion of all structural parents before transition.
4. **Terminal Immutability (Hard Stop)**: 
    *   Ingress layer strictly rejects all events after `DISCHARGE_COMPLETED`.
    *   Reducer ignores all mutations for locked states.
    *   Zero post-terminal processing allowed.
5. **Monotonicity**: Strict `n+1` sequence enforcement per patient stream prevents backward transitions or sequence drift.
6. **UI Consistency**: React Flow graph is a stable, pure projection of frozen state snapshots with optimized referential stability.

