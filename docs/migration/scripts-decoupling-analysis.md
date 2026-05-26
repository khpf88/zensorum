# Scripts Decoupling Analysis

## Status
Scripts (e.g., `smoke-test.ts`, `replay-certification.ts`) have high-risk direct coupling to `src/core/*`.

## Usage Patterns
- **Direct Instantiation:** `orchestrator`, `persistenceLayer` are treated as singletons.
- **Direct Event Injection:** `eventBus.publish` is called directly, bypassing any abstraction layer.
- **Test Harness Dependence:** Scripts act as tests that rely on the *internal* structure of `src/core`, not a public API.

## Decoupling Strategy
1. **Define Test API:** Create `src/lib/test-api.ts` which exposes only authorized methods needed by scripts.
2. **Abstract Core:** Scripts must consume this Test API, not `src/core`.
3. **Registry Abstraction:** Move registration and inspection methods of `contractRegistry` and `handlerRegistry` into the Test API to prevent scripts from seeing the raw registries.
