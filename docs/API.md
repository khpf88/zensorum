# Zensorum API Documentation

## Overview
Zensorum exposes a multi-layered API surface designed for deterministic interaction.

## 1. Runtime Interface (Core)
The core Go engine exposes an event-sourced ingestion interface.

### `Ingest(bundle: ExecutionBundle): TraceResult`
- **Input:** A CSNL-normalized `ExecutionBundle`.
- **Output:** A `TraceResult` containing the new `stateHash` and generated events.

## 2. ZRCL Interface (Compatibility)
The Runtime Compatibility Layer (ZRCL) translates legacy application requests into the core runtime format.

### `Translate(request: LegacyRequest): ExecutionBundle`
- **Input:** Unstructured legacy imperative request.
- **Output:** Canonical, deterministic `ExecutionBundle`.

## 3. Validation & Certification API
Access to formal proof artifacts.

### `GetAuditCertificate(bundleId: UUID): AuditCertificate`
- **Output:** The signed certification result from the CDF.

### `GetProofChain(bundleId: UUID): FVCL_Artifacts`
- **Output:** The full formal verification proof chain.
