import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, Orbit } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';

export default function QuoteModal({ isOpen, onClose, insurance, onPolicyEnrolled }) {
  const [coverageMultiplier, setCoverageMultiplier] = useState(1);
  const [termYears, setTermYears] = useState(5);
  const [isEnrolling, setIsEnrolling] = useState(false);

  if (!isOpen || !insurance) return null;

  const basePrice = parseInt(insurance.startingFrom.replace(/\D/g, '')) || 35;
  const calculatedMonthly = Math.round(basePrice * coverageMultiplier);
  const calculatedAnnual = Math.round(calculatedMonthly * 12 * 0.9); // 10% discount

  const handleEnroll = () => {
    sound.playClick();
    setIsEnrolling(true);

    setTimeout(() => {
      setIsEnrolling(false);
      sound.playSuccess();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      onPolicyEnrolled({
        id: `AG-${insurance.id.slice(4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        title: insurance.title,
        coverage: insurance.maxCover,
        premium: `$${calculatedMonthly}/mo`
      });
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-400/40 shadow-floating-lg overflow-hidden my-8"
      >
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 block mb-1">
            {insurance.category}
          </span>
          <h2 className="text-2xl font-black text-white">{insurance.title}</h2>
          <p className="text-xs text-slate-300 mt-1">{insurance.subtitle}</p>
        </div>

        {/* Dynamic Calculator Controls */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Coverage Scale Limit</span>
              <span className="text-cyan-400 font-mono font-bold">
                {coverageMultiplier === 1 ? 'Standard (100%)' : coverageMultiplier === 1.5 ? 'Enhanced (150%)' : 'Titanium Quantum (200%)'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '100% Base', val: 1 },
                { label: '150% Super', val: 1.5 },
                { label: '200% Max', val: 2 }
              ].map((tier) => (
                <button
                  key={tier.val}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setCoverageMultiplier(tier.val);
                  }}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    coverageMultiplier === tier.val
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                      : 'bg-slate-900/50 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Protection Tenure ({termYears} Years)
            </label>
            <input
              type="range"
              min="1"
              max="15"
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Pricing Quote Summary Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900/80 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">Instant Calculated Premium</span>
              <div className="text-2xl font-black text-white font-mono flex items-baseline gap-1">
                ${calculatedMonthly}
                <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <span className="text-[10px] text-emerald-400">or ${calculatedAnnual}/year (Save 10%)</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              Zero Deductible
            </span>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-2 text-xs">
            {insurance.features.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleEnroll}
          disabled={isEnrolling}
          className="w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white shadow-floating-md hover:shadow-floating-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50"
        >
          {isEnrolling ? (
            <>
              <Orbit className="w-5 h-5 animate-spin text-white" />
              <span>Provisioning Smart Policy Vault...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-cyan-200" />
              <span>Enroll & Activate Coverage Instantly</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
