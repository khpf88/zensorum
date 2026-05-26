# Runtime Boundary Specification

## Active Runtime (Current)
- **Technology:** TypeScript (`src/`)
- **Execution:** `npm run dev` → `src/app.ts` (bootstrap, registry, orchestrator)
- **Role:** Production truth and execution authority.

## Target Runtime (Future)
- **Technology:** Go (`/runtime/`)
- **Execution:** N/A (Non-functional scaffold)
- **Role:** Future execution engine for production truth.

## Governance Rule
**Only ONE active runtime is permitted to execute production truth at any time.** 
Transition from TypeScript to Go requires an explicit governance authorization (Tier 0).
