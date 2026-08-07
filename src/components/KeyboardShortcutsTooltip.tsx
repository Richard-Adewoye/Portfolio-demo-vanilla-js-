import React, { useState, useEffect } from 'react';
import { Keyboard, X, Command, Sparkles, ChevronUp, ChevronDown, Compass, Moon, Sun, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface KeyboardShortcutsTooltipProps {
  onOpenCommandMenu: () => void;
  onToggleTheme?: () => void;
  onToggleLanguage?: () => void;
}

export const KeyboardShortcutsTooltip: React.FC<KeyboardShortcutsTooltipProps> = ({
  onOpenCommandMenu,
  onToggleTheme,
  onToggleLanguage
}) => {
  const { t, language } = useLanguage();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMac, setIsMac] = useState(true);

  // Detect OS platform for Mac vs Windows/Linux modifier keys
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
      const dismissedState = localStorage.getItem('keyboard_shortcuts_dismissed');
      if (dismissedState === 'true') {
        setIsDismissed(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('keyboard_shortcuts_dismissed', 'true');
  };

  const handleRestore = () => {
    setIsDismissed(false);
    localStorage.removeItem('keyboard_shortcuts_dismissed');
  };

  const shortcuts = [
    {
      keys: [isMac ? '⌘' : 'Ctrl', 'K'],
      label: language === 'en' ? 'Quick Command Launcher' : 'Lanzador de Comandos',
      action: onOpenCommandMenu,
      badge: language === 'en' ? 'Search' : 'Buscar'
    },
    {
      keys: ['T'],
      label: language === 'en' ? 'Toggle Light/Dark Theme' : 'Cambiar Tema Claro/Oscuro',
      action: onToggleTheme,
      badge: language === 'en' ? 'Theme' : 'Tema'
    },
    {
      keys: ['L'],
      label: language === 'en' ? 'Switch Language (EN/ES)' : 'Cambiar Idioma (EN/ES)',
      action: onToggleLanguage,
      badge: language === 'en' ? 'Lang' : 'Idioma'
    },
    {
      keys: ['Esc'],
      label: language === 'en' ? 'Close Modals & Windows' : 'Cerrar Ventanas y Módulos',
      badge: 'Close'
    }
  ];

  if (isDismissed) {
    return (
      <button
        onClick={handleRestore}
        className="fixed bottom-6 left-6 z-40 p-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-700/80 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 group"
        title={language === 'en' ? 'Show Keyboard Shortcuts' : 'Mostrar Atajos de Teclado'}
        aria-label="Restore Keyboard Shortcuts Tooltip"
      >
        <Keyboard className="w-4 h-4 group-hover:rotate-6 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs sm:max-w-sm">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden text-slate-200"
        >
          {/* Header Bar */}
          <div className="px-3.5 py-2.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-left group flex-1"
            >
              <div className="p-1.5 bg-cyan-950 text-cyan-400 border border-cyan-800/80 rounded-lg group-hover:scale-105 transition-transform">
                <Keyboard className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{language === 'en' ? 'Power User Shortcuts' : 'Atajos para Usuarios'}</span>
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {isExpanded ? (language === 'en' ? 'Click to collapse' : 'Clic para plegar') : (language === 'en' ? 'Press ⌘K to search' : 'Presiona ⌘K para buscar')}
                </div>
              </div>
            </button>

            <div className="flex items-center gap-1 pl-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors"
                title={language === 'en' ? 'Dismiss Tooltip' : 'Ocultar Atajos'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Snippet when Collapsed */}
          {!isExpanded && (
            <div className="p-2.5 flex items-center justify-between gap-3 text-xs bg-slate-900/60">
              <span className="text-[11px] text-slate-300">
                {language === 'en' ? 'Press' : 'Presiona'}{' '}
                <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-cyan-300 rounded font-mono font-bold">
                  {isMac ? '⌘K' : 'Ctrl+K'}
                </kbd>{' '}
                {language === 'en' ? 'anywhere for quick search' : 'en cualquier momento'}
              </span>
              <button
                onClick={onOpenCommandMenu}
                className="px-2.5 py-1 text-[10px] font-bold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-800/80 rounded-lg transition-all shrink-0"
              >
                {language === 'en' ? 'Open ⌘K' : 'Abrir ⌘K'}
              </button>
            </div>
          )}

          {/* Expanded Full List */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 space-y-2 border-t border-slate-800/80 bg-slate-950/40"
            >
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1">
                {language === 'en' ? 'Available Global Keys' : 'Teclas Globales Disponibles'}
              </div>

              {shortcuts.map((sc, idx) => (
                <div
                  key={idx}
                  onClick={sc.action}
                  className={`flex items-center justify-between p-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 hover:border-slate-700 transition-all ${
                    sc.action ? 'cursor-pointer hover:scale-[1.01]' : ''
                  }`}
                >
                  <span className="text-xs text-slate-300 font-medium">
                    {sc.label}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    {sc.keys.map((k, i) => (
                      <kbd
                        key={i}
                        className="px-1.5 py-0.5 bg-slate-950 border border-slate-700 text-cyan-300 rounded shadow-inner font-bold"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-1.5 text-[10px] text-slate-500 font-mono text-center flex items-center justify-center gap-1">
                <Compass className="w-3 h-3 text-cyan-400" />
                <span>{language === 'en' ? 'Accessible keyboard navigation enabled' : 'Navegación por teclado habilitada'}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
