import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Mail, 
  MapPin, 
  Phone, 
  Globe 
} from 'lucide-react';
import { ProfileData, Experience, Skill } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  experiences: Experience[];
  skills: Skill[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  experiences,
  skills
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const text = `${profile.name} - ${profile.title}\nEmail: ${profile.email} | Location: ${profile.location}\n\nSummary:\n${profile.bio}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/95 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-950 rounded-xl text-indigo-400 border border-indigo-800/60">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Curriculum Vitae / Resume</h3>
              <p className="text-xs text-slate-400 font-mono">Last updated: August 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Copy Resume Summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Canvas */}
        <div className="p-8 space-y-8 overflow-y-auto bg-slate-950 font-sans text-slate-200">
          
          {/* Resume Header */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white">{profile.name}</h1>
                <p className="text-lg font-semibold text-cyan-400">{profile.title}</p>
              </div>
              <div className="space-y-1 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-500" /> {profile.email}</div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-500" /> {profile.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {profile.location}</div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
              {profile.bio}
            </p>
          </div>

          {/* Technical Skills Summary */}
          <div className="space-y-3">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>Technical Skills & Core Capabilities</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s.id} className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 rounded-md">
                  {s.name} ({s.level})
                </span>
              ))}
            </div>
          </div>

          {/* Work History */}
          <div className="space-y-6">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Professional Work Experience</span>
            </h2>

            <div className="space-y-6">
              {experiences.filter(e => e.type !== 'education').map((exp) => (
                <div key={exp.id} className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-white">{exp.role}</h3>
                      <p className="text-xs font-semibold text-indigo-400">{exp.company} — {exp.location}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                  </div>

                  <p className="text-xs text-slate-300">{exp.description}</p>

                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education & Academic Honors</span>
            </h2>

            {experiences.filter(e => e.type === 'education').map((edu) => (
              <div key={edu.id} className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white">{edu.role}</h3>
                  <span className="text-xs font-mono text-slate-400">{edu.period}</span>
                </div>
                <p className="text-xs text-indigo-400 font-semibold">{edu.company}</p>
                <p className="text-xs text-slate-300">{edu.description}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
