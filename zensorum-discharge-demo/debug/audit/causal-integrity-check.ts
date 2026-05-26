import { useOperationsStore } from '@/store/operations.store';

export const validateCausalIntegrity = () => {
  const events = useOperationsStore.getState().eventLedger;
  const errors: string[] = [];

  events.forEach(event => {
    // Check for orphan nodes (causalParentId check)
    if ((event as any).causalParentId && !events.find(e => e.eventId === (event as any).causalParentId)) {
      errors.push(`Orphan event detected: ${event.eventId} refers to missing parent ${(event as any).causalParentId}`);
    }
  });

  if (errors.length > 0) {
    console.error("Causal Integrity FAIL:", errors);
    return false;
  }
  
  console.log("Causal Integrity PASS");
  return true;
};
