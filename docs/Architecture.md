# Zensorum Architecture Documentation

## High-Level Architecture
Zensorum follows a strictly layered, unidirectional execution and verification model.

### Layers
1. **Application Layer (`/apps`):** Consumer interfaces (e.g., `discharge-demo`).
2. **Compatibility Layer (`ZRCL`):** Translates imperative intent into canonical bundles.
3. **Execution Layer (`/runtime`):** Deterministic state machine (Go/TS).
4. **Verification Layer (`/packages/validation`):** Proof engines (Phase 5), Meta-verification (Phase 5.1).
5. **Governance Layer (`CAR`, `CGVL`):** Axiomatic registry and version binding.
6. **Certification Layer (`CDF`, `FVCL`):** Final authority for system truth.

## Authority Hierarchy
Truth is generated at the Runtime layer but only recognized once certified by the CDF. No application-level logic has authority over the execution truth.

## Monorepo Layout
- `/apps`: Consumer applications.
- `/packages`: Shared libraries and verification logic.
- `/runtime`: The deterministic Go engine.
- `/docs`: Governance, Architecture, and Migration documentation.
- `/infra`: Deployment and CI/CD configurations.
