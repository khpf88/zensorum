# Functional Requirements Specification (FRS) - Zensorum Monorepo Alignment

## 1. Overview
The goal of this phase is to align the existing Zensorum components into a single monorepo while preserving the deterministic guarantees of the core runtime.

## 2. Requirements

### 2.1 Structural Alignment
- All consumer applications must reside in `/apps`.
- All core verification and SDK libraries must reside in `/packages`.
- The core Go engine must reside in `/runtime`.
- Root level must contain only repository-wide configuration and governance.

### 2.2 Dependency Isolation
- Consumer applications must not have direct imports from `/packages/validation` or `/runtime` internals.
- Communication with the runtime must occur through the Runtime Compatibility Layer (ZRCL) once implemented.

### 2.3 Determinism Preservation
- The restructuring must not modify the state-transition logic or hashing mechanisms of the core engine.
- Cross-runtime parity (TS/Go) must be maintained.

### 2.4 Auditability
- Every state transition must be traceable back to an originating intent in the application layer.
- Final certification must be verifiable via the `AuditCertificate` produced by the CDF.

## 3. Scope
- **In-Scope:** `/apps/site` relocation (Complete), `/apps/zensorum-discharge-demo` relocation (Complete), ZRCL design, Dependency mapping.
- **Out-of-Scope:** Modification of frozen core logic, re-implementation of the Go engine.
