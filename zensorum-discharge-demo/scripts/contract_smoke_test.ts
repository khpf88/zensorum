import { validateEvent } from "../lib/validation/event_guard"
import { toRuntimeEvent } from "../lib/runtime/event_adapter"

// ---------------------------------------------
// Helper: deterministic test runner
// ---------------------------------------------
function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`)
    process.exit(1)
  } else {
    console.log(`✅ PASS: ${message}`)
  }
}

// ---------------------------------------------
// BASE VALID EVENT (must pass)
// ---------------------------------------------
const validEvent = {
  id: "test-1",
  type: "LAB.SAMPLE.REQUESTED",
  timestamp: Date.now(),
  origin: "sdk-test",
  event_category: "LAB.SAMPLE",
  payload: { foo: "bar" },
  idempotency_key: "abc-123",
  metadata: {
    correlation_id: "c1",
    causation_id: "c0"
  }
}

// ---------------------------------------------
// CASE A: VALID EVENT
// ---------------------------------------------
try {
  validateEvent(validEvent)

  const projected = toRuntimeEvent(validEvent)

  assert(
    projected.id === validEvent.id &&
    projected.type === validEvent.type,
    "valid event passes validation + projection"
  )
} catch (e) {
  console.error("❌ CASE A FAILED", e)
  process.exit(1)
}

// ---------------------------------------------
// CASE B: RUNTIME LEAKAGE (must fail)
// ---------------------------------------------
const runtimeLeakEvent = {
  ...validEvent,
  executionStatus: "COMPLETED"
}

try {
  validateEvent(runtimeLeakEvent)
  assert(false, "runtime leakage should have been rejected")
} catch {
  console.log("✅ PASS: runtime leakage correctly rejected")
}

// ---------------------------------------------
// CASE C: INVALID LIFECYCLE TYPE (must fail)
// ---------------------------------------------
const invalidLifecycleEvent = {
  ...validEvent,
  type: "SYSTEM.EXECUTED"
}

try {
  validateEvent(invalidLifecycleEvent)
  assert(false, "invalid lifecycle event should have been rejected")
} catch {
  console.log("✅ PASS: invalid lifecycle correctly rejected")
}

// ---------------------------------------------
// CASE D: INVALID IDEMPOTENCY KEY (must fail)
// ---------------------------------------------
const invalidIdempotencyEvent = {
  ...validEvent,
  idempotency_key: "   "
}

try {
  validateEvent(invalidIdempotencyEvent)
  assert(false, "invalid idempotency key should have been rejected")
} catch {
  console.log("✅ PASS: invalid idempotency correctly rejected")
}

// ---------------------------------------------
// FINAL RESULT
// ---------------------------------------------
console.log("\n🟢 CONTRACT SMOKE TEST COMPLETE — ALL CHECKS PASSED")
process.exit(0)
