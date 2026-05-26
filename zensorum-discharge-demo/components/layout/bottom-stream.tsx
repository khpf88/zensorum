'use client';

import { useOperationsStore } from '@/store/operations.store';
import { useEffect, useRef } from 'react';

export function BottomStream() {
  const ledger = useOperationsStore((state) => state.eventLedger);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ledger]);

  return (
    <footer className="h-48 border-t border-[#1E293B] bg-[#070A0F] p-4 flex flex-col">
      <div className="flex justify-between items-center mb-2 shrink-0">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Event Ledger</h2>
        <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest px-2 py-0.5 border border-slate-800 rounded bg-slate-900/50">
          Immutable Append-Only
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="font-mono text-[10px] text-slate-400 space-y-1 overflow-y-auto flex-1 scroll-smooth"
      >
        {ledger.map((event) => (
          <div key={event.eventId} className="border-l-2 border-slate-800 pl-2 hover:bg-[#0F172A] transition-colors py-0.5 group">
            <span className="text-slate-600">[{new Date(event.timestamp).toLocaleTimeString()}]</span>{" "}
            <span className="text-blue-500 group-hover:text-cyan-400 transition-colors font-bold uppercase tracking-tighter">{event.type.replace('WORKFLOW.', '')}</span>{" "}
            <span className="text-slate-600">ID:</span> <span className="text-slate-300">{event.patientId.slice(0, 8)}</span>{" "}
            <span className="text-slate-600">SEQ:</span> <span className="text-blue-400">{event.sequence}</span>
          </div>
        ))}
        {ledger.length === 0 && (
          <div className="text-slate-600 italic py-2">Awaiting runtime events...</div>
        )}
      </div>
    </footer>
  );
}
