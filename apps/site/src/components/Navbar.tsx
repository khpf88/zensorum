'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Why Now", href: "/#why-now" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Capabilities", href: "/#capabilities" },
    { name: "Industries", href: "/#industries" },
    { name: "Use Cases", href: "/use-cases" },
    { name: "Architecture", href: "/#architecture" },
    { name: "Operational Trust", href: "/#trust" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled 
          ? 'border-white/10 bg-[#070A0F]/90 backdrop-blur-xl py-3' 
          : 'border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] transition-transform group-hover:scale-105" />
            <div>
              <div className="text-lg font-semibold tracking-wide text-white leading-tight">Zensorum</div>
              <div className="hidden sm:block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Governed Infrastructure</div>
            </div>
          </Link>
        </div>

        {/* Desktop Nav - Right Aligned */}
        <div className="hidden xl:flex items-center gap-12">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[11px] text-gray-400 font-bold uppercase tracking-wider hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Toggle visible on smaller screens */}
        <button 
          className="xl:hidden text-gray-400 hover:text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#0E141C] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-gray-400 font-bold uppercase tracking-wider hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5">
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-[#3B82F6] uppercase tracking-wider"
                >
                  Strategic Inquiry
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
