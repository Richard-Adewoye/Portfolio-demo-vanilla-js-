import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles, 
  UserCheck, 
  Download, 
  Check,
  Compass,
  Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeMode, ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenCommandMenu: () => void;
  onOpenEditor: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  theme,
  onThemeChange,
  onOpenCommandMenu,
  onOpenEditor,
  onOpenResume
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Scroll handler for background state, progress percentage, and active section intersection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Calculate overall page scroll progress %
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }

      // Determine active section based on scroll position
      const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean);
      const scrollPosition = currentScrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 transition-all duration-300"
    >
      {/* Scroll Progress Bar at top edge */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-800/40 z-50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Container: Smooth Morphing into a Floating Glass Card when Scrolled */}
      <div 
        className={`transition-all duration-500 ease-out mx-auto ${
          scrolled 
            ? 'max-w-6xl rounded-2xl sm:rounded-full bg-slate-900/85 dark:bg-slate-950/85 backdrop-blur-xl border border-slate-700/60 shadow-2xl shadow-cyan-950/20 px-4 py-2 sm:py-2.5 my-2 sm:my-3' 
            : 'max-w-7xl px-2 sm:px-4 py-5 my-0 bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Smooth Scale & Glow Animation */}
          <a href="#" className="flex items-center gap-3 group">
            <motion.div 
              className={`relative rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 p-[2px] shadow-md transition-all duration-300 ${
                scrolled ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl'
              }`}
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-full h-full bg-slate-950 rounded-[inherit] flex items-center justify-center">
                <Terminal className={`text-cyan-400 transition-all duration-300 ${scrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
              </div>
            </motion.div>
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                {profile.name}
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title={profile.availabilityStatus} />
              </span>
              {!scrolled && (
                <span className="text-xs text-slate-400 font-mono hidden sm:block transition-all">
                  Full Stack Architect
                </span>
              )}
            </div>
          </a>

          {/* Desktop Nav Links with Active Animated Glide Pill */}
          <nav className={`hidden lg:flex items-center gap-1 transition-all duration-300 ${
            scrolled ? 'bg-slate-950/60 p-1 rounded-full border border-slate-800/80' : 'bg-slate-800/40 p-1.5 rounded-full border border-slate-700/50 backdrop-blur-sm'
          }`}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 rounded-full ${
                    isActive ? 'text-cyan-300 font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-slate-800 border border-cyan-500/40 rounded-full shadow-sm shadow-cyan-500/20 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2">
            
            {/* Quick Search Button (Cmd + K) */}
            <button
              onClick={onOpenCommandMenu}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-slate-400 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-all hover:border-cyan-500/40"
              title="Search Portfolio (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-900 text-slate-400 rounded border border-slate-700">⌘K</kbd>
            </button>

            {/* Dedicated High-Contrast Light / Dark Mode Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
              className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 shadow-md ${
                theme === 'light' 
                  ? 'bg-amber-100 border-amber-300 text-amber-950 hover:bg-amber-200' 
                  : 'bg-slate-800/90 border-slate-700/80 text-slate-200 hover:bg-slate-700/90 hover:border-cyan-500/50'
              }`}
              title={theme === 'light' ? 'Switch to High-Contrast Dark Mode' : 'Switch to High-Contrast Light Mode'}
              aria-label="Toggle Light or Dark Mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme === 'light' ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {theme === 'light' ? (
                    <Sun className="w-4 h-4 text-amber-600 fill-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                  )}
                </motion.div>
              </AnimatePresence>

              <span className="text-xs font-semibold font-mono tracking-tight hidden sm:inline-block">
                {theme === 'light' ? 'Light' : 'Dark'}
              </span>

              {/* Status Glow Pill */}
              <span 
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  theme === 'light' 
                    ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' 
                    : 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                }`} 
              />
            </motion.button>

            {/* Accent Theme Palette Dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-all"
                title="Color Accent Themes"
              >
                <Palette className="w-4 h-4 text-slate-300 hover:text-cyan-400" />
              </button>

              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 text-xs"
                  >
                    <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Accent Themes</div>
                    {[
                      { id: 'dark', label: 'Dark Cyber', color: 'bg-cyan-500' },
                      { id: 'light', label: 'Light Studio', color: 'bg-amber-400' },
                      { id: 'emerald', label: 'Emerald Forest', color: 'bg-emerald-500' },
                      { id: 'amber', label: 'Amber Luxe', color: 'bg-amber-600' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onThemeChange(t.id as ThemeMode);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                          theme === t.id ? 'bg-slate-800 text-white font-medium' : 'text-slate-300 hover:bg-slate-800/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                          {t.label}
                        </span>
                        {theme === t.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Personalize Portfolio Modal Trigger */}
            <button
              onClick={onOpenEditor}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-all"
              title="Edit details live to personalize portfolio"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Personalize</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 rounded-lg shadow-md shadow-indigo-900/20 transition-all hover:scale-[1.02]"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700/60 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900/95 border-b border-slate-800 rounded-2xl mx-auto mt-1 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${
                      isActive ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <Compass className="w-4 h-4 text-cyan-400" />}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenCommandMenu();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono bg-slate-800 text-slate-300 rounded-lg"
              >
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Search Portfolio</span>
              </button>

              <button
                onClick={() => {
                  onOpenEditor();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium bg-slate-800 text-indigo-300 rounded-lg"
              >
                <UserCheck className="w-4 h-4" />
                <span>Customize Profile Data</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
