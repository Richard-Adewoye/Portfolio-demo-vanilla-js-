import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  FolderGit2, 
  Briefcase, 
  Cpu, 
  Mail, 
  UserCheck, 
  Download, 
  Play, 
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import { Project, ThemeMode } from '../types';

interface CommandMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenDemos: () => void;
  onOpenEditor: () => void;
  onOpenResume: () => void;
  onThemeChange: (theme: ThemeMode) => void;
}

export const CommandMenuModal: React.FC<CommandMenuModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onOpenDemos,
  onOpenEditor,
  onOpenResume,
  onThemeChange
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { label: 'Open Interactive Sandbox Demos', icon: Play, action: () => { onClose(); onOpenDemos(); } },
    { label: 'View & Export Resume', icon: Download, action: () => { onClose(); onOpenResume(); } },
    { label: 'Personalize Portfolio Data', icon: UserCheck, action: () => { onClose(); onOpenEditor(); } },
    { label: 'Switch to Dark Mode', icon: Moon, action: () => { onThemeChange('dark'); onClose(); } },
    { label: 'Switch to Light Mode', icon: Sun, action: () => { onThemeChange('light'); onClose(); } },
  ];

  const matchedProjects = projects.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn space-y-2 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Input Bar */}
        <div className="relative flex items-center border-b border-slate-800 pb-3">
          <Search className="w-5 h-5 text-cyan-400 absolute left-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, skills, or run actions... (Esc to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto space-y-4 pt-2 text-xs">
          
          {/* Quick Actions */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider">Quick Actions</div>
            {quickActions.map((act, i) => {
              const Icon = act.icon;
              return (
                <button
                  key={i}
                  onClick={act.action}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{act.label}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                </button>
              );
            })}
          </div>

          {/* Projects Match */}
          {matchedProjects.length > 0 && (
            <div className="space-y-1 pt-2 border-t border-slate-800">
              <div className="px-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider">Matching Projects</div>
              {matchedProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onClose();
                    onSelectProject(p);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <FolderGit2 className="w-4 h-4 text-indigo-400" />
                    <span className="font-semibold">{p.title}</span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">{p.category}</span>
                </button>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
