export const INITIAL_USER = {
  name: "Commander Alex Vance",
  mobile: "+1 (555) 839-2041",
  email: "alex.vance@orion-shield.io",
  gender: "Male",
  address: "Orbital Habitat Sector 7, Neo-Olympus Gateway 04, Mars Orbit C-19",
  bloodGroup: "O+",
  emergencyContact: "+1 (555) 912-3847 (Dr. Sarah Vance)",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  policyId: "AG-LIFE-9024-X7",
  tier: "Titanium Cosmic Member"
};

export const LIFE_POLICY = {
  policyNumber: "AG-LIFE-9024-X7",
  planName: "AURA Celestial Eternity Life Shield",
  policyHolder: "Commander Alex Vance",
  habitatAddress: "Orbital Habitat Sector 7, Neo-Olympus Gateway 04, Mars Orbit C-19",
  issueDate: "15 Jan 2024",
  expiryDate: "24 Nov 2038",
  sumAssured: 1250000,
  claimableAmount: 1250000,
  accumulatedBonus: 145800,
  annualPremium: 4250,
  nextPaymentDate: "15 Jan 2027",
  status: "Active & Gravitationally Secured",
  nomineeName: "Dr. Sarah Vance",
  nomineeRelation: "Spouse",
  nomineeShare: "100%",
  nomineeContact: "+1 (555) 912-3847",
  underwriter: "Quantum Sovereign Reinsurance Corp (Zurich Orbit)",
  riders: [
    "Zero-Gravity Accidental Total Disability ($500,000)",
    "Sub-Orbital Critical Illness Acceleration ($250,000)",
    "Waiver of Premium on Atmospheric Hazard"
  ]
};

export const HEALTH_POLICY = {
  policyNumber: "AG-HLTH-8812-Q2",
  planName: "Quantum Aura Health Shield Floater",
  sumInsured: 500000,
  utilizedAmount: 48500,
  availableBalance: 451500,
  deductible: 0,
  validity: "31 Dec 2027",
  networkType: "Zero-G Global Cashless Direct-Pay",
  tpaId: "TPA-ORION-991",
  coveredMembers: [
    { name: "Alex Vance", relation: "Self", age: 34 },
    { name: "Sarah Vance", relation: "Spouse", age: 32 },
    { name: "Leo Vance", relation: "Child", age: 6 }
  ],
  coverages: [
    {
      id: "cov-1",
      title: "Inpatient Hospitalization & ICU",
      limit: "$500,000 / Year",
      status: "100% Cashless",
      icon: "Bed",
      desc: "Zero room rent capping, robotic ICU bed charges, and post-surgery care."
    },
    {
      id: "cov-2",
      title: "Zero-G Orbital Medical Evacuation",
      limit: "$250,000 Per Event",
      status: "Instant Airlift",
      icon: "PlaneTakeoff",
      desc: "Pressurized medical capsule rescue across terrestrial and orbital stations."
    },
    {
      id: "cov-3",
      title: "Cybernetic & Robotic Surgeries",
      limit: "Up to Sum Insured",
      status: "No Co-Pay",
      icon: "Cpu",
      desc: "Full coverage for DaVinci AI surgical units and nanotech vascular stents."
    },
    {
      id: "cov-4",
      title: "Preventive Scans & Tele-Medicine",
      limit: "Unlimited 24/7",
      status: "Active",
      icon: "Activity",
      desc: "Biometric quantum resonance scans and 4K holographic doctor visits."
    },
    {
      id: "cov-5",
      title: "Critical Illness Acceleration",
      limit: "$100,000 Lump Sum",
      status: "Instant Escrow",
      icon: "HeartPulse",
      desc: "Immediate liquid fund release upon diagnosis of 38 covered major conditions."
    }
  ],
  activeClaim: {
    claimId: "CLM-HLTH-2026-789",
    hospital: "St. Jude Zero-G Orbital Medical Center",
    incident: "Atmospheric Decompression Recovery",
    amountClaimed: 18400,
    currentStep: 3, // 1 to 4
    stepNames: [
      "Claim Registered & Hospital Notified",
      "Medical Telemetry Data Verified",
      "Gravitational Fraud & Coverage Audit",
      "Direct Cashless Settlement Dispatched"
    ],
    lastUpdate: "Today at 08:30 UTC",
    settlementETA: "Within 2 Hours"
  }
};

export const CASHLESS_HOSPITALS = [
  {
    id: "hosp-1",
    name: "St. Jude Zero-G Orbital Medical Center",
    category: "Orbital Station",
    location: "Low Earth Orbit (Station Alpha 4)",
    distance: "380 km altitude",
    bedsAvailable: 28,
    icuAvailable: 8,
    rating: 4.95,
    specialties: ["Hyperbaric Medicine", "Zero-G Orthopedics", "Trauma ICU"],
    contact: "+1-800-ZERO-MED",
    cashlessDesk: "Terminal 2, Bay 9"
  },
  {
    id: "hosp-2",
    name: "Apollo Asteroid Gateway Multi-Specialty",
    category: "Trauma Center",
    location: "Sector 11, Gateway Hub, Lunar Orbit",
    distance: "Zone 2 Corridor",
    bedsAvailable: 42,
    icuAvailable: 14,
    rating: 4.9,
    specialties: ["Cardiothoracic Surgery", "Bio-Regenerative Cell Therapy", "Pediatrics"],
    contact: "+1-800-APOLLO-G",
    cashlessDesk: "Holo-Counter B"
  },
  {
    id: "hosp-3",
    name: "Neo-Genesis Cybernetic Health Institute",
    category: "Cyber-Surgical",
    location: "Neo-Tokyo Skyport Level 90, Earth",
    distance: "12 km surface",
    bedsAvailable: 15,
    icuAvailable: 5,
    rating: 4.88,
    specialties: ["Neural Implants", "Prosthetics Integration", "Emergency Trauma"],
    contact: "+81-3-NEO-HEAL",
    cashlessDesk: "Autonomous Desk A-1"
  },
  {
    id: "hosp-4",
    name: "Johns Hopkins Atmospheric & Space Clinic",
    category: "General",
    location: "Chesapeake Spaceport Campus, USA",
    distance: "Ground Level Station",
    bedsAvailable: 64,
    icuAvailable: 22,
    rating: 4.98,
    specialties: ["Oncology", "Advanced Immunology", "Robotic Cardiology"],
    contact: "+1-800-555-JHMS",
    cashlessDesk: "Priority Cashless Wing"
  }
];

export const EXPLORE_INSURANCES = [
  {
    id: "ins-motor",
    category: "Mobility & Transport",
    title: "Motor & Craft Insurance",
    subtitle: "Autonomous EV & Sub-Orbital Vehicles",
    badge: "Most Popular",
    icon: "Rocket",
    color: "from-cyan-500/20 via-blue-500/10 to-transparent",
    glowColor: "rgba(0, 242, 254, 0.4)",
    borderColor: "border-cyan-500/30",
    maxCover: "$500,000",
    startingFrom: "$45/mo",
    features: [
      "Zero-gravity collision & atmospheric re-entry protection",
      "AI autopilot liability & autonomous sensor damage",
      "Instant drone roadside assist & battery swap in 15 mins",
      "Depreciation waiver on ion thrusters & quantum batteries"
    ],
    claimSpeed: "Claim settled in 3 minutes via AI sensor logs"
  },
  {
    id: "ins-travel",
    category: "Exploration & Transit",
    title: "Travel & Voyager Insurance",
    subtitle: "Interstellar & Cross-Border Voyages",
    badge: "Zero Deductible",
    icon: "Compass",
    color: "from-purple-500/20 via-pink-500/10 to-transparent",
    glowColor: "rgba(184, 0, 230, 0.4)",
    borderColor: "border-purple-500/30",
    maxCover: "$1,000,000",
    startingFrom: "$29/trip",
    features: [
      "Sub-orbital flight delay & launch cancellation compensation",
      "Loss of pressurized baggage & biometric passport recovery",
      "Emergency interplanetary medical evacuation & hospital bill pay",
      "Space sickness & cosmic radiation emergency support"
    ],
    claimSpeed: "Instant auto-payout for 60+ min launch delays"
  },
  {
    id: "ins-home",
    category: "Living & Habitat",
    title: "Home & Habitat Insurance",
    subtitle: "Cosmic Habitat & Property Protect",
    badge: "Smart Coverage",
    icon: "Home",
    color: "from-emerald-500/20 via-teal-500/10 to-transparent",
    glowColor: "rgba(16, 185, 129, 0.4)",
    borderColor: "border-emerald-500/30",
    maxCover: "$2,500,000",
    startingFrom: "$65/mo",
    features: [
      "Micro-meteorite shielding breach & hull depressurization",
      "Smart home automated life support & atmospheric failure",
      "Earthquake, solar storm flare, & structural collapse cover",
      "Temporary luxury modular habitat pod allowance ($15,000)"
    ],
    claimSpeed: "Drone inspection & instant fund deposit"
  },
  {
    id: "ins-term",
    category: "Family Security",
    title: "Term Life Insurance",
    subtitle: "Eternal Horizon Pure Term Protection",
    badge: "Highest Return",
    icon: "ShieldAlert",
    color: "from-amber-500/20 via-orange-500/10 to-transparent",
    glowColor: "rgba(245, 158, 11, 0.4)",
    borderColor: "border-amber-500/30",
    maxCover: "$5,000,000",
    startingFrom: "$35/mo",
    features: [
      "Guaranteed tax-free death benefit up to age 100",
      "Terminal illness 100% accelerated payout upfront",
      "Zero medical checkup needed for biometric verified pilots",
      "105% return of premium option at maturity"
    ],
    claimSpeed: "Instant disbursement to nominee via smart contract"
  },
  {
    id: "ins-child",
    category: "Next-Gen Future",
    title: "Child & Scholar Insurance",
    subtitle: "Next-Gen Quantum Education Fund",
    badge: "Compounding Bonus",
    icon: "GraduationCap",
    color: "from-blue-500/20 via-indigo-500/10 to-transparent",
    glowColor: "rgba(79, 172, 254, 0.4)",
    borderColor: "border-blue-500/30",
    maxCover: "$1,500,000",
    startingFrom: "$40/mo",
    features: [
      "Scheduled payouts at milestone ages (18, 21, and 24 years)",
      "Waiver of future premiums if parent faces permanent disability",
      "Guaranteed admission funding for global space academies",
      "Compounding 9.2% annual anti-gravity wealth accumulation"
    ],
    claimSpeed: "Automated university tuition disbursement"
  },
  {
    id: "ins-pet",
    category: "Bio-Companions",
    title: "Pet & Bio-Companion Insurance",
    subtitle: "Cyber-Canine & Exotic Bio-Pet Health",
    badge: "All Breeds Covered",
    icon: "Heart",
    color: "from-rose-500/20 via-red-500/10 to-transparent",
    glowColor: "rgba(244, 63, 94, 0.4)",
    borderColor: "border-rose-500/30",
    maxCover: "$75,000",
    startingFrom: "$19/mo",
    features: [
      "Veterinary surgery, cybernetic implants & microchip diagnostics",
      "Alternative gene therapy & behavioral telemetry rehabilitation",
      "Lost pet drone beacon tracking & emergency recovery reward",
      "No maximum age limit for certified bio-synthetic companions"
    ],
    claimSpeed: "Direct vet clinic settlement via PetPass QR"
  }
];

export const INSURANCE_HISTORY = [
  {
    id: "CLM-HIST-901",
    date: "14 Oct 2025",
    type: "Health Insurance",
    policyNo: "AG-HLTH-8812-Q2",
    title: "Sub-Orbital G-Force Acclimatization",
    amount: 12500,
    status: "Settled",
    settlementDate: "15 Oct 2025",
    paymentMode: "Direct Cashless to Hospital",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    id: "CLM-HIST-842",
    date: "28 Jul 2025",
    type: "Motor & Craft",
    policyNo: "AG-MTR-1029-C4",
    title: "Micro-Meteorite Thruster Armor Scratch",
    amount: 4800,
    status: "Settled",
    settlementDate: "28 Jul 2025",
    paymentMode: "Instant Quantum Escrow Payout",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    id: "CLM-HIST-719",
    date: "04 Mar 2025",
    type: "Travel Insurance",
    policyNo: "AG-TRV-5512-P9",
    title: "Interplanetary Launch Reschedule Delay (3 hrs)",
    amount: 1500,
    status: "Settled",
    settlementDate: "04 Mar 2025",
    paymentMode: "Auto-Triggered Smart Contract",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    id: "CLM-HIST-602",
    date: "19 Nov 2024",
    type: "Health Insurance",
    policyNo: "AG-HLTH-8812-Q2",
    title: "Annual Biometric Resonance Health Scan",
    amount: 2200,
    status: "Settled",
    settlementDate: "20 Nov 2024",
    paymentMode: "100% Cashless Voucher",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  }
];

export const PAYMENT_RECORDS = [
  {
    id: "TXN-90214",
    date: "15 Jan 2026",
    policyName: "AURA Celestial Eternity Life Shield",
    policyNo: "AG-LIFE-9024-X7",
    amount: 4250,
    type: "Annual Premium",
    method: "Quantum Card (••• 9012)",
    status: "Successful",
    receiptUrl: "#"
  },
  {
    id: "TXN-88412",
    date: "31 Dec 2025",
    policyName: "Quantum Aura Health Shield Floater",
    policyNo: "AG-HLTH-8812-Q2",
    amount: 1850,
    type: "Annual Health Shield",
    method: "Crypto-Credit (USDC-G)",
    status: "Successful",
    receiptUrl: "#"
  },
  {
    id: "TXN-76190",
    date: "15 Jan 2025",
    policyName: "AURA Celestial Eternity Life Shield",
    policyNo: "AG-LIFE-9024-X7",
    amount: 4250,
    type: "Annual Premium",
    method: "Quantum Card (••• 9012)",
    status: "Successful",
    receiptUrl: "#"
  }
];
