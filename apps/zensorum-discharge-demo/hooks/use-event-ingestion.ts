import { useEffect } from 'react';
import { eventBus } from '@/services/runtime/event-bus';
import { useOperationsStore } from '@/store/operations.store';

export const useEventIngestion = () => {
  const dispatch = useOperationsStore((state) => state.dispatch);

  useEffect(() => {
    // console.log('[IngestionHook] Mounting subscription...');
    const unsubscribe = eventBus.subscribe((event) => {
      // console.log(`[IngestionHook] Received event: ${event.type}`);
      dispatch(event as any);
    });
    
    return () => {
        // console.log('[IngestionHook] Unsubscribing...');
        unsubscribe();
    };
  }, [dispatch]);
};

