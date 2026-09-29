import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  History, 
  CreditCard, 
  User, 
  Search, 
  LogOut, 
  Camera, 
  Check, 
  ExternalLink, 
  FileText, 
  DollarSign, 
  ShieldCheck, 
  Download,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function DrawerMenu({ 
  isOpen, 
  onClose, 
  user, 
  onUpdateUser,
  history, 
  payments, 
  insurances, 
  onSelectPolicyFromSearch,
  onOpenPaymentModal,
  onLogout,
  addToast 
}) {
  // Current active view in drawer: 'menu', 'history', 'payments', 'profile', 'search'
  const [activeTab, setActiveTab] = useState('search');
  
  // Profile edit state
  const [editName, setEditName] = useState(user.name);
  const [editMobile, setEditMobile] = useState(user.mobile);
  const [editEmail, setEditEmail] = useState(user.email || '');
  const [editAddress, setEditAddress] = useState(user.address || '');
  const [editGender, setEditGender] = useState(user.gender || 'Male');
  const [editEmergency, setEditEmergency] = useState(user.emergencyContact || '');
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const fileInputRef = useRef(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Handle local avatar photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      sound.playClick();
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target.result);
        sound.playSuccess();
        addToast({
          title: 'Profile Photo Loaded',
          message: 'Avatar preview updated. Click Save Profile to apply.',
          type: 'info'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    sound.playClick();
    onUpdateUser({
      ...user,
      name: editName,
      mobile: editMobile,
      email: editEmail,
      address: editAddress,
      gender: editGender,
      emergencyContact: editEmergency,
      avatar: avatarPreview
    });
    sound.playSuccess();
    addToast({
      title: 'Profile Updated',
      message: 'Personal details and credentials safely updated in the vault.',
      type: 'success'
    });
  };

  // Filtered search results
  const searchResults = insurances.filter(ins => 
    ins.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ins.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ins.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ins.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          sound.playClick();
          onClose();
        }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Floating Sliding Drawer from Right */}
      <motion.div
        initial={{ x: '100%', opacity: 0.8 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0.8 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="relative w-full max-w-lg h-full glass-panel border-l border-white/10 shadow-floating-lg flex flex-col justify-between overflow-hidden bg-[#070b19]/95 z-10"
      >
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={avatarPreview || user.avatar}
                alt={user.name}
                className="w-11 h-11 rounded-xl object-cover border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.25)]"
              />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border border-slate-900" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-snug">{user.name}</div>
              <div className="text-[11px] text-cyan-300 font-mono">{user.tier || 'Titanium Pilot'}</div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Navigation Tabs inside Drawer */}
        <div className="px-5 pt-4 pb-2 border-b border-white/5">
          <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-900/60 border border-white/10">
            {[
              { id: 'search', label: 'Search', icon: Search },
              { id: 'history', label: 'History', icon: History },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'profile', label: 'Profile', icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`py-2 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 transition-all ${
                    isActive
                      ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/30 shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Drawer Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: LIVE SEARCH INSURANCE */}
          {activeTab === 'search' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <span>Search Insurance Ecosystem</span>
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">{searchResults.length} Products</span>
              </div>

              {/* Search Bar Input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search policies, motor, travel, medical..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              {/* Results List */}
              <div className="space-y-3 pt-2">
                {searchResults.map((ins) => (
                  <div
                    key={ins.id}
                    onClick={() => {
                      sound.playClick();
                      onSelectPolicyFromSearch(ins);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-slate-900/50 hover:bg-cyan-950/40 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer group space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">{ins.category}</span>
                      <span className="text-xs font-mono font-bold text-white">{ins.startingFrom}</span>
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors flex items-center justify-between">
                      <span>{ins.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{ins.subtitle}</p>
                  </div>
                ))}

                {searchResults.length === 0 && (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No insurance found matching "{searchQuery}".
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INSURANCE HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-purple-400" />
                  <span>Claim & Policy Log History</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">All Validated</span>
              </div>

              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-2 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-300 font-bold">{item.id}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${item.badgeColor || 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'}`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-white">{item.title}</div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1 border-t border-white/5 font-mono">
                      <div>Date: {item.date}</div>
                      <div className="text-right text-emerald-400 font-bold">${item.amount.toLocaleString()}</div>
                      <div>Mode: {item.paymentMode}</div>
                      <div className="text-right text-slate-500">{item.policyNo}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                  <span>Premium Payments & Ledger</span>
                </h3>
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenPaymentModal();
                  }}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 transition-all shadow-[0_0_12px_rgba(0,242,254,0.2)]"
                >
                  + Pay Due Now
                </button>
              </div>

              {/* Upcoming Payment Countdown */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/50 to-slate-900/80 border border-purple-500/30 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-purple-300 font-bold block">
                  Upcoming Premium Due
                </span>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-black font-mono text-white">$4,250</div>
                  <span className="text-xs text-purple-300 font-semibold">Due 15 Jan 2027</span>
                </div>
                <div className="text-[11px] text-slate-400">Auto-debit status: Active via Quantum Card (••• 9012)</div>
              </div>

              {/* Past Transactions List */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Transaction History ({payments.length})
                </div>

                {payments.map((txn) => (
                  <div
                    key={txn.id}
                    className="p-3.5 rounded-2xl bg-slate-900/50 border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{txn.policyName}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {txn.id} • {txn.date} • {txn.method}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-emerald-400">
                        ${txn.amount.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-emerald-300 font-semibold">Settled</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PERSON'S INFO / PROFILE (WITH PHOTO UPLOAD) */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>Person's Info & Credentials</span>
                </h3>
                <span className="text-[10px] font-mono text-cyan-400">Biometric Level: A-1</span>
              </div>

              {/* Interactive Profile Photo Upload / Change */}
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/60 border border-white/10">
                <div className="relative group">
                  <img
                    src={avatarPreview}
                    alt="Profile Avatar"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Change Profile Photo"
                    className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-cyan-300 transition-opacity"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-xl border border-cyan-400/30 transition-all flex items-center gap-1.5 mb-1"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>
                  <p className="text-[10px] text-slate-400">Supports JPG, PNG, GIF</p>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Mobile & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                    Mobile Frequency
                  </label>
                  <input
                    type="tel"
                    required
                    value={editMobile}
                    onChange={(e) => setEditMobile(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                    Cosmic Email
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Gender selector */}
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                  Gender Specification
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setEditGender(g);
                      }}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        editGender === g
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                          : 'bg-slate-900/50 border-white/10 text-slate-400'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Habitat Address */}
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                  Physical Habitat Address
                </label>
                <textarea
                  rows={2}
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                  Emergency Beneficiary Contact
                </label>
                <input
                  type="text"
                  value={editEmergency}
                  onChange={(e) => setEditEmergency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          )}
        </div>

        {/* Bottom Drawer Footer: Logout Option */}
        <div className="p-5 border-t border-white/10 bg-slate-950/80 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Session: <span className="font-mono text-emerald-400">Encrypted</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onLogout();
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/30 border border-rose-500/30 hover:border-rose-400 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.15)] active:scale-95"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Secure Logout</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
