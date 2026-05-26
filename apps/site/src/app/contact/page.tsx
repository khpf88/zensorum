'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send,
  Building2,
  Mail,
  User,
  MessageSquare,
  Globe,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Loader2
} from "lucide-react";
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: 'Select Industry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#070A0F] text-white">
      <Navbar />

      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3B82F6]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#22D3EE]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#60A5FA] backdrop-blur-xl mb-8">
                <Sparkles className="h-4 w-4" />
                Strategic Walkthrough
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                Request Early <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">Platform Access.</span>
              </h1>
              <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-xl">
                Schedule a strategic walkthrough of Zensorum. We'll explore how governed execution 
                can transform your critical operational paths.
              </p>

              <div className="mt-16 space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="h-12 w-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-6 w-6 text-[#60A5FA]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold mb-2">Governance Proof</div>
                    <p className="text-sm text-gray-400 leading-relaxed">Demonstrate how Zensorum enforces your specific business rules at the runtime layer.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="h-12 w-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                    <Zap className="h-6 w-6 text-[#60A5FA]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold mb-2">Operational Recovery</div>
                    <p className="text-sm text-gray-400 leading-relaxed">Explore deterministic replay and self-healing execution paths for complex workflows.</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border border-white/10 bg-[#0E141C] p-10 shadow-2xl relative z-10"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Request Received.</h2>
                    <p className="text-gray-400 leading-relaxed">
                      Our strategy team has been notified. We will reach out to schedule your 
                      Zensorum walkthrough shortly.
                    </p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-10 text-[#3B82F6] font-bold text-sm uppercase tracking-widest hover:text-[#60A5FA] transition-colors"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <input 
                            required
                            type="text" 
                            placeholder="John Doe" 
                            className="w-full bg-[#070A0F] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#3B82F6]/50 focus:outline-none transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Work Email</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <input 
                            required
                            type="email" 
                            placeholder="john@company.com" 
                            className="w-full bg-[#070A0F] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#3B82F6]/50 focus:outline-none transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Company</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <input 
                            type="text" 
                            placeholder="Enterprise Inc." 
                            className="w-full bg-[#070A0F] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#3B82F6]/50 focus:outline-none transition-all"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Industry</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <select 
                            className="w-full bg-[#070A0F] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#3B82F6]/50 focus:outline-none transition-all appearance-none text-gray-400"
                            value={formData.industry}
                            onChange={(e) => setFormData({...formData, industry: e.target.value})}
                          >
                            <option>Select Industry</option>
                            <option>Life Sciences</option>
                            <option>Healthcare</option>
                            <option>Finance</option>
                            <option>Manufacturing</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message / Goals</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-6 h-4 w-4 text-gray-500" />
                        <textarea 
                          rows={4} 
                          placeholder="What are your specific operational governance goals?" 
                          className="w-full bg-[#070A0F] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#3B82F6]/50 focus:outline-none transition-all resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="w-full rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] py-5 font-bold text-white shadow-xl shadow-[#3B82F6]/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        <>Processing... <Loader2 className="h-4 w-4 animate-spin" /></>
                      ) : (
                        <>Submit Request <Send className="h-4 w-4" /></>
                      )}
                    </button>

                    {status === 'error' && (
                      <p className="text-center text-red-500 text-xs font-bold uppercase tracking-widest">
                        Submission failed. Please try again.
                      </p>
                    )}

                    <p className="text-center text-[10px] text-gray-600 font-medium uppercase tracking-widest">
                      Secure Strategic Partnership Inquiry
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
