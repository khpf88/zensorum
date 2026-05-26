'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Search, 
  Lock, 
  Scale, 
  Cpu, 
  Database, 
  FileCheck,
  FileX,
  Zap,
  Clock
} from 'lucide-react';
import RuntimeFlow, { FlowStep } from '@/components/RuntimeFlow';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ComplianceGovernancePage() {
  const steps: FlowStep[] = [
    {
      icon: Zap,
      title: "Regulatory Event Detected",
      description: "A cross-border data transfer or high-value transaction is initiated by an autonomous agent.",
      intervention: "Zensorum's governed runtime intercepts the event before it propagates to the underlying systems.",
      outcome: "Immediate governance gating of high-risk operational events."
    },
    {
      icon: Search,
      title: "Policy Evaluation",
      description: "Analyzing the event against GDPR, local banking regulations, and internal corporate risk policies.",
      intervention: "Real-time evaluation of declarative policy sets across multiple jurisdictions simultaneously.",
      outcome: "Deterministic policy outcomes without manual legal review cycles."
    },
    {
      icon: Lock,
      title: "Execution Gating",
      description: "Ensuring all required encryption protocols and identity validations are active.",
      intervention: "Zensorum pauses the execution path if security constraints are not met at the runtime layer.",
      outcome: "0% probability of non-compliant execution reaching production systems."
    },
    {
      icon: Scale,
      title: "Deterministic Validation",
      description: "Verifying that the proposed system update maintains absolute state integrity.",
      intervention: "Zensorum runs a parallel simulation to validate the execution result before finalizing the commit.",
      outcome: "Elimination of unintended side-effects and operational drift."
    },
    {
      icon: Cpu,
      title: "Automated Governance",
      description: "The action is coordinated across the ledger, ERP, and compliance systems atomically.",
      intervention: "Distributed state coordination ensures that governance and execution are locked in a single atomic step.",
      outcome: "Consistent compliance state across the entire enterprise infrastructure."
    },
    {
      icon: Database,
      title: "State Persistence",
      description: "Immutable recording of the policy evaluation results and the finalized execution state.",
      intervention: "Zensorum persists the complete decision context to a tamper-proof event store.",
      outcome: "Real-time auditability without manual data extraction or logging."
    },
    {
      icon: FileCheck,
      title: "Audit Trail Finalization",
      description: "Generating a cryptographically signed proof of compliance for the specific operational event.",
      intervention: "Automatic generation of an immutable execution trace with all causal links preserved.",
      outcome: "95% reduction in audit response time and total regulatory transparency."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070A0F] text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="py-20 px-6 max-w-6xl mx-auto">
        <div className="inline-block px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-sm font-medium mb-4 uppercase tracking-widest">
          Governance & Risk · AI Infrastructure
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Compliance Governance Automation</h1>
        <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
          As enterprises move toward AI-driven operational execution, traditional compliance models fail. Zensorum provides the trust infrastructure to govern machine-assisted actions at the runtime, before they occur.
        </p>
      </header>

      {/* Before Zensorum */}
      <section className="py-20 px-6 bg-panel/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-accent-blue">The Legacy Compliance Gap</h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <FileX className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Reactive Governance Architecture</span>
                  <span className="text-slate-400">Compliance is checked after the event. In the AI era, this leads to uncontrollable risk and irreparable breaches.</span>
                </div>
              </li>
              <li className="flex items-start">
                <FileX className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Manual Audit Fragmentation</span>
                  <span className="text-slate-400">Piecing together audit trails across disconnected autonomous workflows is becoming strategically impossible.</span>
                </div>
              </li>
              <li className="flex items-start">
                <FileX className="w-6 h-6 text-red-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Inconsistent Policy Interpretation</span>
                  <span className="text-slate-400">Legacy systems cannot enforce declarative policies consistently across high-velocity, machine-driven operations.</span>
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
              <span className="text-sm font-bold uppercase tracking-wider">Regulatory Pressure</span>
            </div>
            <p className="text-2xl font-medium leading-snug text-white">
              "The transition to autonomous enterprise operations requires a shift from 'checking' compliance to 'enforcing' governance at the runtime layer."
            </p>
          </div>
        </div>
      </section>

      {/* Runtime Flow */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">The Governed Execution Path</h2>
          <p className="text-slate-400 text-lg">Bringing absolute trust to machine-driven governance.</p>
        </div>
        <RuntimeFlow steps={steps} />
      </section>

      {/* Outcomes */}
      <section className="py-20 px-6 bg-panel/30 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Strategic Trust Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-xl bg-panel border border-slate-800 hover:border-accent-blue/30 transition-all">
              <div className="text-4xl font-bold text-accent-blue mb-2">Absolute</div>
              <p className="text-slate-400">Enforcement of operational policies</p>
            </div>
            <div className="p-8 rounded-xl bg-panel border border-slate-800 hover:border-accent-cyan/30 transition-all">
              <div className="text-4xl font-bold text-accent-cyan mb-2">95%</div>
              <p className="text-slate-400">Reduction in strategic risk exposure</p>
            </div>
            <div className="p-8 rounded-xl bg-panel border border-slate-800 hover:border-accent-blue/30 transition-all">
              <div className="text-4xl font-bold text-accent-blue mb-2">Real-time</div>
              <p className="text-slate-400">Audit trace availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Impact */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Total Governance Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-blue mb-2">Compliance & GRC Teams</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Transition from reactive box-checking to defining the execution reality of the enterprise. Policies are enforced automatically at the moment of action.</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-cyan mb-2">Legal & Risk</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Eliminate the ambiguity of AI-era operational risk. Zensorum provides deterministic proof that the enterprise's legal obligations are met during every execution.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-blue mb-2">Security Teams</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Ensure that security controls are not just 'enabled' but are actually active for every machine-assisted data event across the entire infrastructure.</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-cyan mb-2">Corporate Leadership</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Gain the confidence required to scale autonomous operations. Deterministic governance turns operational risk into strategic certainty.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
