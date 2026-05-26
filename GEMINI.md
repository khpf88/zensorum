# ZENSORUM ARCHITECTURE AUTHORITY HIERARCHY
(Constitutional Governance Layer for System Truth Resolution)

---

# 0. PURPOSE

This document defines the strict precedence model for all architectural, runtime, and design decisions within the Zensorum system.

It resolves conflicts between:
- root-level architecture definitions
- subdirectory documentation
- legacy runtime assumptions
- implementation-level notes
- external agent interpretations (Gemini / ChatGPT / tools)

---

# 1. CORE PRINCIPLE

There is ONLY ONE SOURCE OF ARCHITECTURAL TRUTH:

> /docs/governance (Root Governance Layer)

All other sources are:
- derivations
- implementations
- historical snapshots
- or contextual artifacts

---

# 2. AUTHORITY TIERS (HIGHEST → LOWEST)

## TIER 0 — CONSTITUTIONAL GOVERNANCE (ABSOLUTE AUTHORITY)

Path:
/docs/governance/*

Examples:
- runtime-authority-lifecycle.md
- runtime-boundaries.md
- execution-policies.md

Rules:
- Defines system-wide truth
- Overrides ALL other documentation
- Defines active vs target runtime state
- Defines execution authority
- Defines allowed architecture transitions

---

## TIER 1 — SYSTEM ARCHITECTURE SPECIFICATION

Path:
/docs/architecture/*

Examples:
- execution-model.md
- runtime-architecture.md
- system-overview.md

Rules:
- Defines intended system design
- Must comply with Tier 0
- Cannot contradict governance layer
- Serves as engineering reference

---

## TIER 2 — IMPLEMENTATION LAYER

Paths:
/runtime/
/packages/
/apps/

Rules:
- Contains executable or structural code
- Must comply with Tier 0 and Tier 1
- Cannot define system-wide truth
- Cannot override governance decisions

Includes:
- Go runtime implementation (/runtime)
- TS contracts (/packages/core)
- application systems (/apps)

---

## TIER 3 — LEGACY / TRANSITION ARTIFACTS

Examples:
- old GEMINI.md files inside subdirectories
- historical runtime assumptions
- deprecated architecture notes

Rules:
- Not authoritative
- Must not be used for decision-making
- May be referenced only for migration context
- Must be explicitly labeled DEPRECATED

---

## TIER 4 — OPERATIONAL CONTEXT (EPHEMERAL)

Examples:
- chat session context
- AI-generated plans
- temporary prompts
- execution playbooks

Rules:
- Cannot define architecture truth
- Must always defer to Tier 0–2
- May contain proposals only

---

# 3. CONFLICT RESOLUTION RULE

When conflicting information exists:

## STEP 1
Check Tier 0 (Governance)

## STEP 2
If absent, check Tier 1 (Architecture)

## STEP 3
If still ambiguous, check Tier 2 (Implementation reality)

## STEP 4
Ignore Tier 3 and Tier 4 as authoritative sources

---

# 4. RUNTIME AUTHORITY RULE

At any given time:

## ONLY ONE ACTIVE RUNTIME IS PERMITTED

Defined in:
- Tier 0 governance layer

States:

### ACTIVE RUNTIME
- Executes production system truth
- Currently: TypeScript (src/)

### TARGET RUNTIME
- Future execution engine
- Currently: Go (/runtime)

### TRANSITION STATE
- Not active until explicitly authorized in Tier 0

---

# 5. SUBDIRECTORY GOVERNANCE PROHIBITION

No subdirectory may define:

- canonical runtime authority
- system-wide architectural truth
- execution model overrides
- governance rules

Any such definition MUST be treated as:
→ DEPRECATED unless elevated to Tier 0

---

# 6. DEPRECATION RULE

Any document that conflicts with Tier 0:

- is immediately classified as DEPRECATED
- must not influence runtime decisions
- must be relocated or annotated

---

# 7. AI AGENT BEHAVIOR RULE (CRITICAL)

All agents (Gemini, ChatGPT, automation systems) must:

- ALWAYS check Tier 0 first
- NEVER assume subdirectory authority
- NEVER treat local GEMINI.md files as canonical
- RESOLVE conflicts in favor of Tier 0

---

# 8. SYSTEM GUARANTEE

This hierarchy ensures:

- Single source of truth
- No dual-runtime ambiguity
- No local/global contradiction
- Controlled migration lifecycle
- Deterministic architectural reasoning

---

END OF ARCHITECTURE AUTHORITY HIERARCHY
