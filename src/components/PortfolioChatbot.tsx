import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  RotateCcw, 
  User, 
  Mail, 
  ArrowRight, 
  Briefcase, 
  Code2, 
  Calendar, 
  MessageSquare, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { ProfileData, Project } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    actionType: 'contact' | 'project' | 'resume';
    targetId?: string;
  };
}

interface PortfolioChatbotProps {
  profile: ProfileData;
  projects: Project[];
  onOpenResume: () => void;
  onOpenProject?: (project: Project) => void;
}

export const PortfolioChatbot: React.FC<PortfolioChatbotProps> = ({
  profile,
  projects,
  onOpenResume,
  onOpenProject
}) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested starter prompts
  const suggestedPrompts = [
    "What tech stack does Alex specialize in?",
    "Is Alex available for full-time or contract work?",
    "Show me top projects by Alex",
    "How can I book a call or contact Alex?",
  ];

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: `Hi there! 👋 I'm Alex's AI Portfolio Assistant. How can I help you today? You can ask about skills, project history, availability, or how to get in touch.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, []);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      // First attempt server endpoint call
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, profile, projects })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.text) {
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: data.text,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          return;
        }
      }
    } catch (e) {
      // Fallback silently to client rule-based intelligence
    }

    // Client-side intelligent engine fallback
    setTimeout(() => {
      setIsTyping(false);
      const reply = generateSmartFallbackReply(query, profile, projects);
      setMessages(prev => [...prev, reply]);
    }, 700);
  };

  const generateSmartFallbackReply = (
    query: string, 
    prof: ProfileData, 
    projs: Project[]
  ): Message => {
    const q = query.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach') || q.includes('call') || q.includes('talk') || q.includes('message')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Alex is currently ${prof.availabilityStatus || 'Available for projects'}. You can email directly at ${prof.email} or send a message using the Contact Section on this page!`,
        timestamp: time,
        actionButton: {
          label: 'Jump to Contact Section',
          actionType: 'contact',
          targetId: 'contact'
        }
      };
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('react') || q.includes('typescript') || q.includes('node') || q.includes('language')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Alex specializes in modern Full Stack Engineering and UI Systems. Core competencies include TypeScript, React 19, Next.js, Node.js, Express, Tailwind CSS, GraphQL, PostgreSQL, WebSockets, and AI API integrations.`,
        timestamp: time
      };
    }

    if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('dashboard') || q.includes('built')) {
      const featured = projs.slice(0, 3).map(p => `• ${p.title}: ${p.shortDescription}`).join('\n');
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Here are some of Alex's highlight projects:\n\n${featured}\n\nAll projects include live interactive sandbox demos that you can launch right in this portfolio!`,
        timestamp: time,
        actionButton: {
          label: 'Explore Projects Section',
          actionType: 'contact',
          targetId: 'projects'
        }
      };
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('experience') || q.includes('background') || q.includes('role')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Alex has over 8+ years of engineering leadership experience, crafting scalable cloud architectures, design systems, and web apps for global tech companies and high-growth startups.`,
        timestamp: time,
        actionButton: {
          label: 'View Interactive Resume',
          actionType: 'resume'
        }
      };
    }

    if (q.includes('rate') || q.includes('price') || q.includes('cost') || q.includes('salary') || q.includes('budget')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Alex works on fixed-scope contract engagements, full-time senior roles, and advisory retainers. Project budgets typically start around $5,000+. Feel free to submit your project scope for a custom quote.`,
        timestamp: time,
        actionButton: {
          label: 'Submit Scope & Budget',
          actionType: 'contact',
          targetId: 'contact'
        }
      };
    }

    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `Thanks for asking! Alex Rivera is a Senior Full Stack & UI Systems Engineer based in ${prof.location || 'San Francisco, CA'}. Alex builds high-performance web applications, resilient design systems, and AI-enabled software solutions.`,
      timestamp: time,
      actionButton: {
        label: 'Get In Touch With Alex',
        actionType: 'contact',
        targetId: 'contact'
      }
    };
  };

  const handleActionButtonClick = (btn: NonNullable<Message['actionButton']>) => {
    if (btn.actionType === 'contact' && btn.targetId) {
      const elem = document.getElementById(btn.targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (btn.actionType === 'resume') {
      onOpenResume();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: `Chat restarted! How else can I assist you with Alex's portfolio?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Closed State Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-full shadow-2xl shadow-cyan-900/40 hover:scale-105 transition-all duration-300 border border-cyan-400/30"
          title="Open AI Portfolio Chatbot"
        >
          {/* Glowing pulse ring */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-400 border-2 border-slate-950"></span>
          </span>

          <div className="p-1.5 bg-slate-950/80 rounded-full text-cyan-400 border border-cyan-800/80">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </div>

          <div className="text-left hidden sm:block pr-1">
            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>{t('chat.askAlex')}</span>
              <Sparkles className="w-3 h-3 text-cyan-300" />
            </div>
            <div className="text-[10px] text-cyan-100 font-mono opacity-90">{t('chat.online')}</div>
          </div>
        </button>
      )}

      {/* Opened State Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] max-h-[85vh] bg-slate-900/95 border border-slate-700/80 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header Bar */}
          <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2 bg-gradient-to-tr from-indigo-900 to-cyan-900 rounded-2xl border border-cyan-700/50 text-cyan-300">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{t('chat.assistant')}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-cyan-950 text-cyan-300 border border-cyan-800/60 rounded-md">v2.5</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Instant Answers</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleResetChat}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Restart Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs text-slate-200 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-800/90 border border-slate-700/70 text-slate-100 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}

                  {/* Action Button if attached */}
                  {msg.actionButton && (
                    <button
                      onClick={() => handleActionButtonClick(msg.actionButton!)}
                      className="mt-2.5 w-full py-2 px-3 bg-slate-900 hover:bg-slate-950 text-cyan-300 border border-cyan-800/60 rounded-xl font-medium text-[11px] flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01]"
                    >
                      <span>{msg.actionButton.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 px-1 font-mono">{msg.timestamp}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-slate-800/60 border border-slate-700/50 rounded-2xl w-24 text-slate-400">
                <Bot className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping delay-100" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping delay-200" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Container */}
          {messages.length <= 3 && !isTyping && (
            <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 flex flex-wrap gap-1.5">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1 text-[10px] font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700/60 rounded-full transition-all text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={t('chat.placeholder')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-40 text-white rounded-xl shadow-md transition-all shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
