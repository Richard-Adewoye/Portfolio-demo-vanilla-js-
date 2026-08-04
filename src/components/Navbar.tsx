import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Code2, 
  Sparkles, 
  UserCheck, 
  Download, 
  User,
  Check
} from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 p-[2px] shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-cyan-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                {profile.name}
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title={profile.availabilityStatus} />
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:block">
                Full Stack Architect
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/50 p-1.5 rounded-full border border-slate-700/50 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2">
            
            {/* Quick Search Button (Cmd + K) */}
            <button
              onClick={onOpenCommandMenu}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-slate-400 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-all"
              title="Search Portfolio (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-900 text-slate-400 rounded border border-slate-700">⌘K</kbd>
            </button>

            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-all"
                title="Change Portfolio Color Theme"
              >
                {theme === 'dark' && <Moon className="w-4 h-4 text-cyan-400" />}
                {theme === 'light' && <Sun className="w-4 h-4 text-amber-400" />}
                {theme === 'emerald' && <Sparkles className="w-4 h-4 text-emerald-400" />}
                {theme === 'amber' && <Sparkles className="w-4 h-4 text-amber-500" />}
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 text-xs">
                  <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Themes</div>
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
                </div>
              )}
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
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-lg">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
              >
                {link.name}
              </a>
            ))}
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
        </div>
      )}
    </header>
  );
};
