import { motion } from 'framer-motion';
import { X, Award, Download, Printer, ShieldCheck, QrCode } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function CertificateModal({ isOpen, onClose, policy, user }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    sound.playSuccess();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-10 border border-cyan-400/40 shadow-floating-lg overflow-hidden my-8"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Canvas Container */}
        <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 border-2 border-cyan-500/40 shadow-inner overflow-hidden hologram-scan">
          {/* Spatial watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Award className="w-96 h-96 text-cyan-400" />
          </div>

          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-5 mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="text-[10px] tracking-widest uppercase font-mono text-cyan-400">
                  Global Space-Flight Insurance Regulatory Authority
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  CERTIFICATE OF LIFE ASSURANCE
                </h1>
                <div className="text-xs text-slate-400">
                  Zero-G Atmospheric & Orbital Risk Underwriting
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs font-mono text-cyan-400 font-bold">
                {policy.policyNumber}
              </div>
              <div className="text-[11px] text-slate-400">
                Issue Date: {policy.issueDate}
              </div>
              <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                STATUS: IN FULL FORCE
              </span>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="space-y-5 text-sm text-slate-300">
            <p className="leading-relaxed">
              This certifies that <strong className="text-white text-base font-semibold">{user.name}</strong>, residing at{' '}
              <span className="text-cyan-200">{user.address}</span>, is comprehensively secured under the{' '}
              <strong className="text-cyan-400">{policy.planName}</strong> with all zero-gravity risk protections activated.
            </p>

            {/* Key Information Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900/60 border border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Total Sum Assured</span>
                <span className="text-base font-bold text-white font-mono">${policy.sumAssured.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Claimable Entitlement</span>
                <span className="text-base font-bold text-emerald-400 font-mono">${policy.claimableAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Maturity / Expiry</span>
                <span className="text-base font-bold text-white font-mono">{policy.expiryDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Primary Nominee</span>
                <span className="text-base font-bold text-cyan-300">{policy.nomineeName} ({policy.nomineeShare})</span>
              </div>
            </div>

            {/* Active Endorsements / Riders */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Certified Spaceflight & Habitation Riders:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {policy.riders.map((rider, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{rider}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Stamps & Signatures */}
            <div className="border-t border-white/10 pt-5 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <QrCode className="w-12 h-12 text-cyan-300" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Quantum Hash Cryptographic Seal</div>
                  <div className="text-[10px] font-mono text-slate-400">0x89F4A...B210C (Verified On-Chain)</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-serif italic text-cyan-300 text-sm tracking-wider">
                  M. Thorne-Vance, Underwriting Chief
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">
                  Autonomous Risk Syndicate (Zurich Hub)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            Close Viewer
          </button>
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download / Print Holographic PDF</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
