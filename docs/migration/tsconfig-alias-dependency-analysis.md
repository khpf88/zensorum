# Tsconfig Alias Dependency Analysis

## Current Status
`tsconfig.json` uses path aliases (`@core/*`, `@domain/*`) that provide developer convenience but obscure the true dependency structure, encouraging "just import it" behavior.

## Strategy
1. **Explicit Imports Required:** During decoupling, we must replace `@core/*` aliases with explicit import paths. This forces developers to see *how many* levels deep the dependency is (e.g., `../../../src/core/event_bus`).
2. **Phase out Aliases:** Once explicit imports are used, `tsconfig` aliases will be phased out to facilitate the move to a truly modular architecture.
3. **Ergonomics Preservation:** Instead of direct module-level aliases, we will create stable, named SDK-level imports (e.g., `import { EventBus } from '@zensorum/sdk'`).
