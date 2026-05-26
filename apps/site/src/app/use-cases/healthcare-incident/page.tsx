'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Activity, 
  Bell, 
  MapPin, 
  ShieldAlert, 
  Smartphone, 
  Users, 
  History,
  AlertTriangle,
  Zap,
  Clock,
  ShieldCheck
} from 'lucide-react';
import RuntimeFlow, { FlowStep } from '@/components/RuntimeFlow';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HealthcareIncidentPage() {
  const steps: FlowStep[] = [
    {
      icon: Activity,
      title: "Incident Detected",
      description: "A critical physiological alarm is triggered from a bedside monitoring system.",
      intervention: "Zensorum's event-native architecture captures the high-priority signal with sub-millisecond latency.",
      outcome: "Guaranteed capture of life-critical events across the hospital network."
    },
    {
      icon: Bell,
      title: "Contextual Triage",
      description: "Aggregating the patient's assigned care team, current location, and medical history.",
      intervention: "Zensorum coordinates real-time data enrichment from EHR and staff scheduling systems.",
      outcome: "Establishment of a complete, actionable incident context for rapid response."
    },
    {
      icon: MapPin,
      title: "Emergency Routing",
      description: "Identifying the nearest qualified responders based on real-time location and skill-set.",
      intervention: "The governed runtime evaluates deterministic routing policies to identify the optimal response team.",
      outcome: "Elimination of broadcast alert fatigue; only the right people are notified."
    },
    {
      icon: ShieldAlert,
      title: "Response Coordination",
      description: "Initiating multi-channel alerts across mobile apps, pagers, and central stations.",
      intervention: "Orchestrating atomic notifications; Zensorum ensures alert delivery and manages escalation logic.",
      outcome: "40% reduction in team mobilization time through automated coordination."
    },
    {
      icon: Smartphone,
      title: "Resource Allocation",
      description: "Locking necessary equipment (e.g., crash carts) and prioritizing elevator access.",
      intervention: "Zensorum coordinates execution paths with facility and IoT infrastructure systems.",
      outcome: "Synchronized readiness of both human and physical resources."
    },
    {
      icon: History,
      title: "State Persistence",
      description: "Recording every alert sent, acknowledgment received, and system interaction.",
      intervention: "Zensorum persists the complete incident timeline to a tamper-proof execution log.",
      outcome: "Resilience against communication failures; the incident state is never lost."
    },
    {
      icon: Users,
      title: "Governance Audit",
      description: "Generating a final, immutable report of the incident response for medical-legal review.",
      intervention: "Automatic generation of a cryptographically signed execution trace of the entire coordination flow.",
      outcome: "100% accurate, audit-ready incident documentation available instantly."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070A0F] text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="py-20 px-6 max-w-6xl mx-auto">
        <div className="inline-block px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-medium mb-4 uppercase tracking-widest">
          Healthcare Systems · Critical Trust Infrastructure
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Healthcare Incident Coordination</h1>
        <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
          When life-critical incidents occur, manual alerts and fragmented coordination cost lives. Zensorum provides the governed execution runtime for the next generation of autonomous hospital-wide emergency response.
        </p>
      </header>

      {/* Before Zensorum */}
      <section className="py-20 px-6 bg-panel/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-accent-blue">The Critical Execution Gap</h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-orange-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Uncertain Response Coordination</span>
                  <span className="text-slate-400">Critical alarms lack a deterministic runtime layer, leading to delayed alerts and uncoordinated response teams.</span>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-orange-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Fragmented System Visibility</span>
                  <span className="text-slate-400">Bedside monitoring, mobile alerts, and EHR systems fall out of sync as high-velocity incidents bypass manual status tracking.</span>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-orange-500 mr-4 shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-white">Missing Real-Time Audit Trails</span>
                  <span className="text-slate-400">Reconstructing incident timelines for review is a manual, error-prone process that takes days, creating unacceptable legal risk.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-2xl bg-panel border border-accent-blue/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-24 h-24 text-accent-blue" />
            </div>
            <div className="flex items-center gap-3 mb-6 text-orange-400">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Life-Critical Impact</span>
            </div>
            <p className="text-2xl font-medium leading-snug text-white">
              "In emergency situations, trust is the only metric that matters. Zensorum provides the infrastructure to ensure every critical alert is governed and every response is coordinated."
            </p>
          </div>
        </div>
      </section>

      {/* Runtime Flow */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">The Trust Response Runtime</h2>
          <p className="text-slate-400 text-lg">Guaranteed execution when every second counts.</p>
        </div>
        <RuntimeFlow steps={steps} />
      </section>

      {/* Outcomes */}
      <section className="py-20 px-6 bg-panel/30 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Mission-Critical Trust Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-xl bg-panel border border-slate-800 hover:border-accent-blue/30 transition-all">
              <div className="text-4xl font-bold text-accent-blue mb-2">40%</div>
              <p className="text-slate-400">Reduction in team mobilization time</p>
            </div>
            <div className="p-8 rounded-xl bg-panel border border-slate-800 hover:border-accent-cyan/30 transition-all">
              <div className="text-4xl font-bold text-accent-cyan mb-2">Absolute</div>
              <p className="text-slate-400">Alert delivery assurance</p>
            </div>
            <div className="p-8 rounded-xl bg-panel border border-slate-800 hover:border-accent-blue/30 transition-all">
              <div className="text-4xl font-bold text-accent-blue mb-2">100%</div>
              <p className="text-slate-400">Real-time auditability of incident flows</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Impact */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Total Healthcare Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-blue mb-2">Clinical Staff</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Focus on patient care with the confidence that the underlying runtime handles alert routing and multi-channel notification automatically.</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-cyan mb-2">Risk Management</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Eliminate the uncertainty of incident documentation. Zensorum provides tamper-proof logs for every clinical event and response step.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-blue mb-2">IT Infrastructure</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Provide a unified coordination layer that integrates legacy pagers and modern EHRs into a single source of truth for hospital operations.</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/40 border border-slate-800">
              <h3 className="font-bold text-accent-cyan mb-2">Executive Leadership</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Ensure the hospital's Standard of Care is met at runtime. Governed execution turns healthcare strategy into operational certainty.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
