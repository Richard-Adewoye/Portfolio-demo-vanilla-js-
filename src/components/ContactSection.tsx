import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Clock,
  MessageSquare,
  Copy,
  Check,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileData, Service } from '../types';

interface ContactSectionProps {
  profile: ProfileData;
  prefilledSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, prefilledSubject = '' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(prefilledSubject);
  const [budget, setBudget] = useState('$5,000 - $10,000');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  React.useEffect(() => {
    if (prefilledSubject) {
      setSubject(prefilledSubject);
    }
  }, [prefilledSubject]);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setShowToast(false), 3000);
    }).catch(() => {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = profile.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-300">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Let's build something exceptional together
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have a project in mind, an open role, or just want to connect? Send a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Calendly Simulation */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-white">Contact Information</h3>
              
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500 font-mono flex items-center justify-between">
                      <span>Email Directly</span>
                      <span className="text-[10px] text-cyan-400/80 font-normal">Click to copy</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <a href={`mailto:${profile.email}`} className="font-semibold text-white hover:text-cyan-400 transition-colors truncate">
                        {profile.email}
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className={`p-1.5 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-mono shrink-0 ${
                          copied
                            ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50'
                        }`}
                        title="Copy Email to Clipboard"
                        aria-label="Copy Email to Clipboard"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[10px] text-emerald-300 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px] hidden sm:inline">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-indigo-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">Phone / WhatsApp</div>
                    <div className="font-semibold text-white">{profile.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-purple-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">Based In</div>
                    <div className="font-semibold text-white">{profile.location}</div>
                  </div>
                </div>
              </div>

              {/* Response Time Guarantee Box */}
              <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl flex items-center gap-3 text-xs text-emerald-300">
                <Clock className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                <span>Guaranteed response within 24 hours on all business days.</span>
              </div>

            </div>

            {/* Simulated 1-on-1 Consultation Booking */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
                <Calendar className="w-4 h-4" />
                <span>Book 15-Min Intro Call</span>
              </div>
              <p className="text-xs text-slate-300">
                Need quick technical advisory or scoping for a upcoming launch?
              </p>
              <a
                href={`mailto:${profile.email}?subject=Intro Call Request`}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                <span>Schedule Call via Email</span>
              </a>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-950 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Delivered!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out, <strong>{name}</strong>. I have received your message regarding <em>"{subject || 'Inquiry'}"</em> and will reply shortly at {email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 rounded-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-mono">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Sarah Jenkins"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-mono">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-mono">Subject / Topic</label>
                      <input
                        type="text"
                        placeholder="Full Stack App Scoping"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-mono">Estimated Budget</label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="< $5,000">&lt; $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                        <option value="$25,000+">$25,000+</option>
                        <option value="Full-Time Employment">Full-Time Employment Role</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-mono">Message Details *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell me about your project goals, timelines, or technology requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Toast Notification Confirmation */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 sm:left-auto sm:right-8 sm:translate-x-0 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900/95 border border-emerald-500/50 rounded-2xl shadow-2xl shadow-emerald-950/40 backdrop-blur-xl text-white"
          >
            <div className="p-1.5 bg-emerald-950 border border-emerald-500/60 text-emerald-400 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Email Copied to Clipboard!</span>
                <Sparkles className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="text-[11px] text-slate-300 font-mono mt-0.5">
                {profile.email}
              </div>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors ml-2"
              title="Dismiss Toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
