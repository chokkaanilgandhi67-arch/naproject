import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-md w-full px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`pointer-events-auto p-4 rounded-2xl glass-panel border flex items-start gap-3 backdrop-blur-2xl shadow-floating-md ${
                isSuccess
                  ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-100 shadow-[0_0_25px_rgba(0,242,254,0.2)]'
                  : isError
                  ? 'border-rose-500/40 bg-rose-950/40 text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.2)]'
                  : 'border-purple-500/40 bg-purple-950/40 text-purple-100 shadow-[0_0_25px_rgba(184,0,230,0.2)]'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
                {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
                {!isSuccess && !isError && <Info className="w-5 h-5 text-purple-400" />}
              </div>

              <div className="flex-1 pr-2">
                <div className="text-sm font-semibold tracking-wide">{toast.title}</div>
                {toast.message && (
                  <p className="text-xs mt-1 text-slate-300 leading-relaxed">{toast.message}</p>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
