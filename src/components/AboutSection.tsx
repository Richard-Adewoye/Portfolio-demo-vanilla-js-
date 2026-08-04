import React, { useState } from 'react';
import { 
  User, 
  Lightbulb, 
  Cpu, 
  Heart, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Sparkles,
  Target
} from 'lucide-react';
import { ProfileData } from '../types';

interface AboutSectionProps {
  profile: ProfileData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'philosophy' | 'approach'>('story');

  const principles = [
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: "Performance First",
      desc: "Every millisecond counts. I optimize bundle sizes, leverage code-splitting, and streamline web vitals for instantaneous page loads."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      title: "Accessible & Human-Centric",
      desc: "Software is for everyone. I build WCAG AA compliant interfaces with full keyboard navigation and screen-reader support."
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      title: "Clean Modular Systems",
      desc: "I write maintainable, well-documented TypeScript code with strong type safety and predictable state management."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      title: "AI-Augmented Workflows",
      desc: "Harnessing modern LLM APIs to build intelligent software capabilities, smart autocomplete, and generative features."
    }
  ];

  return (
    <section id="about" className="py-20 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-xs font-mono text-indigo-300">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Driven by curiosity, powered by clean architecture.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A look inside my engineering journey, principles, and software development approach.
          </p>
        </div>

        {/* Tab Navigation & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Tab Buttons & Quick Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tabs */}
            <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-1">
              {[
                { id: 'story', label: 'My Background Story', icon: User },
                { id: 'philosophy', label: 'Engineering Philosophy', icon: Lightbulb },
                { id: 'approach', label: 'Tech Stack & Process', icon: Target },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                      active
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Profile Bio Box */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
              <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">Quick Details</h4>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium text-slate-200">{profile.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Primary Specialization</span>
                  <span className="font-medium text-slate-200">Full Stack & UI Systems</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Education</span>
                  <span className="font-medium text-slate-200">UC Berkeley (B.S. CS)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Direct Email</span>
                  <a href={`mailto:${profile.email}`} className="font-mono text-cyan-400 hover:underline">{profile.email}</a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Story Body */}
          <div className="lg:col-span-7 space-y-8">
            
            {activeTab === 'story' && (
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-5 animate-fadeIn">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>Building Software That Matters</span>
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {profile.bio}
                </p>
                <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                  Over the past six years, I have worked with early-stage startups and high-growth enterprise teams to launch consumer web products, internal developer tools, and micro-frontend design systems. My focus is on creating web software that is not only visually polished but blazingly fast and reliable under heavy traffic.
                </p>
                
                <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>TypeScript Advocate</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Component Driven Design</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>REST & GraphQL APIs</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Micro-Frontend Scaling</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 animate-fadeIn">
                <h3 className="text-2xl font-bold text-white">
                  My Core Engineering Principles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {principles.map((p, i) => (
                    <div key={i} className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 font-semibold text-white text-sm">
                        {p.icon}
                        <span>{p.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'approach' && (
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-5 animate-fadeIn">
                <h3 className="text-2xl font-bold text-white">
                  Development Process & Quality Gates
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  I follow a rigorous, predictable workflow from initial design requirements to continuous automated deployment:
                </p>
                <ol className="space-y-3 pl-2">
                  {[
                    { step: "01", title: "Discovery & System Architecture", desc: "Define component boundaries, data models, state flow, and API endpoints." },
                    { step: "02", title: "Pixel-Perfect Prototyping", desc: "Build modular, accessible React components with Tailwind CSS styling tokens." },
                    { step: "03", title: "Type Safety & Integration", desc: "Connect server-side API handlers, Gemini AI logic, and end-to-end TypeScript interfaces." },
                    { step: "04", title: "Audit & Optimization", desc: "Perform Lighthouse web vitals benchmarking, cross-browser visual QA, and accessibility checks." }
                  ].map((s) => (
                    <li key={s.step} className="flex gap-4 items-start p-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
                      <span className="font-mono font-bold text-cyan-400 text-sm">{s.step}</span>
                      <div>
                        <div className="font-semibold text-white text-sm">{s.title}</div>
                        <div className="text-xs text-slate-400">{s.desc}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
