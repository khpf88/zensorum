'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Layers, 
  Gavel, 
  Send, 
  RefreshCcw, 
  Box, 
  ShieldCheck,
  PackageX,
  Zap,
  Clock
} from 'lucide-react';
import RuntimeFlow, { FlowStep } from '@/components/RuntimeFlow';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EnterpriseOperationsPage() {
  const steps: FlowStep[] = [
    {
      icon: ShoppingCart,
      title: "Procurement Request",
      description: "A high-value autonomous procurement request is triggered via a supply-chain AI agent.",
      intervention: "Zensorum captures the event and locks the cross-system state to prevent conflicting actions.",
      outcome: "Immediate coordination of high-velocity supply chain signals."
    },
    {
      icon: Layers,
      title: "Cross-System Enrichment",
      description: "Aggregating vendor compliance data, current budget availability, and inventory state.",
      intervention: "Zensorum coordinates secure data retrieval from SAP, Oracle, and internal databases.",
      outcome: "Total operational visibility established in the execution runtime."
    },
    {
      icon: Gavel,
      title: "Policy Enforcement",
      description: "Validating the request against vendor white-lists and multi-level approval hierarchies.",
      intervention: "The governed runtime evaluates complex authorization logic before any capital is committed.",
      outcome: "Elimination of 'maverick' spending and unauthorized procurement."
    },
    {
      icon: ShieldCheck,
      title: "Governance Gating",
      description: "Ensuring all required digital signatures and ESG compliance proofs are active.",
      intervention: "Zensorum gates the execution path until all governance constraints are deterministically met.",
      outcome: "100% adherence to corporate and ESG mandates at the moment of action."
    },
    {
      icon: Send,
      title: "Execution Routing",
      description: "Finalizing the purchase order and updating the financial ledger atomically.",
      intervention: "Orchestrating deterministic system updates; Zensorum ensures all systems reconcile or rollback.",
      outcome: "Guaranteed system-to-system consistency across the global enterprise."
    },
    {
      icon: RefreshCcw,
      title: "State Reconciliation",
      description: "Confirming successful system state updates and releasing system locks.",
      intervention: "Zensorum verifies the final state of all downstream systems after the coordination flow.",
      outcome: "Zero manual reconciliation required between finance and procurement."
    },
    {
      icon: Box,
      title: "Traceability Finalization",
      description: "Persisting the complete execution lineage for internal audit and financial reporting.",
      intervention: "Immutable recording of every decision point and system acknowledgement.",
      outcome: "Audit-ready financial traces generated automatically in real-time."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070A0F] text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="py-20 px-6 max-w-6xl mx-auto">
        <div className="inline-block px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-medium mb-4 uppercase tracking-widest">
          Global Enterprise · Autonomous Coordination
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Enterprise Operations Execution</h1>
        <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
          As enterprise operations transition to autonomous coordination across fragmented ERPs and AI agents, governed execution becomes the foundation of operational trust. Zensorum provides the deterministic layer for the next generation of global operations.
        </p>
      </header>

      {/* Before Zensorum */}
      <section className="py-20 px-6 bg-panel/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-accent-blue">The Legacy Execution Gap</h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <PackageX className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Uncontrolled Operational Drift</span>
                  <span className="text-slate-400">Autonomous processes diverge from corporate policy without a deterministic runtime layer to enforce strategic intent.</span>
                </div>
              </li>
              <li className="flex items-start">
                <PackageX className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Fragmented System State</span>
                  <span className="text-slate-400">Finance and Procurement systems fall out of sync as high-velocity automation bypasses traditional manual reconciliation.</span>
                </div>
              </li>
              <li className="flex items-start">
                <PackageX className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Governance Blind Spots</span>
                  <span className="text-slate-400">Machine-driven operations execute without runtime governance, leaving the enterprise exposed to massive financial and compliance risks.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-2xl bg-panel border border-accent-blue/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-24 h-24 text-accent-blue" />
            </div>
            <div className="flex items-center gap-3 mb-6 text-red-400">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Strategic Risk</span>
            </div>
            <p className="text-2xl font-medium leading-snug text-white">
              "The ability to scale global enterprise automation is limited by the lack of a governed execution layer that can coordinate fragmented systems with absolute trust."
            </p>
          </div>
        </div>
      </section>

      {/* Runtime Flow */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">The Trust Coordination Runtime</h2>
          <p className="text-slate-400 text-lg">Ensuring deterministic results in the era of autonomous operations.</p>
        </div>
        <RuntimeFlow steps={steps} />
      </section>

      {/* Outcomes */}
      <section className="py-20 px-6 bg-panel/30 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Operational Trust Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-xl bg-panel border border-slate-800 hover:border-accent-blue/30 transition-all">
              <div className="text-4xl font-bold text-accent-blue mb-2">Absolute</div>
              <p className="text-slate-400">Policy enforcement across all flows</p>
            </div>
            <div className="p-8 rounded-xl bg-panel border border-slate-800 hover:border-accent-cyan/30 transition-all">
              <div className="text-4xl font-bold text-accent-cyan mb-2">75%</div>
              <p className="text-slate-400">Reduction in operational uncertainty</p>
            </div>
            <div className="p-8 rounded-xl bg-panel border border-slate-800 hover:border-accent-blue/30 transition-all">
              <div className="text-4xl font-bold text-accent-blue mb-2">&lt;50ms</div>
              <div className="text-sm font-medium mt-1 uppercase tracking-widest opacity-50">Latency</div>
              <p className="text-slate-400">Deterministic state consistency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Impact */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Total Operational Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-blue mb-2">Operations Teams</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Transition from manual coordination to governing autonomous flows. Trust the underlying runtime to handle system failures and state drift automatically.</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-cyan mb-2">Finance & Audit</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Gain real-time, tamper-proof evidence for every financial decision. Reduce the cost of compliance by turning 'policy' into 'execution reality'.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-blue mb-2">IT & Platform Teams</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Eliminate the risk of 'maverick' automation and fragile point-to-point integrations. Provide a standardized trust layer for the entire enterprise.</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-cyan mb-2">Corporate Leadership</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Ensure corporate strategy is executed exactly as intended across global divisions. Governed execution turns strategic vision into operational certainty.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
