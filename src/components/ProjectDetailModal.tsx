import React from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Play, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  Sparkles,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenDemo: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenDemo
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-scaleIn max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-cyan-950 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider rounded-lg border border-cyan-800/60">
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* Main Visual Image Header */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video shadow-xl">
            <img 
              src={project.image} 
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {project.hasInteractiveDemo && (
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center p-4">
                <button
                  onClick={() => {
                    onClose();
                    onOpenDemo(project);
                  }}
                  className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl flex items-center gap-2 transform hover:scale-105 transition-all"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Launch Interactive Sandbox Demo</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Completed: {project.completionYear}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Production App</span>
                </a>
              )}
            </div>
          </div>

          {/* Key Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, i) => (
                <div key={i} className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-1">
                  <div className="text-2xl font-mono font-bold text-cyan-400">{m.value}</div>
                  <div className="text-xs text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Overview Section */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Project Overview & Architecture</span>
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Features List */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Key Features & Technical Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-slate-950/40 rounded-xl border border-slate-800/60 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-slate-800 text-cyan-300 border border-slate-700/80 text-xs font-mono rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
