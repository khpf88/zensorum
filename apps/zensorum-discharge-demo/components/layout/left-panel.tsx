'use client';

import { useOperationsStore } from '@/store/operations.store';

export function LeftPanel() {
  const patientCount = Object.keys(useOperationsStore((state) => state.patients)).length;
  const eventCount = useOperationsStore((state) => state.eventLedger.length);

  return (
    <aside className="w-64 border-r border-[#1E293B] bg-[#070A0F] p-4 flex flex-col">
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Operational Metrics</h2>
      <div className="space-y-4">
        <div className="p-3 bg-[#0F172A] border border-[#1E293B] rounded-md">
          <div className="text-[10px] text-slate-400 font-mono">ACTIVE ENTITIES</div>
          <div className="text-2xl text-cyan-400 font-mono">{patientCount}</div>
        </div>
        <div className="p-3 bg-[#0F172A] border border-[#1E293B] rounded-md">
          <div className="text-[10px] text-slate-400 font-mono">LEDGER DEPTH</div>
          <div className="text-2xl text-emerald-400 font-mono">{eventCount}</div>
        </div>
      </div>

      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-8 mb-4">System Integrity</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-slate-400 uppercase">Status</span>
          <span className="text-blue-500 font-bold tracking-tighter">HARDENED</span>
        </div>
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-slate-400 uppercase">Deduplication</span>
          <span className="text-emerald-500 font-bold tracking-tighter">ACTIVE</span>
        </div>
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-slate-400 uppercase">Orchestration</span>
          <span className="text-cyan-500 font-bold tracking-tighter">PARALLEL</span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-[#1E293B]">
        <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest text-center">
          Zensorum Runtime v2.0
        </div>
      </div>
    </aside>
  );
}
