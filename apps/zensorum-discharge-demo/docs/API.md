# API Documentation

## Dispatching Events
The primary interaction with the runtime is dispatching `WorkflowEvent` to the `OperationsStore`.

```typescript
type WorkflowEvent = {
  eventId: string;
  patientId: string;
  type: string;
  sequence: number;
  timestamp: number;
  epoch: number;
};
```

All events are processed through the per-patient serial queue.
