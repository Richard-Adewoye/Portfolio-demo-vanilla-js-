import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Sparkles, 
  Copy, 
  Check, 
  Palette, 
  Code2, 
  BarChart3, 
  Bot, 
  RefreshCw,
  Terminal,
  Zap
} from 'lucide-react';
import { Project } from '../types';

interface InteractiveDemosModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProject?: Project | null;
}

export const InteractiveDemosModal: React.FC<InteractiveDemosModalProps> = ({
  isOpen,
  onClose,
  initialProject
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'palette' | 'component' | 'telemetry'>('ai');
  const [copiedText, setCopiedText] = useState(false);

  // AI Sandbox state
  const [inputPrompt, setInputPrompt] = useState('Create a full stack web app for tracking daily habits with streak counters and dark mode');
  const [modelChoice, setModelChoice] = useState('gemini-2.5-flash');
  const [isGenerating, setIsGenerating] = useState(false);
  const [enhancedResult, setEnhancedResult] = useState<string | null>(null);

  // Palette Generator state
  const [baseColor, setBaseColor] = useState('#06b6d4'); // Cyan 500
  const [paletteShades, setPaletteShades] = useState<string[]>([
    '#ecfeff', '#cffaff', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'
  ]);

  // Component Builder state
  const [buttonText, setButtonText] = useState('Get Started Free');
  const [buttonVariant, setButtonVariant] = useState<'solid' | 'outline' | 'glow'>('glow');
  const [buttonRadius, setButtonRadius] = useState<'sm' | 'md' | 'xl' | 'full'>('xl');

  if (!isOpen) return null;

  const handleRunAiEnhancement = () => {
    setIsGenerating(true);
    setEnhancedResult(null);
    setTimeout(() => {
      setIsGenerating(false);
      setEnhancedResult(
        `# Optimized System Prompt Architecture\n\n` +
        `**Role:** Senior Full Stack Architect & System Designer\n` +
        `**Task:** Build an offline-first Habit Tracker with local storage, streak persistence, and modern Tailwind CSS theme.\n\n` +
        `## Key Requirements & Data Schema:\n` +
        `- **Data Model:** \`Habit { id: string, name: string, streak: number, completedDates: string[] }\`\n` +
        `- **UI Design:** Dark cyber theme, high-contrast metrics, WCAG AA buttons.\n` +
        `- **Performance:** Sub-10ms render latency, zero layout shifts.\n\n` +
        `*Estimated Output Tokens: ~420 | Latency Reduction: 38%*`
      );
    }, 1200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-950 rounded-2xl text-cyan-400 border border-cyan-800/60 animate-pulse">
              <Play className="w-5 h-5 fill-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Interactive Live Sandbox Demos</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold rounded-md">LIVE PLAYGROUND</span>
              </h3>
              <p className="text-xs text-slate-400">Test real interactive widgets and mini-apps built by Alex Rivera.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/80 px-6 gap-2 overflow-x-auto">
          {[
            { id: 'ai', label: 'AI Prompt Studio Demo', icon: Bot },
            { id: 'palette', label: 'Color Studio Generator', icon: Palette },
            { id: 'component', label: 'Component Builder', icon: Code2 },
            { id: 'telemetry', label: 'Telemetry Streamer', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3.5 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                  active 
                    ? 'border-cyan-400 text-cyan-300 font-bold' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Canvas Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-slate-950">
          
          {/* TAB 1: AI Prompt Studio */}
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 bg-indigo-950/30 border border-indigo-800/50 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-200 leading-relaxed">
                  This demo simulates the core prompt optimizer engine from <strong>NeuroPrompt AI Studio</strong>. Enter a raw prompt and run model-specific structured enhancement.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Input Form */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 uppercase">Target Model</label>
                    <select
                      value={modelChoice}
                      onChange={(e) => setModelChoice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="gemini-2.5-flash">Gemini 2.5 Flash (Fastest)</option>
                      <option value="gemini-2.5-pro">Gemini 2.5 Pro (Reasoning)</option>
                      <option value="gemini-3-flash">Gemini 3 Flash (Next-Gen)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 uppercase">Draft Prompt</label>
                    <textarea
                      rows={5}
                      value={inputPrompt}
                      onChange={(e) => setInputPrompt(e.target.value)}
                      className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    onClick={handleRunAiEnhancement}
                    disabled={isGenerating}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Optimizing Prompt Chains...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-white" />
                        <span>Run Optimization Engine</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Output Viewer */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      Optimized Output
                    </span>
                    {enhancedResult && (
                      <button
                        onClick={() => copyToClipboard(enhancedResult)}
                        className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                      >
                        {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedText ? 'Copied' : 'Copy Output'}</span>
                      </button>
                    )}
                  </div>

                  <div className="flex-1 min-h-[160px] text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {enhancedResult ? (
                      enhancedResult
                    ) : (
                      <span className="text-slate-600 italic">Click "Run Optimization Engine" to generate structured AI system prompts...</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: Palette Generator */}
          {activeTab === 'palette' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 bg-cyan-950/30 border border-cyan-800/50 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Live Tailwind Shade Calculator</h4>
                  <p className="text-xs text-slate-400">Generate 10 WCAG AA compliant design system color tokens instantly.</p>
                </div>
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {paletteShades.map((hex, i) => (
                  <div
                    key={i}
                    onClick={() => copyToClipboard(hex)}
                    className="p-3 rounded-2xl border border-slate-800 space-y-3 cursor-pointer hover:scale-105 transition-transform group text-center"
                    style={{ backgroundColor: hex }}
                  >
                    <div className="py-6 rounded-xl font-mono text-xs font-bold mix-blend-difference text-white">
                      {50 + i * 100}
                    </div>
                    <div className="text-[10px] font-mono text-slate-900 bg-white/90 rounded py-0.5 px-1 font-bold">
                      {hex}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Component Builder */}
          {activeTab === 'component' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Controls */}
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                  <h4 className="text-sm font-bold text-white">Interactive Button Props</h4>
                  
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Label Text</label>
                    <input
                      type="text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Visual Style Variant</label>
                    <div className="flex gap-2">
                      {(['glow', 'solid', 'outline'] as const).map((v) => (
                        <button
                          key={v}
                          onClick={() => setButtonVariant(v)}
                          className={`flex-1 py-1.5 text-xs font-mono rounded-lg border uppercase ${
                            buttonVariant === v ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' : 'bg-slate-950 text-slate-400 border-slate-800'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Border Radius</label>
                    <div className="flex gap-2">
                      {(['sm', 'md', 'xl', 'full'] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setButtonRadius(r)}
                          className={`flex-1 py-1.5 text-xs font-mono rounded-lg border uppercase ${
                            buttonRadius === r ? 'bg-indigo-600 text-white font-bold border-indigo-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center space-y-6">
                  <span className="text-xs font-mono text-slate-500">Live Render Canvas</span>
                  
                  <button
                    className={`px-6 py-3 text-sm font-bold transition-all ${
                      buttonRadius === 'sm' ? 'rounded-md' :
                      buttonRadius === 'md' ? 'rounded-lg' :
                      buttonRadius === 'xl' ? 'rounded-xl' : 'rounded-full'
                    } ${
                      buttonVariant === 'glow' ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 hover:scale-105' :
                      buttonVariant === 'solid' ? 'bg-white text-slate-950 hover:bg-slate-200' :
                      'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-950/40'
                    }`}
                  >
                    {buttonText}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: Telemetry Streamer */}
          {activeTab === 'telemetry' && (
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>Streaming Node Monitor (Apex Telemetry Demo)</span>
                </h4>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-mono rounded">
                  50,000 req/sec
                </span>
              </div>

              {/* Simulated Visual Wave Bars */}
              <div className="h-40 bg-slate-950 rounded-xl border border-slate-800 p-4 flex items-end justify-between gap-2 overflow-hidden">
                {Array.from({ length: 24 }).map((_, i) => {
                  const h = Math.floor(Math.random() * 80) + 20;
                  return (
                    <div 
                      key={i} 
                      className="w-full bg-gradient-to-t from-cyan-600 to-indigo-500 rounded-t-md transition-all duration-300"
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
