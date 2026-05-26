'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Scale, ShieldAlert, Gavel, Cpu, Zap, Activity } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      icon: Cpu,
      title: "1. Platform Overview",
      content: "Zensorum is a governed operational coordination layer designed for enterprise infrastructure evaluation. These terms govern the strategic assessment and discovery phases of platform engagement."
    },
    {
      icon: ShieldAlert,
      title: "2. Acceptable Evaluation",
      content: "Evaluators agree to utilize the platform's architectural documentation and demonstration environments for legitimate strategic assessment and pilot program coordination only."
    },
    {
      icon: Scale,
      title: "3. Intellectual Property",
      content: "All architectural patterns, deterministic logic models, and governed execution frameworks presented are the exclusive property of Zensorum AI. Evaluation does not confer ownership or license rights."
    },
    {
      icon: Zap,
      title: "4. No Production Guarantees",
      content: "Demonstration environments and evaluation threads are provided for strategic proof-of-concept purposes. Zensorum makes no production-grade availability guarantees during the evaluation phase."
    },
    {
      icon: Gavel,
      title: "5. Forward-Looking Statements",
      content: "Our strategic roadmap and vision for autonomous enterprise operations may contain forward-looking statements. These represent our strategic intent and are subject to infrastructure evolution."
    },
    {
      icon: Activity,
      title: "6. Strategic Discovery",
      content: "Terms related to full-scale enterprise deployment, pilot implementation, and system integration are governed by separate master services agreements and strategic partnership frameworks."
    }
  ];

  return (
    <main className="min-h-screen bg-[#070A0F] text-white">
      <Navbar />

      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#60A5FA] backdrop-blur-xl mb-8">
            <Scale className="h-4 w-4" />
            Strategic Evaluation Terms
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">Service.</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-16 max-w-2xl">
            These terms define the professional standards for platform evaluation, 
            strategic inquiry, and architectural assessment of the Zensorum infrastructure.
          </p>

          <div className="space-y-12">
            {sections.map((section, idx) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group"
              >
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0 border border-[#3B82F6]/20">
                    <section.icon className="h-6 w-6 text-[#60A5FA]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-[#60A5FA] transition-colors">{section.title}</h2>
                    <p className="text-gray-400 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">Strategic Framework Agreements</h3>
            <p className="text-gray-400 mb-8">
              Entities moving beyond discovery toward pilot implementation or enterprise-wide 
              integration will be subject to custom master services agreements.
            </p>
            <a href="/contact" className="text-[#60A5FA] font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
              Initiate Strategic Agreement Discovery
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
