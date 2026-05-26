# ExecutionBundle & Hashing Specification (Phase 3.1)

## 1. System Context
Zensorum is a deterministic dual-runtime system (TypeScript canonical, Go mirror). This document defines the canonical data contract for formal runtime equivalence verification.

## 2. Objective
Define a strict, implementation-ready specification for the `ExecutionBundle`, the deterministic artifact used as the sole input to the Parity Oracle.

## 3. ExecutionBundle — Strict Schema
All fields are REQUIRED. No optional fields allowed (except where explicitly nullable).

```json
{
  "runId": "string",
  "runtime": "ts" | "go",
  "eventStreamHash": "string",
  "frcsDecisions": [FrcsDecision...],
  "dagValidationResults": [DagValidationResult...],
  "eventOrder": [EventOrderEntry...],
  "stateHashTimeline": [StateHashEntry...],
  "finalStateHash": "string",
  "replayHash": "string",
  "runtimeMeta": RuntimeMeta
}
```

### 3.1 FrcsDecision
```json
{
  "nodeId": "string",
  "decisionType": "string",
  "decisionHash": "string"
}
```
*Constraints*: Sorted by `nodeId` ascending.

### 3.2 DagValidationResult
```json
{
  "nodeId": "string",
  "isValid": boolean,
  "errorCode": "string" | null,
  "validationHash": "string"
}
```
*Constraints*: Sorted by `nodeId` ascending.

### 3.3 EventOrderEntry
```json
{
  "index": number,
  "eventId": "string",
  "parentEventIds": ["string"...],
  "orderHash": "string"
}
```
*Constraints*: Topological DAG execution order. `parentEventIds` sorted lexicographically.

### 3.4 StateHashEntry
```json
{
  "stepIndex": number,
  "stateHash": "string"
}
```
*Constraints*: `stepIndex` sequential 0..N.

### 3.5 RuntimeMeta
```json
{
  "version": "string",
  "buildId": "string",
  "executionTimeNs": number
}
```
*Constraints*: `executionTimeNs` is for diagnostics only (excluded from hashes).

## 4. Hashing Specification (Critical)
Hash `H` is defined as **SHA-256** over the **Canonical UTF-8 JSON** string.

### 4.1 JSON Canonicalization Rules (Mandatory)
Before hashing, apply:
1.  **Keys**: Sorted lexicographically.
2.  **Whitespace**: Removed.
3.  **Encodings**: UTF-8 only.
4.  **Arrays**: Preserve semantic order unless specified.
5.  **Nulls**: Explicit `null` or removed (no `undefined`).
6.  **Numbers**: No scientific notation, no truncation inconsistencies.
7.  **Booleans**: `true` | `false`.
8.  **Strings**: UTF-8 NFC normalized.

### 4.2 Specific Hash Definitions
- `decisionHash`: `H(canonical JSON of: nodeId, decisionType, inputContext, outputDecision)`
- `validationHash`: `H(canonical JSON of: nodeId, adjacency list, validation result, errorCode)`
- `orderHash`: `H(canonical JSON of: eventId, parentEventIds, index)`
- `stateHash`: `H(canonical full state snapshot at stepIndex)`
- `finalStateHash`: `H(final state snapshot only)`
- `replayHash`: `H(canonical replay execution trace)`
- `eventStreamHash`: `H(canonical JSON of full input event stream)`

## 5. Normalization Rules (Pre-hash)
1.  Sort `frcsDecisions` by `nodeId`.
2.  Sort `dagValidationResults` by `nodeId`.
3.  Sort `parentEventIds` lexicographically.
4.  Ensure `eventOrder` is topological and index-stable.
5.  Ensure state snapshots are serialized identically.

## 6. Cross-Runtime Parity
- Byte-identical canonical JSON output.
- Identical hash outputs for identical logical inputs.
- No runtime-specific artifacts allowed in hash inputs.

## 7. Forbidden
- Non-deterministic inputs.
- Unordered map serialization.
- Timestamps in hashed content.
- Floating-point inconsistencies.
- `runtimeMeta` in parity-critical hashes.
- Hidden fields.
