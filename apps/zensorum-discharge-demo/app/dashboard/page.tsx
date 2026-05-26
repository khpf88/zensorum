'use client';

import { OperationalShell } from "@/components/layout/operational-shell";
import { useEventIngestion } from "@/hooks/use-event-ingestion";
import { startSimulation } from "@/simulator/core/generator";
import { useEffect } from "react";

export default function DashboardPage() {
  // console.log('[Dashboard] Mounting...');
  useEventIngestion();

  useEffect(() => {
    // console.log('[Dashboard] Initializing simulation...');
    const stop = startSimulation();
    return () => stop();
  }, []);

  return <OperationalShell />;
}
