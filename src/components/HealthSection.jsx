import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, 
  Bed, 
  PlaneTakeoff, 
  Cpu, 
  Activity, 
  Search, 
  MapPin, 
  Star, 
  PhoneCall, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  QrCode,
  Users,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function HealthSection({ 
  healthPolicy, 
  hospitals, 
  user, 
  onRaiseClaim,
  addToast 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [preAuthRequested, setPreAuthRequested] = useState({});

  const categories = ['All', 'Orbital Station', 'Trauma Center', 'Cyber-Surgical', 'General'];

  const filteredHospitals = hospitals.filter((hosp) => {
    const matchesSearch = hosp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hosp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hosp.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || hosp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRequestPreAuth = (hosp) => {
    sound.playClick();
    setPreAuthRequested(prev => ({ ...prev, [hosp.id]: true }));
    sound.playSuccess();
    addToast({
      title: 'Cashless Pre-Auth Transmitted',
      message: `Direct cashless token generated for ${hosp.name}. Priority check-in ready.`,
      type: 'success'
    });
  };

  const getCoverageIcon = (iconName) => {
    switch(iconName) {
      case 'Bed': return <Bed className="w-5 h-5 text-cyan-400" />;
      case 'PlaneTakeoff': return <PlaneTakeoff className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-400" />;
      default: return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Section: Health Hero & 3D Holographic Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Plan Summary Info */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>Zero-G Cashless Global Network Active</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Quantum Health Shield
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Ultra-fast biometric hospitalization cover with 100% cashless treatment across all certified Earth, Lunar, and Orbital space stations.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Total Sum Insured</span>
              <span className="text-lg font-bold font-mono text-white">${healthPolicy.sumInsured.toLocaleString()}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Available Balance</span>
              <span className="text-lg font-bold font-mono text-cyan-300">${healthPolicy.availableBalance.toLocaleString()}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Deductible</span>
              <span className="text-lg font-bold font-mono text-emerald-400">$0 (Zero Co-Pay)</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Flip Holographic Health Card */}
        <div className="lg:col-span-6 flex justify-center perspective-[1200px]">
          <div className="w-full max-w-md">
            <motion.div
              onClick={() => {
                sound.playClick();
                setIsCardFlipped(!isCardFlipped);
              }}
              animate={{ rotateY: isCardFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: 'spring', damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative aspect-[1.65/1] w-full rounded-3xl p-6 sm:p-7 border border-cyan-400/40 shadow-floating-lg cursor-pointer select-none group"
            >
              {/* FRONT OF HEALTH CARD */}
              <div 
                style={{ backfaceVisibility: 'hidden' }}
                className="absolute inset-0 rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-cyan-950/90 via-slate-900/90 to-purple-950/90 backdrop-blur-2xl border border-cyan-400/40 shadow-[0_0_30px_rgba(0,242,254,0.2)] overflow-hidden"
              >
                {/* Holographic glowing lines */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      <HeartPulse className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-cyan-400">Zero-G Cashless Pass</div>
                      <div className="text-base font-black text-white">AURA HEALTH SHIELD</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    VIP CASHLINK
                  </span>
                </div>

                <div className="relative z-10 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Member Identification</div>
                  <div className="text-lg sm:text-xl font-black font-mono text-cyan-200 tracking-wider">
                    {healthPolicy.policyNumber}
                  </div>
                  <div className="text-xs font-semibold text-white">{user.name} (Primary Beneficiary)</div>
                </div>

                <div className="flex items-center justify-between relative z-10 pt-2 border-t border-white/10 text-[11px]">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Sum Insured</span>
                    <span className="font-bold text-white font-mono">${healthPolicy.sumInsured.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Valid Thru</span>
                    <span className="font-bold text-white font-mono">{healthPolicy.validity}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-300 font-bold flex items-center gap-1 group-hover:scale-105 transition-transform">
                      <RefreshCw className="w-3 h-3" /> Flip Card
                    </span>
                  </div>
                </div>
              </div>

              {/* BACK OF HEALTH CARD */}
              <div 
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
                className="absolute inset-0 rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-slate-900/95 via-purple-950/95 to-slate-950/95 backdrop-blur-2xl border border-purple-400/40 shadow-[0_0_30px_rgba(184,0,230,0.2)] overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <div className="text-xs font-bold text-white">Emergency TPA Direct Desk</div>
                    <div className="text-[10px] text-slate-400 font-mono">TPA ID: {healthPolicy.tpaId}</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/10">
                    <QrCode className="w-8 h-8 text-cyan-300" />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Emergency SOS Hotline:</span>
                    <span className="font-mono text-cyan-300 font-bold">+1-800-ZERO-MED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Family Members:</span>
                    <span className="text-white font-medium">{healthPolicy.coveredMembers.length} Insured</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Atmospheric Evac:</span>
                    <span className="text-emerald-400 font-bold">Included ($250k)</span>
                  </div>
                </div>

                <div className="text-center pt-2 border-t border-white/10 text-[11px] text-cyan-300 font-medium">
                  Click anywhere to flip back
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Health Claim Status Tracker HUD */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-floating-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
              <Clock className="w-6 h-6 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold">
                Active Hospitalization Claim Tracker
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                {healthPolicy.activeClaim.claimId}
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  Step {healthPolicy.activeClaim.currentStep} of 4
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Hospital: <strong className="text-slate-200">{healthPolicy.activeClaim.hospital}</strong> • Amount: <span className="font-mono text-emerald-400 font-bold">${healthPolicy.activeClaim.amountClaimed.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onRaiseClaim();
            }}
            className="px-5 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0"
          >
            <Zap className="w-4 h-4 text-yellow-300" />
            <span>+ Raise New Hospital Claim</span>
          </button>
        </div>

        {/* 4-Step Interactive Progress Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4 relative pt-2">
          {healthPolicy.activeClaim.stepNames.map((stepName, idx) => {
            const stepNumber = idx + 1;
            const isCompleted = stepNumber < healthPolicy.activeClaim.currentStep;
            const isCurrent = stepNumber === healthPolicy.activeClaim.currentStep;
            
            return (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    : isCurrent
                    ? 'bg-cyan-950/40 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(0,242,254,0.25)] ring-1 ring-cyan-400/40 animate-pulse'
                    : 'bg-slate-900/40 border-white/5 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    Stage 0{stepNumber}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                  ) : (
                    <span className="text-xs">○</span>
                  )}
                </div>
                <div className="text-xs font-bold leading-snug">{stepName}</div>
                <div className="text-[10px] mt-2 opacity-75 font-mono">
                  {isCompleted ? 'Completed' : isCurrent ? 'Active Audit (85%)' : 'Upcoming Stage'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coverages Breakdown Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Comprehensive Health Coverages
            </h2>
            <p className="text-xs text-slate-400">
              Zero co-pay, zero room rent cap, and instant pre-authorizations
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">5 Active Protections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {healthPolicy.coverages.map((cov) => (
            <div 
              key={cov.id}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 w-fit mb-3">
                  {getCoverageIcon(cov.icon)}
                </div>
                <h3 className="font-bold text-white text-sm leading-snug mb-1">
                  {cov.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {cov.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-cyan-300">{cov.limit}</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {cov.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cashless Hospital Network Directory */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Cashless Hospital Network
            </h2>
            <p className="text-xs text-slate-400">
              Locate partner medical facilities with direct instant cashless approval desks
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search hospitals or specialty..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                  : 'bg-slate-900/40 border border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredHospitals.map((hosp) => {
            const hasRequested = preAuthRequested[hosp.id];

            return (
              <div
                key={hosp.id}
                className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 block mb-1">
                        {hosp.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {hosp.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{hosp.location} ({hosp.distance})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{hosp.rating}</span>
                    </div>
                  </div>

                  {/* Bed & ICU availability */}
                  <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-2xl bg-slate-900/50 border border-white/5 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">General Beds Free</span>
                      <span className="font-bold text-emerald-400 font-mono">{hosp.bedsAvailable} Available</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">ICU / Trauma Bays</span>
                      <span className="font-bold text-cyan-300 font-mono">{hosp.icuAvailable} Beds</span>
                    </div>
                  </div>

                  {/* Specialties tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {hosp.specialties.map((spec, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-white/5 text-[10px] text-slate-300 border border-white/5">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hospital Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-mono">{hosp.contact}</span>
                  </div>

                  <button
                    onClick={() => handleRequestPreAuth(hosp)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      hasRequested
                        ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : 'bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                    }`}
                  >
                    {hasRequested ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Pre-Auth Granted</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Request Cashless Pre-Auth</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
