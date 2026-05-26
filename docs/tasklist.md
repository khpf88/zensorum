# Zensorum Project Tasklist

## Current Phase: Phase 2 - System Intake Analysis

### Phase 1: Repository Restructure & Baseline Commit [COMPLETED]
- [x] Initialize Git repository
- [x] Configure `.gitignore`
- [x] Migrate `zensorum-discharge-demo` to `apps/`
- [x] Create baseline commit and tag
- [x] Push to remote repository (Force Push)

### Phase 2: System Intake Analysis [IN PROGRESS]
- [ ] Structural inventory of `apps/zensorum-discharge-demo`
- [ ] Map execution flow for Golden Execution Set
- [ ] Map execution flow for Adversarial Validation
- [ ] Dependency graph analysis (internal/external)
- [ ] Identify logic duplication (CSNL, Verification, Hashing)
- [ ] Classify components (Static, Simulation, Integration)

### Phase 3: Runtime Compatibility Layer (ZRCL) Design
- [ ] Define LCM (Legacy Contract Model) for demo apps
- [ ] Specify ZRCL transformation rules
- [ ] Design stateless translation boundary
- [ ] Formalize Runtime ↔ ZRCL alignment

### Phase 4: Implementation & Alignment
- [ ] Implement ZRCL
- [ ] Align `discharge-demo` with ZRCL/Runtime v2
- [ ] Verify deterministic parity
- [ ] Execute validation suite (Test Harness)
