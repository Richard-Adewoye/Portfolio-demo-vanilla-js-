import React from 'react';
import { 
  Terminal, 
  Github, 
  Linkedin, 
  Twitter, 
  Dribbble, 
  ArrowUp 
} from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">{profile.name}</span>
              <p className="text-xs text-slate-500 font-mono">{profile.title}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 text-slate-400">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={profile.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href={profile.socials.dribbble} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <Dribbble className="w-5 h-5" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono rounded-lg border border-slate-800 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 font-mono">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
          <div>
            Designed & Engineered with React, TypeScript & Tailwind CSS.
          </div>
        </div>

      </div>
    </footer>
  );
};
