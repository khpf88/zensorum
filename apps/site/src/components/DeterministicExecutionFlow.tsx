'use client';

import { motion } from 'framer-motion';
import { Shield, GitBranch, Terminal, RefreshCw, Eye } from 'lucide-react';

export default function DeterministicExecutionFlow() {
  const steps = [
    { 
      name: "1. Lab Result Detected", 
      userAction: "Scientist receives instant alert", 
      techPlane: "Event Trigger", 
      icon: Terminal 
    },
    { 
      name: "2. Rule Validation", 
      userAction: "System confirms protocol compliance", 
      techPlane: "Governance Enforcement", 
      icon: Shield 
    },
    { 
      name: "3. Coordinated Update", 
      userAction: "Records updated across all systems", 
      techPlane: "Atomic Execution", 
      icon: GitBranch 
    },
    { 
      name: "4. State Recovery", 
      userAction: "System heals if a connection drops", 
      techPlane: "Deterministic Replay", 
      icon: RefreshCw 
    },
    { 
      name: "5. Audit Ready", 
      userAction: "Complete report generated", 
      techPlane: "Causal Lineage Record", 
      icon: Eye 
    }
  ];

  return (
    <div className="py-12">
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <motion.div 
            key={step.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-2xl border border-white/10 bg-[#0E141C] hover:border-[#3B82F6]/30 transition-all"
          >
            <div className="md:col-span-1 flex justify-center">
              <step.icon className="h-8 w-8 text-[#60A5FA]" />
            </div>
            <div className="md:col-span-6">
              <h4 className="font-semibold text-lg">{step.name}</h4>
              <p className="text-sm text-gray-300 italic">User View: {step.userAction}</p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#60A5FA] font-bold bg-[#3B82F6]/10 px-3 py-1 rounded-full">
                {step.techPlane}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
