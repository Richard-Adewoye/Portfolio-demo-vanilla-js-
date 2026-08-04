import React from 'react';
import { 
  Quote, 
  Star, 
  MessageSquareHeart, 
  CheckCircle 
} from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-xs font-mono text-emerald-300">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Trusted by product leaders & founders
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Feedback from engineering leaders, product executives, and startup founders I've collaborated with.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl relative flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all"
            >
              <Quote className="w-10 h-10 text-indigo-500/20 absolute top-6 right-6" />

              <div className="space-y-4 relative z-10">
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.role}, <span className="text-indigo-400 font-semibold">{t.company}</span></p>
                  </div>
                </div>
              </div>

              {t.projectWorkedOn && (
                <div className="px-3 py-1 bg-slate-950 text-slate-400 text-[11px] font-mono rounded-lg border border-slate-800 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Project: {t.projectWorkedOn}</span>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
