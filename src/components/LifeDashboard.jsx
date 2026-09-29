import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  FileText, 
  UserCheck, 
  TrendingUp, 
  DollarSign, 
  Copy, 
  Check, 
  ExternalLink,
  Zap,
  Award,
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function LifeDashboard({ 
  policy, 
  user, 
  onOpenClaimModal, 
  onOpenCertificateModal,
  onOpenPaymentModal,
  onNavigateTab,
  addToast 
}) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // 3D Zero-G floating tilt interaction on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const copyPolicyNumber = () => {
    sound.playClick();
    navigator.clipboard.writeText(policy.policyNumber);
    setCopied(true);
    addToast({
      title: 'Policy ID Copied',
      message: `${policy.policyNumber} copied to clipboard buffer.`,
      type: 'success'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome HUD Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.3)]"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                {user.tier || 'Titanium Pilot'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
              {user.address}
            </p>
          </div>
        </div>

        {/* Global Quick Action Stat Pills */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="px-3.5 py-2 rounded-2xl bg-slate-900/60 border border-white/10 text-right">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Gravity Status</span>
            <span className="text-xs font-bold text-cyan-300 flex items-center justify-end gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              0.00 G (Weightless)
            </span>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-slate-900/60 border border-white/10 text-right">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Claim Solvency</span>
            <span className="text-xs font-bold text-emerald-400">100% Guaranteed</span>
          </div>
        </div>
      </div>

      {/* PRIMARY REQUIRED COMPONENT: Page 1 Floating Glass Card for Life Insurance */}
      <div className="perspective-[1200px]">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.15s ease-out'
          }}
          className="relative rounded-3xl p-6 sm:p-10 glass-card-holo border border-cyan-400/30 shadow-floating-lg group overflow-hidden"
        >
          {/* Spatial Holographic Top Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 border border-cyan-400/40 text-cyan-300 shadow-[0_0_25px_rgba(0,242,254,0.3)] animate-float-slow">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-semibold block">
                  Primary Life Policy
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {policy.planName}
                </h2>
                <div className="text-xs text-slate-400">
                  Underwritten by {policy.underwriter}
                </div>
              </div>
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {policy.status}
              </span>
            </div>
          </div>

          {/* Core Policy Metrics Grid (Claimable Amount, Expiry Date, Policy No, Holder Name & Address) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
            {/* 1. Policyholder & Habitat Address */}
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
                Policyholder & Habitat
              </span>
              <div className="text-base font-bold text-white">
                {user.name}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {user.address}
              </p>
            </div>

            {/* 2. Life Insurance Policy Number */}
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
                Policy Identification No.
              </span>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black font-mono text-cyan-300 tracking-wide">
                  {policy.policyNumber}
                </span>
                <button
                  type="button"
                  onClick={copyPolicyNumber}
                  title="Copy Policy Number"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[10px] text-slate-400">Biometric Verification: Enabled</span>
            </div>

            {/* 3. Expiry Date */}
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
                Coverage Expiry Date
              </span>
              <div className="text-base sm:text-lg font-black font-mono text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                {policy.expiryDate}
              </div>
              <span className="text-[11px] text-purple-300 font-medium">
                12 Years Remaining (Continuous Escrow)
              </span>
            </div>

            {/* 4. Claimable Amount (Entitled amount status) */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-purple-950/40 border border-cyan-400/40 shadow-[0_0_25px_rgba(0,242,254,0.15)] space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-300 font-bold block">
                Entitled Claimable Amount
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white flex items-baseline">
                <DollarSign className="w-6 h-6 text-emerald-400 -mr-1" />
                {policy.claimableAmount.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" />
                100% Active in Quantum Escrow
              </div>
            </div>
          </div>

          {/* Interactive Claim Action Buttons with Floating Glow Effects (As requested in Master Prompt) */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3.5">
            {/* Primary Action Button: Initiate Zero-G Claim */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenClaimModal();
              }}
              className="px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.6)] transition-all duration-300 flex items-center gap-2.5 active:scale-95 group"
            >
              <Zap className="w-4 h-4 text-yellow-300 group-hover:scale-125 transition-transform" />
              <span>⚡ Initiate Zero-G Claim</span>
            </button>

            {/* Secondary Action: Download / View Policy Certificate */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenCertificateModal();
              }}
              className="px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-cyan-200 hover:text-white bg-slate-900/60 hover:bg-cyan-500/20 border border-cyan-400/40 hover:border-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.15)] transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Policy Certificate</span>
            </button>

            {/* Pay / Renew Premium */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenPaymentModal();
              }}
              className="px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-purple-200 hover:text-white bg-slate-900/60 hover:bg-purple-500/20 border border-purple-400/40 hover:border-purple-300 shadow-[0_0_15px_rgba(184,0,230,0.15)] transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <DollarSign className="w-4 h-4 text-purple-400" />
              <span>Pay Annual Premium (${policy.annualPremium})</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Auxiliary Floating Bento Cards: Nominee, Coverage Growth, and Next Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Nominee & Beneficiary Card */}
        <div className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-300">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Nominee Security</h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">100% Allocation</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-white/5 space-y-1">
            <div className="text-sm font-bold text-white">{policy.nomineeName}</div>
            <div className="text-xs text-purple-300 font-medium">Relationship: {policy.nomineeRelation}</div>
            <div className="text-[11px] text-slate-400">Emergency Phone: {policy.nomineeContact}</div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Beneficiary payouts execute instantaneously to nominee wallet upon automated death benefit trigger.
          </p>
        </div>

        {/* Wealth Accumulation & Bonus Trajectory */}
        <div className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Coverage Growth</h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-300 font-bold">+8.4% APY</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Accumulated Bonus</span>
            <div className="text-xl font-bold font-mono text-cyan-300">
              +${policy.accumulatedBonus.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400">Added to total guaranteed death benefit</div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Zero-gravity investment bond compounding in orbital sovereign liquidity funds.
          </p>
        </div>

        {/* Switch to Health & Explore Section CTA */}
        <div className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Health Shield Status</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your comprehensive cashless health plan with 4 top-tier orbital stations is active with $500,000 cover.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNavigateTab('health');
            }}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Switch to Health Section</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
