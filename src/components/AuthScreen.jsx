import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Smartphone, 
  User, 
  Sparkles, 
  ArrowRight, 
  KeyRound, 
  Orbit, 
  CheckCircle,
  HelpCircle,
  Zap
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function AuthScreen({ onLoginSuccess, addToast }) {
  // mode: 'register' or 'login'
  const [authMode, setAuthMode] = useState('register');
  
  // Registration form state
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('Male');

  // Login form state
  const [loginMobile, setLoginMobile] = useState('');

  // Step: 'form' or 'otp'
  const [step, setStep] = useState('form');
  
  // OTP input state (4 digits)
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Hardcoded test OTP as requested in master prompt
  const MOCK_OTP = '1234';

  const handleSendOtp = (e) => {
    e.preventDefault();
    sound.playClick();

    if (authMode === 'register') {
      if (!name.trim()) {
        addToast({ title: 'Name Required', message: 'Please enter your full name to initiate zero-g policy account.', type: 'error' });
        return;
      }
      if (!mobile.trim() || mobile.length < 7) {
        addToast({ title: 'Invalid Mobile Number', message: 'Please provide a valid communication frequency / mobile number.', type: 'error' });
        return;
      }
    } else {
      if (!loginMobile.trim() || loginMobile.length < 7) {
        addToast({ title: 'Invalid Mobile Number', message: 'Please enter your registered mobile number.', type: 'error' });
        return;
      }
    }

    sound.playWarp();
    setStep('otp');
    setOtp(['', '', '', '']);
    setOtpError('');
    addToast({
      title: 'Zero-G Token Dispatched',
      message: `Auth verification code sent. Default mock OTP is ${MOCK_OTP}.`,
      type: 'info'
    });
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const autofillOtp = () => {
    sound.playClick();
    setOtp(MOCK_OTP.split(''));
    setOtpError('');
  };

  const verifyOtp = (e) => {
    if (e) e.preventDefault();
    const enteredOtp = otp.join('');
    sound.playClick();

    if (enteredOtp.length < 4) {
      setOtpError('Please enter all 4 digits of the token.');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      if (enteredOtp === MOCK_OTP) {
        sound.playSuccess();
        addToast({
          title: 'Gravitational Authentication Verified',
          message: 'Welcome aboard the Anti-Gravity Portal!',
          type: 'success'
        });

        // Pass user profile up
        if (authMode === 'register') {
          onLoginSuccess({
            name: name.trim(),
            mobile: mobile.trim(),
            gender: gender,
            email: `${name.toLowerCase().replace(/\s+/g, '.')}@quantum-orbit.io`,
            address: 'Neo-Olympus Habitat Sector 7, Mars Gateway, Suite 402',
            avatar: gender === 'Female' 
              ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
              : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
          });
        } else {
          onLoginSuccess({
            name: 'Commander Alex Vance',
            mobile: loginMobile.trim() || '+1 (555) 839-2041',
            gender: 'Male',
            email: 'alex.vance@orion-shield.io',
            address: 'Orbital Habitat Sector 7, Neo-Olympus Gateway 04, Mars Orbit C-19',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
          });
        }
      } else {
        setOtpError(`Invalid Token! Use test token: ${MOCK_OTP}`);
        addToast({
          title: 'Verification Failed',
          message: `The entered code is incorrect. Use ${MOCK_OTP}.`,
          type: 'error'
        });
      }
    }, 600);
  };

  const handleQuickDemoPilot = () => {
    sound.playWarp();
    setName('Commander Alex Vance');
    setMobile('+1 (555) 839-2041');
    setGender('Male');
    setAuthMode('register');
    setStep('otp');
    setOtp(['1', '2', '3', '4']);
    addToast({
      title: 'Demo Pilot Loaded',
      message: 'Alex Vance profile initialized with test OTP 1234.',
      type: 'info'
    });
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center p-4 z-10">
      {/* Decorative zero-g floating rings in background */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-cyan-500/10 pointer-events-none animate-orbit-spin opacity-40" />
      <div className="absolute w-[650px] h-[650px] rounded-full border border-purple-500/10 pointer-events-none animate-float-reverse opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="w-full max-w-lg relative"
      >
        {/* Anti-gravity Outer Ambient Aura Glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-purple-600/30 to-blue-500/30 blur-xl opacity-75 animate-pulse-glow" />

        {/* Main Floating Glass Panel Card */}
        <div className="relative glass-panel rounded-3xl p-6 sm:p-9 border border-white/15 backdrop-blur-2xl shadow-floating-lg">
          {/* Header Branding */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 mb-3 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.3)] animate-float-slow">
              <Orbit className="w-8 h-8 animate-spin" style={{ animationDuration: '15s' }} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight cosmic-gradient-text">
              AURA ZERO-G
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-light tracking-wide">
              Spatial Zero-Gravity Policy Claims & Insurance Vault
            </p>
          </div>

          {/* Quick Demo Pilot Pill Button for Instant Testing */}
          <div className="mb-6 flex justify-center">
            <button
              onClick={handleQuickDemoPilot}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-400/40 text-cyan-300 hover:text-white hover:border-cyan-300 hover:bg-cyan-500/25 transition-all shadow-[0_0_15px_rgba(0,242,254,0.15)] group"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>⚡ One-Click Pilot Quick Access (Demo)</span>
            </button>
          </div>

          {/* Auth Mode Toggle Tabs (Only shown in 'form' step) */}
          {step === 'form' && (
            <div className="flex p-1 rounded-2xl bg-slate-900/60 border border-white/10 mb-6 backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setAuthMode('register');
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  authMode === 'register'
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/20 text-white border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account (New Pilot)
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setAuthMode('login');
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  authMode === 'login'
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/20 text-white border border-purple-400/40 shadow-[0_0_15px_rgba(184,0,230,0.25)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Existing Pilot Login
              </button>
            </div>
          )}

          {/* Form Step: Registration or Login */}
          <AnimatePresence mode="wait">
            {step === 'form' ? (
              <motion.form
                key="auth-form"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                onSubmit={handleSendOtp}
                className="space-y-4"
              >
                {authMode === 'register' ? (
                  <>
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Full Legal Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4 text-cyan-400" />
                        </div>
                        <input
                          id="register-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Vance"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Smartphone className="w-4 h-4 text-cyan-400" />
                        </div>
                        <input
                          id="register-mobile"
                          type="tel"
                          required
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="e.g. +1 555-019-4829"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Gender Selector as per requirements */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Gender
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {['Male', 'Female', 'Other'].map((g) => {
                          const isSelected = gender === g;
                          return (
                            <button
                              key={g}
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setGender(g);
                              }}
                              className={`py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                                isSelected
                                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                                  : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                              }`}
                            >
                              {isSelected && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
                              <span>{g}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Existing User Login: Mobile input */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Registered Mobile Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Smartphone className="w-4 h-4 text-purple-400" />
                        </div>
                        <input
                          id="login-mobile"
                          type="tel"
                          required
                          value={loginMobile}
                          onChange={(e) => setLoginMobile(e.target.value)}
                          placeholder="e.g. +1 (555) 839-2041"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all shadow-inner"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5">
                        Enter your registered mobile frequency to receive an instant Zero-G security code.
                      </p>
                    </div>
                  </>
                )}

                {/* Submit button: Send OTP */}
                <button
                  type="submit"
                  id="send-otp-btn"
                  className="w-full mt-4 py-3.5 rounded-2xl font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-floating-md hover:shadow-floating-lg transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <span>Send Zero-G OTP</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            ) : (
              /* Step 2: OTP Verification Screen */
              <motion.div
                key="otp-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-5"
              >
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 mb-2">
                    <KeyRound className="w-6 h-6 animate-pulse" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Quantum Token Verification</h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Enter the 4-digit zero-gravity security code sent to{' '}
                    <span className="text-cyan-400 font-medium">
                      {authMode === 'register' ? mobile : loginMobile || '+1 (555) 839-2041'}
                    </span>
                  </p>
                </div>

                {/* Prompt requirement: Hardcode default mock OTP (1234) showing on screen as a hint */}
                <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-400/40 flex items-center justify-between shadow-[0_0_20px_rgba(0,242,254,0.15)]">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
                    <div>
                      <div className="text-xs font-semibold text-cyan-200">Default Mock Token Hint</div>
                      <div className="text-[11px] text-cyan-300/80">
                        Use testing OTP: <strong className="text-cyan-100 font-mono tracking-widest text-sm bg-cyan-500/20 px-1.5 py-0.5 rounded border border-cyan-400/40">1234</strong>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={autofillOtp}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-200 border border-cyan-400/30 transition-all hover:scale-105"
                  >
                    Auto-fill
                  </button>
                </div>

                {/* 4-Digit Input Boxes */}
                <div className="flex justify-center gap-3 sm:gap-4 my-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      autoFocus={index === 0}
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-black rounded-2xl bg-slate-900/80 border border-cyan-500/40 text-white focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.1)] transition-all font-mono"
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="text-xs text-rose-400 text-center font-medium animate-shake">
                    {otpError}
                  </p>
                )}

                {/* Verify Button */}
                <button
                  type="button"
                  id="verify-otp-btn"
                  disabled={isVerifying}
                  onClick={verifyOtp}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white shadow-floating-md hover:shadow-floating-lg transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <Orbit className="w-5 h-5 animate-spin text-white" />
                      <span>Verifying Quantum Telemetry...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Verify & Enter Zero-G Portal</span>
                    </>
                  )}
                </button>

                {/* Back button */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setStep('form');
                    }}
                    className="text-xs text-slate-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
                  >
                    ← Change Phone Frequency or Profile
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer telemetry note */}
          <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              Gravity Shield: 0.00 G Active
            </span>
            <span>256-bit Holographic Encryption</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
