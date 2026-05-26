'use client';

import { motion } from "framer-motion";
import { 
  FlaskConical, 
  HeartPulse, 
  Building2, 
  ScanSearch, 
  ArrowRight,
  Activity,
  CheckCircle2
} from "lucide-react";
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function UseCasesPage() {
  const industries = [
    {
      icon: FlaskConical,
      name: "Life Sciences",
      title: "Clinical Workflow Coordination",
      slug: "clinical-workflow",
      desc: "Coordinate lab approvals, protocol deviations, and trial escalations with absolute deterministic certainty.",
      outcomes: ["90% reduction in coordination overhead", "100% protocol adherence", "Audit-ready execution traces"]
    },
    {
      icon: HeartPulse,
      name: "Healthcare",
      title: "Regulated Incident Coordination",
      slug: "healthcare-incident",
      desc: "Manage life-critical incidents with sub-second coordination, multi-channel alerting, and full audit lineage.",
      outcomes: ["40% faster team mobilization", "Zero missed critical alerts", "Real-time medical-legal compliance"]
    },
    {
      icon: Building2,
      name: "Global Enterprise",
      title: "Cross-System Operational Execution",
      slug: "enterprise-operations",
      desc: "Coordinate procurement, finance, and supply chain operations across fragmented ERPs and autonomous agents.",
      outcomes: ["75% reduction in manual reconciliation", "Elimination of 'maverick' spending", "Atomic system consistency"]
    },
    {
      icon: ScanSearch,
      name: "Governance & Risk",
      title: "Compliance Governance Automation",
      slug: "compliance-governance",
      desc: "Enforce regulatory policies at the runtime layer, moving from reactive box-checking to execution reality.",
      outcomes: ["95% reduction in audit response time", "Zero post-hoc remediation", "Declarative policy enforcement"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#070A0F] text-white">
      <Navbar />

      {/* HERO */}
      <section className="py-24 px-6 border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.05),transparent_40%)]">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#60A5FA] backdrop-blur-xl mb-8">
            <Activity className="h-4 w-4" />
            Operational Execution Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight max-w-4xl">
            Real-World Governed <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">Execution Paths.</span>
          </h1>
          <p className="mt-8 text-xl text-gray-400 max-w-2xl leading-relaxed">
            Explore how Zensorum transforms fragmented system events into governed operational results across regulated industries.
          </p>
        </div>
      </section>

      {/* USE CASES GRID */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {industries.map((industry, idx) => {
              const Icon = industry.icon;
              return (
                <motion.div 
                  key={industry.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/use-cases/${industry.slug}`} className="group block h-full">
                    <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-10 transition-all hover:border-[#3B82F6]/50 hover:bg-white/[0.07] flex flex-col shadow-2xl shadow-black/50">
                      <div className="flex items-center gap-4 text-[#60A5FA] mb-8">
                        <div className="h-12 w-12 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-xs font-bold uppercase tracking-[0.2em]">{industry.name}</div>
                      </div>
                      <h2 className="text-3xl font-bold mb-6 group-hover:text-[#60A5FA] transition-colors">{industry.title}</h2>
                      <p className="text-gray-400 leading-relaxed mb-8 flex-grow">{industry.desc}</p>
                      
                      <div className="space-y-3 mb-10">
                        {industry.outcomes.map(outcome => (
                          <div key={outcome} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                            <CheckCircle2 className="h-4 w-4 text-[#22D3EE]" />
                            {outcome}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-bold text-[#3B82F6] group-hover:gap-4 transition-all uppercase tracking-widest">
                        Explore Execution Path <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STRATEGIC FOOTER CTA */}
      <section className="py-32 px-6 border-t border-white/10 bg-[#090D14]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Don't see your industry?</h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Zensorum's governed execution layer is designed for any enterprise spanning complex, 
            multi-system operational coordination. Let's design your specific path.
          </p>
          <Link href="/contact" className="rounded-xl bg-[#3B82F6] px-10 py-5 font-bold text-white shadow-2xl shadow-[#3B82F6]/20 transition-all hover:bg-[#2563EB]">
            Design a Strategic Walkthrough
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
