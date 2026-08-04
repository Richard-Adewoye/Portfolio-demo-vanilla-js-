import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Save, 
  RotateCcw, 
  Check,
  Sparkles
} from 'lucide-react';
import { ProfileData } from '../types';

interface PortfolioEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onUpdateProfile: (updated: ProfileData) => void;
  onResetDefault: () => void;
}

export const PortfolioEditorModal: React.FC<PortfolioEditorModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onResetDefault
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof ProfileData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-950 rounded-2xl text-indigo-400 border border-indigo-800">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Personalize Portfolio Profile</h3>
              <p className="text-xs text-slate-400">Edit engineer details live to test custom portfolio presets.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs text-slate-300">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-400 font-mono">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-mono">Job Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-mono">Headline Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-mono">Bio Overview</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-cyan-500 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-400 font-mono">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-mono">Availability Status</label>
              <input
                type="text"
                value={formData.availabilityStatus}
                onChange={(e) => handleChange('availabilityStatus', e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onResetDefault();
                onClose();
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
            >
              {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
              <span>{saved ? 'Saved Live!' : 'Apply Changes'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
