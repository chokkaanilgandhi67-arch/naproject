import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CosmicBackground from './components/CosmicBackground';
import Navbar from './components/Navbar';
import AuthScreen from './components/AuthScreen';
import LifeDashboard from './components/LifeDashboard';
import HealthSection from './components/HealthSection';
import ExploreInsurances from './components/ExploreInsurances';
import DrawerMenu from './components/DrawerMenu';
import ClaimModal from './components/Modals/ClaimModal';
import CertificateModal from './components/Modals/CertificateModal';
import PaymentModal from './components/Modals/PaymentModal';
import QuoteModal from './components/Modals/QuoteModal';
import Toast from './components/Toast';

import { 
  INITIAL_USER, 
  LIFE_POLICY, 
  HEALTH_POLICY, 
  CASHLESS_HOSPITALS, 
  EXPLORE_INSURANCES,
  INSURANCE_HISTORY,
  PAYMENT_RECORDS
} from './data/mockData';
import { sound } from './utils/audio';

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(INITIAL_USER);

  // Active Main Page Tab: 'life' (Page 1), 'health' (Page 2), 'explore' (Page 3)
  const [activeTab, setActiveTab] = useState('life');

  // Drawer menu state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Dynamic Data States
  const [lifePolicy, setLifePolicy] = useState(LIFE_POLICY);
  const [healthPolicy, setHealthPolicy] = useState(HEALTH_POLICY);
  const [hospitals, setHospitals] = useState(CASHLESS_HOSPITALS);
  const [history, setHistory] = useState(INSURANCE_HISTORY);
  const [payments, setPayments] = useState(PAYMENT_RECORDS);
  const [enrolledPolicies, setEnrolledPolicies] = useState([]);

  // Modal States
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInsuranceForQuote, setSelectedInsuranceForQuote] = useState(null);

  // Global Toasts system
  const [toasts, setToasts] = useState([]);

  const addToast = ({ title, message, type = 'info' }) => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Handlers
  const handleLoginSuccess = (userData) => {
    setUser((prev) => ({
      ...prev,
      ...userData
    }));
    setLifePolicy((prev) => ({
      ...prev,
      policyHolder: userData.name,
      habitatAddress: userData.address || prev.habitatAddress
    }));
    setIsAuthenticated(true);
    sound.playSuccess();
    addToast({
      title: 'Zero-G Identity Synchronized',
      message: `Welcome, ${userData.name}! All orbital policies and escrow shields are online.`,
      type: 'success'
    });
  };

  const handleLogout = () => {
    sound.playClick();
    setIsAuthenticated(false);
    setIsDrawerOpen(false);
    addToast({
      title: 'Session Disconnected',
      message: 'You have safely logged out of the Zero-G Vault.',
      type: 'info'
    });
  };

  // Claim Submission Handler
  const handleClaimSubmitted = (newClaim) => {
    setHistory((prev) => [newClaim, ...prev]);
    addToast({
      title: 'Claim Transmitted to Escrow',
      message: `Claim ID: ${newClaim.id} logged for $${newClaim.amount.toLocaleString()}. Biometric audit in progress.`,
      type: 'success'
    });
  };

  // Payment Success Handler
  const handlePaymentSuccess = (newPayment) => {
    setPayments((prev) => [newPayment, ...prev]);
    addToast({
      title: 'Payment Dispatched & Verified',
      message: `Receipt generated for $${newPayment.amount.toLocaleString()} on-chain.`,
      type: 'success'
    });
  };

  // Policy Enrolled from Explore Section
  const handlePolicyEnrolled = (policyItem) => {
    setEnrolledPolicies((prev) => [...prev, policyItem]);
    addToast({
      title: 'New Policy Shield Activated',
      message: `${policyItem.title} added to your active spatial vault.`,
      type: 'success'
    });
  };

  // Search selection handler
  const handleSelectPolicyFromSearch = (insurance) => {
    setActiveTab('explore');
    setSelectedInsuranceForQuote(insurance);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3D Cosmic Zero-G Floating Particles & Nebula Background */}
      <CosmicBackground />

      {/* Global Toast Alert Notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col">
        {!isAuthenticated ? (
          /* Authentication Screen (Registration & Login Flow) */
          <AuthScreen 
            onLoginSuccess={handleLoginSuccess}
            addToast={addToast}
          />
        ) : (
          /* Authenticated Dashboard Experience */
          <>
            {/* Top Navigation HUD with Hamburger Menu */}
            <Navbar
              activeTab={activeTab}
              onTabChange={(tab) => {
                sound.playClick();
                setActiveTab(tab);
              }}
              onOpenDrawer={() => {
                sound.playClick();
                setIsDrawerOpen(true);
              }}
              user={user}
              isDrawerOpen={isDrawerOpen}
            />

            {/* Sliding Drawer Menu (Top-Right Corner Hamburger Menu) */}
            <AnimatePresence>
              {isDrawerOpen && (
                <DrawerMenu
                  isOpen={isDrawerOpen}
                  onClose={() => setIsDrawerOpen(false)}
                  user={user}
                  onUpdateUser={(updated) => setUser(updated)}
                  history={history}
                  payments={payments}
                  insurances={EXPLORE_INSURANCES}
                  onSelectPolicyFromSearch={handleSelectPolicyFromSearch}
                  onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
                  onLogout={handleLogout}
                  addToast={addToast}
                />
              )}
            </AnimatePresence>

            {/* Page View Transitions */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 pt-8">
              <AnimatePresence mode="wait">
                {activeTab === 'life' && (
                  <motion.div
                    key="page-life"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LifeDashboard
                      policy={lifePolicy}
                      user={user}
                      onOpenClaimModal={() => setIsClaimModalOpen(true)}
                      onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
                      onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
                      onNavigateTab={(tab) => setActiveTab(tab)}
                      addToast={addToast}
                    />
                  </motion.div>
                )}

                {activeTab === 'health' && (
                  <motion.div
                    key="page-health"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HealthSection
                      healthPolicy={healthPolicy}
                      hospitals={hospitals}
                      user={user}
                      onRaiseClaim={() => setIsClaimModalOpen(true)}
                      addToast={addToast}
                    />
                  </motion.div>
                )}

                {activeTab === 'explore' && (
                  <motion.div
                    key="page-explore"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExploreInsurances
                      insurances={EXPLORE_INSURANCES}
                      onSelectInsurance={(ins) => setSelectedInsuranceForQuote(ins)}
                      enrolledPolicies={enrolledPolicies}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </>
        )}
      </div>

      {/* Global Interactive Modals */}
      <AnimatePresence>
        {isClaimModalOpen && (
          <ClaimModal
            isOpen={isClaimModalOpen}
            onClose={() => setIsClaimModalOpen(false)}
            policy={lifePolicy}
            user={user}
            onClaimSubmitted={handleClaimSubmitted}
          />
        )}

        {isCertificateModalOpen && (
          <CertificateModal
            isOpen={isCertificateModalOpen}
            onClose={() => setIsCertificateModalOpen(false)}
            policy={lifePolicy}
            user={user}
          />
        )}

        {isPaymentModalOpen && (
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            policy={lifePolicy}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {selectedInsuranceForQuote && (
          <QuoteModal
            isOpen={!!selectedInsuranceForQuote}
            onClose={() => setSelectedInsuranceForQuote(null)}
            insurance={selectedInsuranceForQuote}
            onPolicyEnrolled={handlePolicyEnrolled}
          />
        )}
      </AnimatePresence>

      {/* Global Spatial Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#030712]/90 backdrop-blur-xl py-6 px-4 sm:px-8 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AURA ZERO-G Spatial Insurance Network • 256-Bit Escrow Vault Active</span>
          </div>
          <div>
            Built with React.js, Tailwind CSS, Lucide Icons & Framer Motion
          </div>
        </div>
      </footer>
    </div>
  );
}
