'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#05080D] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#22D3EE]" />
              <div className="text-2xl font-bold text-white">Zensorum</div>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed mb-8 text-sm">
              Governed execution infrastructure for AI-era enterprise operations. 
              Bringing deterministic coordination to fragmented distributed systems.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">LinkedIn</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-medium uppercase tracking-widest">GitHub</a>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-white mb-6">Platform</div>
            <ul className="space-y-4 text-[13px] text-gray-500 font-medium">
              <li><Link href="/#why-now" className="hover:text-white transition-colors">Why Now</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/#architecture" className="hover:text-white transition-colors">Architecture</Link></li>
              <li><Link href="/#trust" className="hover:text-white transition-colors">Operational Trust</Link></li>
              <li><Link href="/use-cases" className="hover:text-white transition-colors">Use Cases</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-white mb-6">Legal & Strategic</div>
            <ul className="space-y-4 text-[13px] text-gray-500 font-medium">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Strategic Inquiry</Link></li>
            </ul>
            <div className="mt-10">
              <div className="text-[10px] text-gray-600 mb-4 uppercase tracking-widest font-bold">Finalizing Autonomous Operations?</div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-[#60A5FA] hover:gap-3 transition-all uppercase tracking-wider group">
                Schedule a Strategic Walkthrough <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-medium uppercase tracking-widest">
          <div>© {new Date().getFullYear()} Zensorum. Governed Operational Coordination Infrastructure.</div>
          <div className="flex items-center gap-8">
            <Link href="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-gray-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
