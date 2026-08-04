import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  Building,
  Award
} from 'lucide-react';
import { Experience } from '../types';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');

  const filtered = experiences.filter((exp) => {
    if (filter === 'work') return exp.type === 'full-time' || exp.type === 'contract';
    if (filter === 'education') return exp.type === 'education' || exp.type === 'certification';
    return true;
  });

  return (
    <section id="experience" className="py-20 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-xs font-mono text-indigo-300">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Professional Experience & Education
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              A track record of engineering impact across tech labs, cloud platforms, digital agencies, and top-tier academic training.
            </p>
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'all', label: 'All History' },
              { id: 'work', label: 'Work Experience' },
              { id: 'education', label: 'Education & Certs' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f.id
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12">
          {filtered.map((exp, idx) => {
            const isEdu = exp.type === 'education';
            return (
              <div key={exp.id} className="relative pl-6 sm:pl-10 group">
                
                {/* Timeline Node Icon Dot */}
                <div className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isEdu 
                    ? 'bg-purple-950 border-purple-500 text-purple-400' 
                    : 'bg-indigo-950 border-indigo-500 text-indigo-400'
                }`}>
                  {isEdu ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                </div>

                {/* Card */}
                <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 transition-all">
                  
                  {/* Title & Company Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-indigo-400 font-semibold mt-1">
                        <Building className="w-4 h-4" />
                        <span>{exp.company}</span>
                        {exp.companyUrl && (
                          <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800/80">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Key Achievements Bullet List */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Key Impact & Achievements</div>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                    {exp.skillsUsed.map((sk) => (
                      <span key={sk} className="px-2.5 py-1 bg-slate-950 text-slate-300 border border-slate-800 text-xs font-mono rounded-md">
                        {sk}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
