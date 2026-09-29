import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldAlert, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Orbit, 
  Sparkles,
  AlertTriangle,
  Fingerprint
} from 'lucide-react';
import { sound } from '../../utils/audio';

export default function ClaimModal({ isOpen, onClose, policy, user, onClaimSubmitted }) {
  const [claimType, setClaimType] = useState('Critical Illness Acceleration');
  const [claimAmount, setClaimAmount] = useState('50000');
  const [incidentDate, setIncidentDate] = useState('2026-09-28');
  const [description, setDescription] = useState('Atmospheric pressure differential caused severe pulmonary strain during sub-orbital orbital transit.');
  const [isBiometricVerified, setIsBiometricVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filesAttached, setFilesAttached] = useState([
    { name: 'ZeroG_Telemetry_Diagnostic_Report.pdf', size: '2.4 MB' },
    { name: 'Hospital_Admission_Notice_MarsOrbit.pdf', size: '1.1 MB' }
  ]);

  if (!isOpen) return null;

  const handleSimulateBiometrics = () => {
    sound.playClick();
    setIsBiometricVerified(true);
    sound.playSuccess();
  };

  const handleSubmitClaim = (e) => {
    e.preventDefault();
    sound.playClick();

    if (!isBiometricVerified) {
      alert('Please perform Biometric Quantum Verification before filing claim.');
      return;
    }

    setIsSubmitting(true);
    sound.playWarp();

    setTimeout(() => {
      setIsSubmitting(false);
      sound.playSuccess();
      const newClaim = {
        id: `CLM-LIFE-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        type: 'Life Insurance Claim',
        policyNo: policy.policyNumber,
        title: `${claimType} - ${user.name}`,
        amount: Number(claimAmount),
        status: 'Under Gravitational Audit',
        settlementDate: 'Expected within 48 Hours',
        paymentMode: 'Direct Quantum Escrow Payout',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      };

      onClaimSubmitted(newClaim);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-floating-lg overflow-hidden my-8"
      >
        {/* Glow ambient header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500" />
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Initiate Zero-G Policy Claim
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Instant AI Escrow
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Policy ID: <span className="font-mono text-cyan-300">{policy.policyNumber}</span> • Max Claimable: <span className="text-emerald-400 font-bold">${policy.claimableAmount.toLocaleString()}</span>
            </p>
          </div>
        </div>

        {/* Claim Form */}
        <form onSubmit={handleSubmitClaim} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Claim Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Claim Category
              </label>
              <select
                value={claimType}
                onChange={(e) => setClaimType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
              >
                <option value="Critical Illness Acceleration">Critical Illness Acceleration ($100,000)</option>
                <option value="Zero-G Total Disability Benefit">Zero-G Total Disability Benefit ($500,000)</option>
                <option value="Atmospheric Hazard Rescue">Atmospheric Hazard Rescue ($75,000)</option>
                <option value="Nominee Death Benefit Execution">Nominee Death Benefit Execution ($1,250,000)</option>
              </select>
            </div>

            {/* Claim Amount */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Claim Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-mono text-sm">$</span>
                <input
                  type="number"
                  max={policy.claimableAmount}
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Incident Date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Incident Stardate / Occurrence
            </label>
            <input
              type="date"
              value={incidentDate}
              onChange={(e) => setIncidentDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Incident Telemetry & Medical Details
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
              placeholder="Provide event notes..."
            />
          </div>

          {/* Supporting Evidence Simulation */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Evidence & Telemetry Attachments ({filesAttached.length} Attached)
            </label>
            <div className="space-y-2 mb-2">
              {filesAttached.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-white/5 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>{file.name}</span>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px]">{file.size}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setFilesAttached([...filesAttached, { name: `Telemetry_Scan_Log_${Date.now().toString().slice(-4)}.pdf`, size: '1.8 MB' }]);
              }}
              className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-200 text-xs flex items-center justify-center gap-2 transition-all bg-white/[0.02] hover:bg-cyan-500/[0.05]"
            >
              <UploadCloud className="w-4 h-4 text-cyan-400" />
              <span>+ Add Additional Diagnostic File</span>
            </button>
          </div>

          {/* Biometric Verification Simulation */}
          <div className={`p-4 rounded-2xl border transition-all ${
            isBiometricVerified 
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
              : 'bg-slate-900/60 border-purple-500/30 text-purple-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Fingerprint className={`w-6 h-6 ${isBiometricVerified ? 'text-emerald-400' : 'text-purple-400 animate-pulse'}`} />
                <div>
                  <div className="text-xs font-bold">
                    {isBiometricVerified ? 'Biometrics Quantum-Verified' : 'Biometric Identity Confirmation'}
                  </div>
                  <div className="text-[11px] opacity-75">
                    {isBiometricVerified ? 'Authenticated with Quantum ID Key: QID-9921-OK' : 'Requires policyholder neural / biometric validation'}
                  </div>
                </div>
              </div>
              {!isBiometricVerified ? (
                <button
                  type="button"
                  onClick={handleSimulateBiometrics}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-[0_0_15px_rgba(184,0,230,0.3)]"
                >
                  Verify Now
                </button>
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white shadow-floating-md hover:shadow-floating-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Orbit className="w-5 h-5 animate-spin text-white" />
                  <span>Submitting to Gravitational Escrow...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
                  <span>Transmit Claim to Quantum Escrow (${Number(claimAmount).toLocaleString()})</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
