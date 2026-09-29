import { useState } from 'react';
import { 
  Orbit, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Sparkles, 
  HeartPulse, 
  Layers, 
  Compass, 
  Search,
  Zap
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({ 
  activeTab, 
  onTabChange, 
  onOpenDrawer, 
  user, 
  isDrawerOpen 
}) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleAudio = () => {
    const next = sound.toggleSound();
    setSoundEnabled(next);
  };

  const navItems = [
    { id: 'life', label: 'Life Vault', icon: ShieldCheck, page: 'Page 1' },
    { id: 'health', label: 'Health Shield', icon: HeartPulse, page: 'Page 2' },
    { id: 'explore', label: 'Explore All (6)', icon: Layers, page: 'Page 3' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 backdrop-blur-2xl bg-[#030712]/75 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div 
          onClick={() => {
            sound.playClick();
            onTabChange('life');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.3)] group-hover:scale-105 transition-transform">
            <Orbit className="w-6 h-6 animate-spin" style={{ animationDuration: '18s' }} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span>AURA</span>
              <span className="text-cyan-400 font-light">ZERO-G</span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase hidden sm:block">
              Anti-Gravity Policy Portal
            </div>
          </div>
        </div>

        {/* Center: Main Navigation Tabs */}
        <nav className="hidden md:flex items-center p-1.5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onTabChange(item.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/25 to-purple-500/20 text-white border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Corner Global HUD & Hamburger Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Audio toggle button */}
          <button
            onClick={toggleAudio}
            title={soundEnabled ? 'Mute Zero-G Audio' : 'Enable Zero-G Audio'}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/60 hover:bg-white/10 border border-white/10 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* User mini profile button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenDrawer();
            }}
            className="hidden sm:flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 transition-all group"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-xl object-cover border border-cyan-400/50"
            />
            <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 max-w-[100px]">
              {user.name.split(' ')[0]}
            </span>
          </button>

          {/* REQUIRED: Top-Right Corner Hamburger Menu Button (Three lines icon) */}
          <button
            id="hamburger-menu-btn"
            onClick={() => {
              sound.playClick();
              onOpenDrawer();
            }}
            title="Open Sliding Menu"
            className="p-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-400/40 text-cyan-300 hover:text-white hover:border-cyan-300 hover:bg-cyan-500/25 transition-all shadow-[0_0_15px_rgba(0,242,254,0.2)] active:scale-95"
          >
            {isDrawerOpen ? (
              <X className="w-5 h-5 text-cyan-300" />
            ) : (
              <Menu className="w-5 h-5 text-cyan-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden items-center justify-around pt-3 mt-2 border-t border-white/5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                onTabChange(item.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
