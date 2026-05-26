# Invariant Violation Codes

This document defines the canonical error codes for the Zensorum Formal Invariant System.

| Code | Description |
| :--- | :--- |
| `MISSING_RUN_ID` | ExecutionBundle is missing the mandatory `runId`. |
| `MISSING_FINAL_STATE_HASH` | ExecutionBundle is missing the `finalStateHash`. |
| `CAUSALITY_VIOLATION` | Event references a parent that does not exist or has not been processed. |
| `DUPLICATE_EVENT_ID` | EventID is not globally unique. |
| `RUN_ID_MISMATCH` | Parity mismatch: RunIDs do not match between runtimes. |
| `FINAL_STATE_HASH_MISMATCH` | Parity mismatch: Final state hashes do not match between runtimes. |
| `EVENT_STREAM_HASH_MISMATCH` | Parity mismatch: Input event stream hashes do not match. |
