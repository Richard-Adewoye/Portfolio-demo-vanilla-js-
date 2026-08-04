import React, { useState } from 'react';
import { 
  Cpu, 
  Code2, 
  Server, 
  Database, 
  LayoutGrid, 
  Settings, 
  Search, 
  Sparkles,
  Check
} from 'lucide-react';
import { Skill } from '../types';

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Tech Stack' },
    { id: 'frontend', label: 'Frontend', icon: Code2 },
    { id: 'backend', label: 'Backend & APIs', icon: Server },
    { id: 'database', label: 'Database & Cloud', icon: Database },
    { id: 'design', label: 'Design Systems', icon: LayoutGrid },
    { id: 'tools', label: 'Tools & DevOps', icon: Settings },
  ];

  const filteredSkills = skills.filter((sk) => {
    const matchesCat = activeCategory === 'all' || sk.category === activeCategory;
    const matchesQuery = sk.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-300">
              <Cpu className="w-3.5 h-3.5" />
              <span>Core Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Technical Matrix & Skill Proficiency
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Battle-tested proficiency across frontend engineering, distributed backends, database architecture, and design system creation.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCategory === c.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-6 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl shadow-lg space-y-4 transition-all group"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {skill.yearsExperience} Years Experience
                    </span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md border ${
                  skill.level === 'Expert' 
                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60' 
                    : 'bg-indigo-950/60 text-indigo-400 border-indigo-800/60'
                }`}>
                  {skill.level}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Mastery</span>
                  <span className="text-cyan-400 font-bold">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
