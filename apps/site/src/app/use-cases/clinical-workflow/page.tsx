'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Beaker, 
  Search, 
  ShieldCheck, 
  FileCheck, 
  Settings, 
  Database, 
  ClipboardCheck,
  AlertCircle,
  Clock,
  Zap
} from 'lucide-react';
import RuntimeFlow, { FlowStep } from '@/components/RuntimeFlow';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClinicalWorkflowPage() {
  const steps: FlowStep[] = [
    {
      icon: Beaker,
      title: "Lab Result Generated",
      description: "A new clinical lab result is detected in the LIMS (Laboratory Information Management System).",
      intervention: "Zensorum event-listener detects the state change and initiates a deterministic execution thread.",
      outcome: "Zero-latency initiation of the coordination flow without manual polling."
    },
    {
      icon: Search,
      title: "Context Enrichment",
      description: "Gathering patient history, trial protocols, and current medication lists from disparate systems.",
      intervention: "Zensorum runtime coordinates cross-system data retrieval with built-in retry logic and state persistence.",
      outcome: "A unified execution context is established, ensuring all downstream decisions are data-driven."
    },
    {
      icon: ShieldCheck,
      title: "Policy Evaluation",
      description: "Evaluating the result against trial-specific safety thresholds and regulatory requirements.",
      intervention: "Zensorum evaluates declarative governance policies at the runtime layer before any action is taken.",
      outcome: "Guaranteed compliance with protocol-defined safety gates."
    },
    {
      icon: FileCheck,
      title: "Governance Validation",
      description: "Verifying that all necessary electronic signatures and approvals are present for the current stage.",
      intervention: "Execution gating: Zensorum pauses execution until all cryptographic proofs of approval are validated.",
      outcome: "Elimination of unauthorized or incomplete clinical progressions."
    },
    {
      icon: Settings,
      title: "Execution Coordination",
      description: "Triggering automated notifications to the principal investigator and updating the trial dashboard.",
      intervention: "Orchestrating multi-system updates as a single atomic operation; if one fails, Zensorum manages the state recovery.",
      outcome: "Consistent system state across the entire enterprise clinical infrastructure."
    },
    {
      icon: Database,
      title: "State Persistence",
      description: "Recording the complete state of the workflow, including all data points and decisions made.",
      intervention: "Zensorum persists the execution state to a tamper-proof event log.",
      outcome: "Resilience against system outages; workflows resume exactly where they left off."
    },
    {
      icon: ClipboardCheck,
      title: "Traceability Recording",
      description: "Generating a final audit trail for the execution step for regulatory submission.",
      intervention: "Automatic generation of a cryptographically signed execution trace.",
      outcome: "Audit-ready records generated in real-time, reducing compliance overhead by 90%."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070A0F] text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="py-20 px-6 max-w-6xl mx-auto">
        <div className="inline-block px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-sm font-medium mb-4 uppercase tracking-widest">
          Life Sciences · AI Era Operations
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Clinical Workflow Coordination</h1>
        <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
          As clinical trials move toward autonomous data ingestion and AI-assisted triage, governed execution becomes the foundation of trial integrity. Zensorum provides the trust layer for mission-critical clinical operations.
        </p>
      </header>

      {/* Before Zensorum */}
      <section className="py-20 px-6 bg-[#0E141C] border-y border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-[#3B82F6]">The Legacy Operational Gap</h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Uncontrolled Automation Risk</span>
                  <span className="text-slate-400">AI-assisted triage and data ingestion lack a deterministic coordination layer, creating new compliance blind spots.</span>
                </div>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Manual Coordination Debt</span>
                  <span className="text-slate-400">Clinical teams remain trapped in manual status tracking and cross-system data reconciliation.</span>
                </div>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Reactive Governance Architecture</span>
                  <span className="text-slate-400">Compliance is checked after execution, leading to significant regulatory risk in high-velocity trials.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-2xl bg-[#101A28] border border-[#3B82F6]/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-24 h-24 text-[#3B82F6]" />
            </div>
            <div className="flex items-center gap-3 mb-6 text-[#60A5FA]">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Mission-Critical Impact</span>
            </div>
            <p className="text-2xl font-medium leading-snug text-white">
              "Without governed execution, the transition to autonomous clinical operations is blocked by unacceptable regulatory and safety risks."
            </p>
          </div>
        </div>
      </section>

      {/* Runtime Flow */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">The Trust Infrastructure Path</h2>
          <p className="text-slate-400 text-lg">Bringing absolute certainty to machine-assisted clinical execution.</p>
        </div>
        <RuntimeFlow steps={steps} />
      </section>

      {/* Outcomes */}
      <section className="py-20 px-6 bg-[#0E141C]/50 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Operational Trust Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-xl bg-[#0E141C] border border-white/10 hover:border-[#3B82F6]/30 transition-all">
              <div className="text-4xl font-bold text-[#3B82F6] mb-2">Absolute</div>
              <p className="text-slate-400">Strategic trust in autonomous triage</p>
            </div>
            <div className="p-8 rounded-xl bg-[#0E141C] border border-white/10 hover:border-[#22D3EE]/30 transition-all">
              <div className="text-4xl font-bold text-[#22D3EE] mb-2">100%</div>
              <p className="text-slate-400">Deterministic protocol adherence</p>
            </div>
            <div className="p-8 rounded-xl bg-[#0E141C] border border-white/10 hover:border-[#3B82F6]/30 transition-all">
              <div className="text-4xl font-bold text-[#3B82F6] mb-2">Zero</div>
              <p className="text-slate-400">Manual cross-system reconciliation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Impact */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Building Clinical Trust</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-[#0E141C] border border-white/10">
              <h3 className="font-bold text-[#3B82F6] mb-2">Principal Investigators</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Focus on patient safety and data insights while Zensorum ensures every machine-assisted decision follows trial protocols exactly.</p>
            </div>
            <div className="p-6 rounded-lg bg-[#0E141C] border border-white/10">
              <h3 className="font-bold text-[#22D3EE] mb-2">Regulatory Affairs</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Transform compliance from a post-hoc burden into a runtime certainty. Real-time, cryptographically signed audit traces eliminate the cost of audit prep.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-[#0E141C] border border-white/10">
              <h3 className="font-bold text-[#3B82F6] mb-2">Data Science & AI Teams</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Deploy clinical AI models with the confidence that they are governed by a deterministic execution layer that prevents uncontrolled actions.</p>
            </div>
            <div className="p-6 rounded-lg bg-[#0E141C] border border-white/10">
              <h3 className="font-bold text-[#22D3EE] mb-2">Trial Leadership</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Ensure strategic inevitability in trial execution. Governed autonomy means predictable timelines and absolute operational integrity.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
