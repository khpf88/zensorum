# DETERMINISTIC ARCHITECTURAL GOVERNANCE

## 1. CORE INVARIANTS
- Determinism is the absolute system guarantee.
- Any execution must be reproducible given the same inputs and configuration.

## 2. FORBIDDEN RUNTIME BEHAVIORS
- **Nondeterminism:** Use of `Date`, `Math.random`, `setTimeout`, or `setInterval` is strictly forbidden in the deterministic kernel.
- **Side Effects:** Avoid implicit shared state or process-wide mutability.
- **Side-Channel Dependencies:** Do not rely on environment variables or system clocks.

## 3. DEPENDENCY DIRECTION (STRICT Acyclic)
- `@zensorum/contracts` (Base Layer)
- `@zensorum/canonical` → `@zensorum/contracts`
- `@zensorum/replay` → `@zensorum/canonical`, `@zensorum/contracts`

**Circular dependencies are prohibited.**

## 4. IMPORT GOVERNANCE
- Use relative imports for internal package references.
- Use workspace imports (`@zensorum/*`) for cross-package communication.
- Cross-domain imports are strictly controlled to prevent dependency inversion.
