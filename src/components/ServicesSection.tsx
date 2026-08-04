import React from 'react';
import { 
  Code2, 
  Layout, 
  Sparkles, 
  Gauge, 
  CheckCircle, 
  ArrowRight,
  Send
} from 'lucide-react';
import { Service } from '../types';

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectService }) => {
  return (
    <section id="services" className="py-20 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/60 text-xs font-mono text-purple-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Services & Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineering Offerings tailored for high-growth teams
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Whether building a zero-to-one web product or auditing performance, I deliver production-ready software solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Code2 className="w-6 h-6" />
                    </div>
                    {service.startingPrice && (
                      <span className="px-3 py-1 bg-slate-950 text-emerald-400 border border-emerald-900/60 font-mono text-xs font-bold rounded-xl">
                        From {service.startingPrice}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Key Deliverables</div>
                    <ul className="space-y-2">
                      {service.deliverables.map((d, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold rounded-2xl border border-slate-700 hover:border-indigo-500 transition-all shadow-md group-hover:shadow-indigo-600/20"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
