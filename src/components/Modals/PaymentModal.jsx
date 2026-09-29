import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, CheckCircle2, ShieldCheck, Zap, Orbit, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';

export default function PaymentModal({ isOpen, onClose, policy, onPaymentSuccess }) {
  const [method, setMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9012');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    sound.playClick();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      sound.playSuccess();

      // Launch zero-gravity confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#7f00ff', '#ffffff']
        });
      } catch {
        // ignore
      }

      setTimeout(() => {
        onPaymentSuccess({
          id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          policyName: policy.planName,
          policyNo: policy.policyNumber,
          amount: policy.annualPremium,
          type: 'Annual Premium Renewal',
          method: method === 'card' ? 'Quantum Shield Card (••• 9012)' : method === 'crypto' ? 'USDC-G Quantum Escrow' : 'Galactic Reserve UPI',
          status: 'Successful',
          receiptUrl: '#'
        });
        onClose();
        setIsDone(false);
      }, 1600);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-floating-lg overflow-hidden my-8"
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

        {!isDone ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-300">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Zero-G Premium Payment</h2>
                <p className="text-xs text-slate-400">
                  Policy: <span className="font-mono text-cyan-300">{policy.policyNumber}</span>
                </p>
              </div>
            </div>

            {/* Payment Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Annual Premium Due</span>
                <span className="text-2xl font-black text-white font-mono flex items-center">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  {policy.annualPremium.toLocaleString()} <span className="text-xs font-normal text-slate-400 ml-1">/ Year</span>
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Instant Auto-Receipt
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Select Transmission Channel
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'card', label: 'Quantum Card', icon: '💳' },
                  { id: 'crypto', label: 'Crypto-Credits', icon: '⚡' },
                  { id: 'upi', label: 'Space UPI', icon: '🌐' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setMethod(item.id);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      method === item.id
                        ? 'bg-purple-500/25 border-purple-400 text-white shadow-[0_0_15px_rgba(184,0,230,0.3)]'
                        : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-lg mb-1">{item.icon}</div>
                    <div className="text-xs font-semibold">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Card / Details input */}
            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                  Card Number / Payment ID
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                    Valid Thru
                  </label>
                  <input
                    type="text"
                    defaultValue="11/32"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                    CVV Security Code
                  </label>
                  <input
                    type="password"
                    defaultValue="894"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide bg-gradient-to-r from-purple-500 via-pink-600 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white shadow-floating-md hover:shadow-floating-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Orbit className="w-5 h-5 animate-spin text-white" />
                  <span>Processing Gravitational Settlement...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span>Authorize & Pay ${policy.annualPremium.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">Payment Authorized!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Your premium payment of ${policy.annualPremium.toLocaleString()} has been safely recorded on the orbital ledger. Policy remains in full force.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
