import React from 'react';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Dribbble, 
  Sparkles, 
  Code2, 
  Play, 
  CheckCircle2,
  Terminal,
  Layers,
  Cpu
} from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  profile: ProfileData;
  onOpenDemos: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenDemos, onOpenResume }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy & Actions (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-300 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>{profile.availabilityStatus}</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">{profile.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-slate-300">
                {profile.title}
              </p>
            </div>

            {/* Tagline / Bio */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              {profile.tagline}
            </p>

            {/* Tech Pill List */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['TypeScript', 'React 19', 'Node.js', 'Tailwind CSS', 'Gemini AI', 'Express'].map((tech) => (
                <span 
                  key={tech} 
                  className="px-2.5 py-1 text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 rounded-md"
                >
                  #{tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenDemos}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 rounded-xl transition-all hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span>Interactive Demos</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 rounded-xl transition-all"
              >
                <span>Let's Talk</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Connect:</span>
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors p-1" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors p-1" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={profile.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors p-1" title="Twitter / X">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={profile.socials.dribbble} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors p-1" title="Dribbble">
                <Dribbble className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Profile Visual & Floating Stats (Col 5) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-sm">
              
              {/* Outer Decorative Rings */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 opacity-30 blur-lg" />
              
              {/* Profile Card Container */}
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl space-y-4">
                
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl aspect-square bg-slate-950 border border-slate-800">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-300 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      San Francisco, CA
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-semibold rounded-md text-[10px]">
                      Full Stack
                    </span>
                  </div>
                </div>

                {/* Floating Feature Highlights */}
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                    <div className="text-xl font-bold text-white font-mono">{profile.stats.yearsExperience}+ Yrs</div>
                    <div className="text-[11px] text-slate-400">Engineering Exp</div>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                    <div className="text-xl font-bold text-cyan-400 font-mono">{profile.stats.projectsCompleted}+</div>
                    <div className="text-[11px] text-slate-400">Projects Shipped</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Metrics Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-sm">
          <div className="space-y-1 text-center md:text-left border-r border-slate-800/80 last:border-0 pr-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{profile.stats.yearsExperience}+ Years</div>
            <div className="text-xs text-slate-400">Professional Experience</div>
          </div>
          <div className="space-y-1 text-center md:text-left border-r border-slate-800/80 last:border-0 pr-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">{profile.stats.projectsCompleted} Delivered</div>
            <div className="text-xs text-slate-400">Web & Mobile Products</div>
          </div>
          <div className="space-y-1 text-center md:text-left border-r border-slate-800/80 last:border-0 pr-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">100%</div>
            <div className="text-xs text-slate-400">On-time Delivery Rate</div>
          </div>
          <div className="space-y-1 text-center md:text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">{profile.stats.codeCommitsThisYear}+</div>
            <div className="text-xs text-slate-400">Commits This Year</div>
          </div>
        </div>

      </div>
    </section>
  );
};
