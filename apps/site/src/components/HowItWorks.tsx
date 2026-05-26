'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Zap, LockKeyhole, Search, Database, RefreshCw } from 'lucide-react';

export default function HowItWorks() {
  const coreValues = [
    { 
      icon: ShieldCheck, 
      title: "Automated Governance", 
      desc: "Every operational step is pre-validated against your business rules automatically, eliminating reactive compliance checks." 
    },
    { 
      icon: Eye, 
      title: "Operational Visibility", 
      desc: "Gain a crystal-clear audit trail of exactly what happened, why, and when, across your entire fragmented infrastructure." 
    },
    { 
      icon: Zap, 
      title: "Reliable Coordination", 
      desc: "Build and scale complex operations with confidence, backed by built-in protection against system failures and state drift." 
    }
  ];

  return (
    <section className="py-28 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-sm uppercase tracking-[0.25em] text-[#3B82F6] font-bold">The Zensorum Advantage</div>
          <h2 className="mt-6 text-4xl font-semibold">Ensuring enterprise operational integrity.</h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {coreValues.map((value, idx) => (
            <motion.div 
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="p-8 rounded-3xl border border-white/10 bg-[#0E141C] hover:border-[#3B82F6]/30 transition-all group"
            >
              <value.icon className="h-10 w-10 text-[#60A5FA] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-10 rounded-3xl border border-[#3B82F6]/20 bg-[#101A28] shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#60A5FA] text-[10px] font-bold uppercase tracking-widest mb-6">
                Execution Excellence
              </div>
              <h4 className="text-2xl font-semibold mb-6">Built for Operational Resilience</h4>
              <p className="text-gray-300 leading-relaxed">
                Zensorum sits at the core of your operations, transforming fragmented processes into 
                <strong> a governed execution fabric</strong>. We manage the complexity of cross-system data, 
                policy validation, and error recovery, so your leadership can focus on strategy rather than troubleshooting.
              </p>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="min-h-[12rem] rounded-2xl bg-[#070A0F] border border-white/5 flex flex-col items-center justify-center font-mono text-xs text-[#60A5FA] px-4 md:px-8 py-8 text-center gap-8 w-full">
                <div className="flex items-center gap-2 md:gap-4 w-full justify-between opacity-50 overflow-x-auto pb-2 no-scrollbar">
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <Zap className="h-4 w-4" />
                    <span className="text-[9px] md:text-[10px]">Signal</span>
                  </div>
                  <div className="h-px bg-white/10 flex-1 min-w-[10px]" />
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <Search className="h-4 w-4" />
                    <span className="text-[9px] md:text-[10px]">Context</span>
                  </div>
                  <div className="h-px bg-white/10 flex-1 min-w-[10px]" />
                  <div className="flex flex-col items-center gap-1 shrink-0 text-white opacity-100">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-[9px] md:text-[10px] font-bold">Governance</span>
                  </div>
                  <div className="h-px bg-white/10 flex-1 min-w-[10px]" />
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <RefreshCw className="h-4 w-4" />
                    <span className="text-[9px] md:text-[10px]">Coordination</span>
                  </div>
                  <div className="h-px bg-white/10 flex-1 min-w-[10px]" />
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <Database className="h-4 w-4" />
                    <span className="text-[9px] md:text-[10px]">Result</span>
                  </div>
                </div>
                <div className="text-[#22D3EE] font-bold tracking-[0.2em] md:tracking-widest uppercase text-[10px] md:text-xs">Governed Operational Path</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
