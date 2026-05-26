'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import { motion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  BrainCircuit,
  Database,
  FlaskConical,
  HeartPulse,
  Building2,
  ScanSearch,
  Sparkles,
  Cpu,
  RefreshCw,
  Route,
  Scale,
  LockKeyhole,
  Radar,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Zap,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Boxes,
  Microscope,
  Workflow,
  Search,
  Layers,
  FileSearch,
  History
} from "lucide-react";
import Link from 'next/link';

export default function Page() {
  const evolutionDrivers = [
    {
      title: "AI & Autonomous Agents",
      desc: "Enterprises are deploying AI agents that take operational actions, requiring a new layer of execution governance.",
      icon: BrainCircuit
    },
    {
      title: "Autonomous Workflows",
      desc: "Machine-driven coordination is replacing static logic, making manual compliance gating impossible to scale.",
      icon: Workflow
    },
    {
      title: "Cross-System Automation",
      desc: "Critical actions now span dozens of fragmented APIs, creating unprecedented levels of coordination complexity.",
      icon: Boxes
    },
    {
      title: "Real-Time Decisioning",
      desc: "Operational decisions are moving to sub-second runtimes, where delay equals failure and uncertainty equals risk.",
      icon: Zap
    }
  ];

  const trustPillars = [
    { title: "Governance Certainty", desc: "Turn passive policies into active execution reality at the point of action.", icon: LockKeyhole },
    { title: "Execution Consistency", desc: "Identity-aware operations that run identically across any infrastructure.", icon: RefreshCw },
    { title: "Total Traceability", desc: "Immutable audit traces with cryptographic proof for every machine action.", icon: History },
    { title: "Operational Resilience", desc: "Self-healing paths that preserve state across system-wide failures.", icon: ShieldCheck }
  ];

  const architecturePillars = [
    { icon: Zap, title: "Event Ingestion", desc: "Real-time capture of operational signals across the enterprise." },
    { icon: Search, title: "Context Enrichment", desc: "Dynamic aggregation of multi-system state and identity." },
    { icon: Scale, title: "Policy Evaluation", desc: "Declarative policy runtime for pre-execution validation." },
    { icon: ShieldCheck, title: "Governance Validation", desc: "Atomic gating of operational actions based on rules." },
    { icon: Route, title: "Execution Coordination", desc: "Deterministic orchestration across fragmented APIs." },
    { icon: Database, title: "State Persistence", desc: "Immutable recording of every operational decision point." },
    { icon: RefreshCw, title: "Replay & Recovery", desc: "Deterministic recovery of failed execution paths." },
    { icon: FileSearch, title: "Operational Traceability", desc: "Real-time audit lineage with cryptographic proof." }
  ];

  const simplifiedLifecycle = [
    {
      step: "01",
      title: "Signal",
      desc: "Capture triggers from AI agents, APIs, or human actions."
    },
    {
      step: "02",
      title: "Context",
      desc: "Automatically enrich the execution thread with cross-enterprise data."
    },
    {
      step: "03",
      title: "Governance",
      desc: "Pre-validate every action against policy runtime before execution."
    },
    {
      step: "04",
      title: "Coordination",
      desc: "Orchestrate consistent execution across fragmented infrastructure."
    },
    {
      step: "05",
      title: "Result",
      desc: "Persist a tamper-proof audit trace of the entire operational flow."
    }
  ];

  const runtimeCapabilities = [
    {
      icon: Activity,
      title: "Operational Ingestion",
      desc: "Capture every signal and trigger across your entire enterprise infrastructure in real-time."
    },
    {
      icon: BrainCircuit,
      title: "Smart Context",
      desc: "Automatically attach identity, execution metadata, and historical context to every action."
    },
    {
      icon: ShieldCheck,
      title: "Runtime Policy Enforcement",
      desc: "Automatically evaluate and enforce complex business rules before any operation executes."
    },
    {
      icon: Scale,
      title: "Continuous Governance",
      desc: "Ensure every operational step remains compliant with internal controls and global regulations."
    },
    {
      icon: Route,
      title: "Governed Path Coordination",
      desc: "Coordinate complex multi-system pathways with deterministic logic and safety gates."
    },
    {
      icon: Database,
      title: "Shared Operational State",
      desc: "Maintain a single, consistent source of truth across systems, teams, and human approvals."
    },
    {
      icon: RefreshCw,
      title: "Automated Recovery",
      desc: "Identify execution failures and manage deterministic state recovery without manual intervention."
    },
    {
      icon: Radar,
      title: "Total Traceability",
      desc: "Maintain a complete, immutable audit record of every operational decision and system action."
    }
  ];

  const outcomes = [
    { label: "Operational Risk", value: "Eliminated", desc: "Governance is embedded into the execution path." },
    { label: "Execution Trust", value: "Absolute", desc: "Every action is pre-validated with Human-in-the-loop overrides." },
    { label: "Audit Effort", value: "Zero", desc: "Audit-grade traceability with cryptographically signed traces." },
    { label: "Recovery Time", value: "<1s", desc: "Self-healing operations through deterministic state persistence." }
  ];

  const useCases = [
    {
      icon: FlaskConical,
      industry: "Life Sciences",
      title: "Clinical Workflow Coordination",
      slug: "clinical-workflow",
      desc: "Govern lab approvals and protocol escalations with deterministic execution paths."
    },
    {
      icon: HeartPulse,
      industry: "Healthcare",
      title: "Regulated Incident Coordination",
      slug: "healthcare-incident",
      desc: "Manage life-critical incidents with sub-second coordination and full audit lineage."
    },
    {
      icon: Building2,
      industry: "Enterprise Operations",
      title: "Cross-System Execution",
      slug: "enterprise-operations",
      desc: "Coordinate complex procurement and operational approvals across fragmented ERPs."
    },
    {
      icon: ScanSearch,
      industry: "Compliance Environments",
      title: "Runtime Governance",
      slug: "compliance-governance",
      desc: "Enforce regulatory policies during execution instead of relying on post-audit reviews."
    }
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070A0F] text-white">
      {/* BACKGROUND */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(34,211,238,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <Navbar />

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#60A5FA] backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4" />
              Governed Operational Infrastructure
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight"
            >
              The Trust Layer for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">Autonomous Operations.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 max-w-xl text-xl md:text-2xl leading-relaxed text-gray-400"
            >
              Zensorum provides the foundational infrastructure to coordinate operations across AI agents, fragmented systems, and mission-critical workflows with absolute strategic certainty.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-col sm:flex-row gap-5"
            >
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-8 py-5 font-bold text-white shadow-2xl shadow-[#3B82F6]/30 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                Schedule a Strategic Walkthrough
              </Link>
              <Link 
                href="#architecture" 
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-8 py-5 text-gray-300 font-bold hover:bg-white/10 transition-all whitespace-nowrap"
              >
                View Runtime Architecture
              </Link>
            </motion.div>
          </div>

          {/* HERO VISUAL */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mt-12 lg:mt-0 overflow-hidden"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3B82F6]/10 to-[#22D3EE]/5 blur-3xl" />
            <div className="relative rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 p-4 md:p-8 backdrop-blur-xl max-w-full">
              <div className="text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] text-gray-400 font-bold text-center">Execution Governance Infrastructure</div>
              <div className="mt-6 md:mt-10 grid grid-cols-2 gap-3 md:gap-4">
                {["AI Agent Commands", "Human Approvals", "System Triggers", "Autonomous Workflows"].map((item) => (
                  <div key={item} className="rounded-lg md:rounded-xl border border-white/10 bg-[#0E141C] p-3 md:p-4 text-center text-[10px] md:text-sm font-medium text-gray-300">
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex justify-center py-4 md:py-6">
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-[#3B82F6]">
                  <ArrowRight className="rotate-90 h-4 w-4 md:h-6 md:w-6" />
                </motion.div>
              </div>
              <div className="rounded-xl md:rounded-2xl border border-[#3B82F6]/30 bg-[#101A28] p-4 md:p-6 shadow-2xl">
                <div className="text-center font-bold text-[#60A5FA] uppercase tracking-wider text-[10px] md:text-xs mb-4 md:mb-6">Governed Operational Path</div>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {["Policy Evaluation", "Context Enrichment", "State Persistence", "Coordination Logic"].map((item) => (
                    <div key={item} className="rounded-lg bg-[#0B111A] p-2 md:p-3 text-center text-[8px] md:text-[10px] font-bold text-gray-400 border border-white/5">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center py-4 md:py-6">
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="text-[#3B82F6]">
                  <ArrowRight className="rotate-90 h-4 w-4 md:h-6 md:w-6" />
                </motion.div>
              </div>
              <div className="rounded-lg md:rounded-xl border border-[#22D3EE]/20 bg-[#0E141C] p-3 md:p-4 text-center text-[10px] md:text-xs font-bold text-gray-300">
                Trusted, Deterministic Operational Results
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STRATEGIC FRAMING */}
      <section className="relative z-10 border-t border-white/10 py-24 bg-[#070A0F]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-300">
              AI agents can generate actions. Autonomous systems can trigger workflows. 
              But enterprises still lack <span className="text-white font-semibold">governed operational infrastructure</span> capable 
              of ensuring deterministic, policy-aligned execution at runtime.
            </h2>
          </div>
        </div>
      </section>

      {/* WHY NOW - EVOLUTION OF OPS */}
      <section id="why-now" className="relative z-10 border-t border-white/10 py-32 bg-[#090D14]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <h2 className="text-sm uppercase tracking-[0.25em] text-[#3B82F6] font-bold">The Evolution of Enterprise Operations</h2>
            <h3 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">Why governed execution is now inevitable.</h3>
            <p className="mt-6 text-xl text-gray-400 leading-relaxed">
              Existing enterprise infrastructure was never designed to govern autonomous execution. 
              As enterprises move from manual workflows to AI-assisted operations, the need for a 
              deterministic governance layer becomes mission-critical.
            </p>
          </div>
          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {evolutionDrivers.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group rounded-2xl border border-white/10 bg-[#0E141C] p-8 hover:border-[#3B82F6]/30 transition-all">
                  <Icon className="h-8 w-8 text-[#60A5FA] mb-6" />
                  <div className="text-xl font-semibold mb-4">{item.title}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* THE FLOW MODEL (SIGNAL -> RESULT) */}
      <section id="how-it-works" className="relative z-10 border-t border-white/10 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-sm uppercase tracking-[0.25em] text-[#3B82F6] font-bold">The Operational Lifecycle</h2>
            <h3 className="mt-6 text-4xl font-semibold">The Blueprint for Governed Execution.</h3>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent hidden lg:block" />
            <div className="grid lg:grid-cols-5 gap-8">
              {simplifiedLifecycle.map((item, idx) => (
                <div key={item.title} className="relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-[#0E141C] p-8 text-center hover:border-[#3B82F6]/50 transition-all group"
                  >
                    <div className="text-4xl font-bold text-[#3B82F6]/20 group-hover:text-[#3B82F6]/40 transition-colors mb-4">{item.step}</div>
                    <div className="text-xl font-bold mb-4">{item.title}</div>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* CAPABILITIES */}
      <section id="capabilities" className="relative z-10 border-t border-white/10 py-32 bg-[#090D14]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <h2 className="text-sm uppercase tracking-[0.25em] text-[#22D3EE] font-bold">Infrastructure Capabilities</h2>
            <h3 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">Foundational governance for the autonomous enterprise.</h3>
          </div>
          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ...runtimeCapabilities,
              { icon: ShieldCheck, title: "Runtime Policy Enforcement", desc: "Evaluate and enforce complex business rules in real-time before any operation is committed." },
              { icon: Database, title: "Immutable Operational Lineage", desc: "Maintain a tamper-proof event log of every operational decision with full cryptographic proof." },
              { icon: RefreshCw, title: "Deterministic Replay", desc: "Recover system state with absolute certainty through governed event replay and state reconciliation." },
              { icon: Zap, title: "Autonomous Gating", desc: "Coordinate and gate actions across fragmented APIs and agents with sub-millisecond latency." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={`${item.title}-${idx}`} className="group rounded-2xl border border-white/10 bg-[#0E141C] p-6 hover:bg-[#101A28] transition-all">
                  <Icon className="h-7 w-7 text-[#3B82F6] mb-5" />
                  <div className="text-lg font-semibold mb-3 group-hover:text-[#60A5FA] transition-colors">{item.title}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className="relative z-10 border-t border-white/10 py-32 bg-[#070A0F]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div id="industries" className="max-w-2xl">
              <h2 className="text-sm uppercase tracking-[0.25em] text-[#3B82F6] font-bold">Mission-Critical Scenarios</h2>
              <h3 className="mt-6 text-4xl md:text-5xl font-semibold">Where operational failure is not an option.</h3>
            </div>
            <Link href="/use-cases" className="text-[#60A5FA] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All Case Studies <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={`/use-cases/${item.slug}`} className="block group">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:border-[#3B82F6]/50 hover:bg-white/[0.07]">
                    <div className="flex items-center gap-3 text-[#60A5FA] mb-6">
                      <Icon className="h-6 w-6" />
                      <div className="text-xs uppercase tracking-[0.2em] font-bold">{item.industry}</div>
                    </div>
                    <div className="text-2xl font-semibold group-hover:text-[#60A5FA] transition-colors mb-4">{item.title}</div>
                    <p className="text-gray-400 leading-relaxed mb-8">{item.desc}</p>
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-[#3B82F6] group-hover:gap-3 transition-all">
                      Analyze Execution Path <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPERATIONAL TRUST */}
      <section id="trust" className="relative z-10 border-t border-white/10 py-32 bg-[#090D14]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl mb-20">
            <h2 className="text-sm uppercase tracking-[0.25em] text-[#22D3EE] font-bold">Operational Trust</h2>
            <h3 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">Bring trust to machine-assisted operations.</h3>
            <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-3xl">
              Executives buy confidence, not just technology. Zensorum ensures that every operational action—whether triggered by AI or human—is pre-validated, observable, and strategically aligned.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-[#3B82F6]/30 transition-all group"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-[#60A5FA]" />
                  </div>
                  <div className="text-xl font-semibold mb-3">{item.title}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLATFORM OUTCOMES STRIP */}
      <section className="relative z-10 border-t border-white/10 py-16 bg-[#070A0F] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
            {[
              "Reduced Operational Uncertainty",
              "Faster Coordinated Response",
              "Lower Governance Exposure",
              "Deterministic Operational Visibility",
              "Runtime Execution Assurance"
            ].map((outcome) => (
              <div key={outcome} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-gray-400 whitespace-nowrap">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE SECTION */}
      <section id="architecture" className="relative z-10 border-t border-white/10 py-32 bg-[#070A0F]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-sm uppercase tracking-[0.25em] text-[#3B82F6] font-bold">Runtime Architecture</h2>
            <h3 className="mt-6 text-4xl md:text-5xl font-semibold">The Infrastructure of Governed Execution.</h3>
            <p className="mt-6 text-xl text-gray-400">
              Unlike traditional workflow engines that rely on static post-hoc audit, Zensorum is a 
              <strong>deterministic execution runtime</strong> that evaluates and governs operations in real-time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {architecturePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  key={pillar.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-2xl border border-white/5 bg-[#0E141C] p-6 hover:border-[#3B82F6]/20 transition-all"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5 text-[#60A5FA]" />
                  </div>
                  <div className="text-lg font-bold mb-3">{pillar.title}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-20 p-8 rounded-3xl border border-[#3B82F6]/20 bg-[#101A28] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Cpu className="h-32 w-32 text-[#3B82F6]" />
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-2xl font-bold mb-6">Deterministic Operational Intelligence</h4>
                <p className="text-gray-300 leading-relaxed">
                  Zensorum transforms fragmented system events into a single, governed operational path. 
                  By persisting execution state at every decision point, we enable <strong>absolute recoverability</strong> 
                  and <strong>immutable audit lineage</strong> for the most sensitive enterprise operations.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#070A0F] p-8 font-mono text-xs text-[#60A5FA]/80">
                <div className="mb-4 text-gray-500">// Zensorum Runtime Logic</div>
                <div className="space-y-2">
                  <div>capture_signal(trigger_event)</div>
                  <div>enrich_context(identity, meta, state)</div>
                  <div className="text-white font-bold">validate_governance(policy_runtime)</div>
                  <div>coordinate_path(downstream_actions)</div>
                  <div>persist_lineage(execution_trace)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="relative z-10 border-t border-white/10 py-32 bg-[#090D14]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm uppercase tracking-[0.25em] text-[#22D3EE] font-bold">Strategic Differentiation</h2>
            <h3 className="mt-6 text-4xl font-semibold">Static Automation vs. Governed Execution.</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="bg-[#0E141C] p-12">
              <div className="text-2xl font-semibold mb-8 text-gray-400">Traditional Workflow Systems</div>
              <ul className="space-y-6">
                {[
                  "Automate predefined tasks",
                  "Rely on static, rigid logic",
                  "Perform post-execution governance",
                  "Provide limited, manual recovery",
                  "Fragmented operational visibility"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-500">
                    <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#101A28] p-12 relative">
              <div className="absolute top-0 right-0 p-6">
                <div className="bg-[#3B82F6]/20 text-[#60A5FA] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-[#3B82F6]/30">The AI-Era Standard</div>
              </div>
              <div className="text-2xl font-semibold mb-8 text-white">Zensorum Governed Execution</div>
              <ul className="space-y-6">
                {[
                  "Governs execution BEFORE actions occur",
                  "Continuously evaluates operational context",
                  "Coordinates systems & agents dynamically",
                  "Enables deterministic replay & recovery",
                  "Provides immutable execution awareness"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-200">
                    <CheckCircle2 className="h-5 w-5 text-[#22D3EE] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="relative z-10 border-t border-white/10 py-32 bg-[#070A0F]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm uppercase tracking-[0.25em] text-[#3B82F6] font-bold">Strategic Outcomes</h2>
            <h3 className="mt-6 text-4xl font-semibold">Transforming operational uncertainty into trust.</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {outcomes.map((item) => (
              <div key={item.label} className="text-center p-8 rounded-2xl border border-white/10 bg-[#0E141C] hover:border-[#3B82F6]/20 transition-all">
                <div className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-4">{item.label}</div>
                <div className="text-4xl font-bold text-white mb-4">{item.value}</div>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="relative z-10 border-t border-white/10 py-32 bg-[#090D14]">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="text-sm uppercase tracking-[0.25em] text-[#22D3EE] font-bold">The Vision</div>
          <h2 className="mt-8 text-5xl md:text-6xl font-semibold leading-tight">
            The Trust Layer for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">Autonomous Enterprise.</span>
          </h2>
          <p className="mt-10 text-2xl leading-relaxed text-gray-400">
            Zensorum is building the infrastructure for a future where enterprise operations are autonomous but remain perfectly governed, observable, and trustworthy.
          </p>
          <div className="mt-16">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white text-black px-10 py-5 font-bold hover:bg-gray-200 transition-all text-lg shadow-2xl shadow-white/10 whitespace-nowrap">
              Schedule a Strategic Walkthrough
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
