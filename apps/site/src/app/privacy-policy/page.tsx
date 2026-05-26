'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, Globe, Bell, ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: ShieldCheck,
      title: "1. Information Collection",
      content: "We collect information necessary to facilitate strategic inquiries and platform evaluations. This includes professional identity data (name, work email, company) provided during contact requests or strategic walkthrough scheduling."
    },
    {
      icon: Lock,
      title: "2. Strategic Inquiry Data",
      content: "Data provided during strategic inquiries is treated with extreme confidentiality. We use this information solely to assess pilot program eligibility, coordinate technical demonstrations, and establish strategic partnership frameworks."
    },
    {
      icon: Eye,
      title: "3. Usage Analytics",
      content: "To improve our infrastructure narrative and evaluator experience, we utilize minimal, enterprise-grade analytics to understand how visitors interact with our architectural documentation and use-case scenarios."
    },
    {
      icon: Globe,
      title: "4. Cookies & Tracking",
      content: "Zensorum utilizes essential cookies to maintain session integrity during evaluation requests. We do not engage in consumer-grade cross-site tracking or invasive behavioral profiling."
    },
    {
      icon: FileText,
      title: "5. Data Retention",
      content: "We retain professional contact data only for the duration required to fulfill strategic objectives or as mandated by regulatory governance standards relevant to mission-critical infrastructure."
    },
    {
      icon: Bell,
      title: "6. Rights & Updates",
      content: "Evaluators and strategic partners retain full rights to their professional data. We provide notification of material updates to our privacy practices through our secure infrastructure channels."
    }
  ];

  return (
    <main className="min-h-screen bg-[#070A0F] text-white">
      <Navbar />

      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#60A5FA] backdrop-blur-xl mb-8">
            <ShieldCheck className="h-4 w-4" />
            Infrastructure Privacy Standards
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">Policy.</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-16 max-w-2xl">
            Our privacy practices are designed for the high-trust requirements of enterprise 
            infrastructure evaluation and strategic operational governance.
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
            <h3 className="text-xl font-bold mb-4">Questions regarding our data practices?</h3>
            <p className="text-gray-400 mb-8">
              For inquiries specifically related to enterprise data confidentiality and infrastructure 
              security standards, please reach out through our strategic contact channel.
            </p>
            <Link href="/contact" className="text-[#60A5FA] font-bold uppercase tracking-widest text-sm hover:text-white transition-all flex items-center gap-2">
              Contact Strategic Team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
