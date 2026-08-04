import React, { useState } from 'react';
import { 
  FolderGit2, 
  Search, 
  Star, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Play, 
  ArrowUpRight,
  Filter,
  Check,
  Clock
} from 'lucide-react';
import { Project, CategoryType } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenDemoForProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onOpenDemoForProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['proj-1', 'proj-2']);

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'design', label: 'Design Systems' },
    { id: 'mobile', label: 'Mobile' },
  ];

  const calculateReadTime = (project: Project): string => {
    const combinedText = [
      project.shortDescription,
      project.fullDescription,
      ...(project.keyFeatures || [])
    ].filter(Boolean).join(' ');

    const words = combinedText.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-300">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Case Studies & Software Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Explore production applications engineered with performance, scalable architecture, and accessible user interfaces.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
            <Filter className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="text-base font-semibold text-slate-300">No matching projects found</div>
            <p className="text-xs text-slate-500">Try adjusting your search query or filter category.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-slate-800 text-xs text-cyan-400 font-mono rounded-lg hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const isBookmarked = bookmarkedIds.includes(project.id);
              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group relative bg-slate-900/90 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 hover:scale-[1.025] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col cursor-pointer"
                >
                  {/* Glassmorphism Border & Ambient Light Highlight Effect on Hover */}
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-cyan-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-cyan-500/30 group-hover:via-indigo-500/25 group-hover:to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-sm" />
                  
                  {/* Subtle Top Glass Reflection Line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-cyan-300/40 transition-all duration-500 z-10 pointer-events-none" />
                  
                  {/* Inner Glass Highlight Overlay */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  
                  {/* Thumbnail Image Header */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                    {/* Bookmark Toggle */}
                    <button
                      onClick={(e) => toggleBookmark(project.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
                        isBookmarked 
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                          : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                      title={isBookmarked ? "Remove from starred" : "Star project"}
                    >
                      <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>

                    {/* Featured / Year Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {project.featured && (
                        <span className="px-2.5 py-1 bg-indigo-600/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                          Featured
                        </span>
                      )}
                      <span className="px-2 py-1 bg-slate-900/80 text-slate-300 font-mono text-[10px] rounded-lg border border-slate-800">
                        {project.completionYear}
                      </span>
                    </div>

                    {/* Quick Demo Trigger Badge */}
                    {project.hasInteractiveDemo && (
                      <div className="absolute bottom-3 left-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDemoForProject(project);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg shadow-lg transition-transform hover:scale-105"
                        >
                          <Play className="w-3 h-3 fill-slate-950" />
                          <span>Try Interactive Sandbox</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Key Metrics row */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="py-2 px-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                        <span className="text-slate-500">{project.metrics[0].label}:</span>
                        <span className="font-mono font-bold text-emerald-400">{project.metrics[0].value}</span>
                      </div>
                    )}

                    {/* Bottom Footer Row: Tech Stack Pills & Estimated Read Time */}
                    <div className="pt-3 border-t border-slate-800/60 mt-auto flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-[11px] font-mono text-slate-300 bg-slate-800 border border-slate-700/60 rounded-md">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Estimated Read Time Badge */}
                      <div 
                        className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-cyan-300/90 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800/90 shrink-0"
                        title="Estimated reading time for full project description"
                      >
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{calculateReadTime(project)}</span>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
