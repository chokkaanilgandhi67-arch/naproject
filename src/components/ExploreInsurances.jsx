import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Compass, 
  Home, 
  ShieldAlert, 
  GraduationCap, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Check, 
  Layers
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function ExploreInsurances({ 
  insurances, 
  onSelectInsurance,
  enrolledPolicies 
}) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const getInsuranceIcon = (iconName) => {
    switch (iconName) {
      case 'Rocket': return <Rocket className="w-6 h-6 text-cyan-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-purple-400" />;
      case 'Home': return <Home className="w-6 h-6 text-emerald-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-amber-400" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-blue-400" />;
      case 'Heart': return <Heart className="w-6 h-6 text-rose-400" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.2)]">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Curated Zero-G Risk Protection Ecosystem</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Explore All Insurances
        </h1>

        <p className="text-sm text-slate-300">
          Six certified spatial protection vaults engineered for extraterrestrial exploration, habitat resilience, and generational wealth security.
        </p>
      </div>

      {/* Grid Showcasing EXACTLY 6 Different Types of Insurances */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {insurances.map((ins, index) => {
          const isEnrolled = enrolledPolicies && enrolledPolicies.some(p => p.title === ins.title);

          return (
            <motion.div
              key={ins.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              onMouseEnter={() => {
                sound.playHover();
                setHoveredCard(ins.id);
              }}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative rounded-3xl p-6 sm:p-7 glass-panel glass-panel-hover border border-white/10 hover:border-cyan-400/40 flex flex-col justify-between group overflow-hidden"
              style={{
                boxShadow: hoveredCard === ins.id 
                  ? `0 20px 45px -10px ${ins.glowColor}, 0 25px 50px -12px rgba(0,0,0,0.7)`
                  : '0 10px 25px -5px rgba(0,0,0,0.5)'
              }}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 group-hover:border-cyan-400/50 shadow-inner group-hover:scale-110 transition-transform">
                    {getInsuranceIcon(ins.icon)}
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-200 border border-white/10 font-mono">
                      {ins.badge}
                    </span>
                    {isEnrolled && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ACTIVE IN VAULT
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-1">
                  {ins.category}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {ins.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  {ins.subtitle}
                </p>

                {/* Metrics Highlight Pill */}
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 grid grid-cols-2 gap-2 my-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Max Protection</span>
                    <span className="text-base font-black font-mono text-white">{ins.maxCover}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Starting Premium</span>
                    <span className="text-base font-black font-mono text-cyan-300">{ins.startingFrom}</span>
                  </div>
                </div>

                {/* Feature Bullet Points */}
                <div className="space-y-2 mb-6">
                  {ins.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer & Instant Action */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span className="italic">{ins.claimSpeed}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onSelectInsurance(ins);
                  }}
                  className="w-full py-3 rounded-2xl text-xs font-bold tracking-wide bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 hover:from-cyan-500 hover:to-purple-600 text-cyan-200 hover:text-white border border-cyan-400/40 hover:border-transparent transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.15)] hover:shadow-floating-md flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95"
                >
                  <span>Get Instant Quote & Policy</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
