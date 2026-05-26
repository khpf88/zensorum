import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface FlowStep {
  icon: LucideIcon;
  title: string;
  description: string;
  intervention: string;
  outcome: string;
}

interface RuntimeFlowProps {
  steps: FlowStep[];
}

const RuntimeFlow: React.FC<RuntimeFlowProps> = ({ steps }) => {
  return (
    <div className="relative max-w-4xl mx-auto py-12 px-4">
      {/* Vertical Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-slate-800 top-0 hidden md:block" />

      <div className="space-y-16">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isEven = index % 2 === 0;

          return (
            <div key={index} className="relative flex flex-col md:flex-row items-center md:items-start group">
              {/* Step Indicator / Icon Circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-panel border border-slate-700 group-hover:border-accent-blue transition-colors duration-300">
                <Icon className="w-6 h-6 text-accent-cyan" />
              </div>

              {/* Mobile Icon */}
              <div className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-panel border border-slate-700 mb-4">
                <Icon className="w-5 h-5 text-accent-cyan" />
              </div>

              {/* Content Panels */}
              <div className={`flex flex-col md:flex-row w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-24`}>
                {/* Left/Right content side */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 mb-4">{step.description}</p>
                </div>

                {/* Intervention and Outcome side */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="p-4 rounded-lg bg-slate-900/50 border border-accent-blue/20 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-blue block mb-1">Zensorum Intervention</span>
                    <p className="text-sm text-slate-300">{step.intervention}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent-cyan/5 border border-accent-cyan/20">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan block mb-1">Outcome</span>
                    <p className="text-sm text-slate-300">{step.outcome}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RuntimeFlow;
