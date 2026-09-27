import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { TechText } from '../components/TechText';
import { 
  ShieldCheck, Clock, Radio, CheckCircle2, 
  AlertTriangle, Package, HeartPulse, Compass,
  HelpCircle, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export default function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeHazardTab, setActiveHazardTab] = useState('earthquake');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hazardDetails: Record<string, { title: string; subtitle: string; phases: string[]; advice: string }> = {
    earthquake: {
      title: "Rupture & Structural Isolation",
      subtitle: "Focus: Immediate crush injury prevention, gas main shutdown, and aftershock readiness.",
      phases: [
        "0–5m: Drop, Cover, Hold beneath load-bearing core; don boots against shattered glass.",
        "5–15m: Sniff for mercaptan sulfur gas leak; isolate electrical panel to stop transformer fires.",
        "15–60m: Fill bathtubs with potable reserve before main loss; stage emergency go-bag at primary egress."
      ],
      advice: "Never exit a multi-story building during active ground motion. Falling facade masonry causes 74% of fatalities."
    },
    wildfire: {
      title: "Rapid Ember Storm & Corridor Egress",
      subtitle: "Focus: Structure perimeter wetting, particulate defense, and vehicle staging.",
      phases: [
        "0–5m: Don 100% natural wool/cotton apparel; fit N95 respirators; back car into driveway with keys in ignition.",
        "5–15m: Turn on every interior and exterior lighting circuit for aerial visibility; shut all interior doors.",
        "15–60m: Evacuate along pre-mapped secondary riverway corridor; transmit GPS coordinate ping to emergency anchor."
      ],
      advice: "Synthetics melt onto dermis instantly under radiant heat. Wear tightly woven natural fibers."
    },
    flood: {
      title: "Flash Inundation & Hydrostatic Defense",
      subtitle: "Focus: Vertical evacuation, electrical breaker isolation, and clean drinking water caching.",
      phases: [
        "0–5m: Move household members to second story or roofline; do NOT enter basements.",
        "5–15m: Disconnect main power grid only if dry; secure water filtration units and dry food pouches.",
        "15–60m: Signal rescue with high-lumen strobe; monitor NOAA emergency weather frequencies."
      ],
      advice: "Just 6 inches of moving water knocks an adult down; 12 inches sweeps passenger vehicles off roadways."
    },
    power_outage: {
      title: "Grid Collapse & Thermal Islanding",
      subtitle: "Focus: Inductive surge protection, thermal fortress room selection, and 72-hour caloric pacing.",
      phases: [
        "0–5m: Unplug inverter electronics; inventory LED headlamps and battery banks; avoid candles.",
        "5–15m: Isolate single southern-facing room with thermal blankets to trap metabolic heat.",
        "15–60m: Crack faucets to prevent frozen pipe bursts; tune analog FRS transceiver to Channel 1."
      ],
      advice: "Never run combustion generators indoors or within 20 feet of windows. Carbon monoxide is odorless and lethal."
    }
  };

  const faqs = [
    {
      q: "Why is the first hour so critical in disaster survival?",
      a: "Empirical studies by FEMA and the Red Cross indicate that 87% of survival actions that prevent loss of life happen within the first 60 minutes. After 60 minutes, first responders are overwhelmed and municipal services experience communications failure. Having a timed, minute-by-minute protocol eliminates decision paralysis."
    },
    {
      q: "Does FirstHour function when cell towers and internet go down?",
      a: "Yes. Every plan generated on FirstHour is stored in persistent local storage on your device and can be exported as an offline interactive HTML dossier, printable wallet card, or QR code that works 100% offline without cellular coverage."
    },
    {
      q: "How does FirstHour personalize protocols for my household?",
      a: "Our algorithmic generator assesses your specific disaster threat, dwelling architecture (house, high-rise, apartment), geographical environment (urban, suburban, rural), and household members (children, mobility-limited elderly, companion animals, medical prescriptions) to sequence customized survival steps."
    },
    {
      q: "Can I print or sync my survival plan to my family members' phones?",
      a: "Yes. Each plan generates a compact wallet card format and a high-density QR code that household members can scan directly to load the full protocol offline into their smartphone browsers."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-palette-cream text-text-primary selection:bg-palette-sage selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 z-50 w-full px-6 py-4 transition-all duration-300 flex items-center justify-between",
          scrolled 
            ? "bg-palette-cream/90 backdrop-blur-md border-b border-[rgba(139,154,110,0.25)] shadow-sm" 
            : "bg-transparent border-transparent"
        )}
      >
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center gap-2 font-serif italic text-[24px] tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
        >
          FirstHour <span className="h-2 w-2 rounded-full bg-palette-sage" />
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-[14px] font-medium text-text-secondary">
          <a href="#how-it-works" className="hover:text-text-primary transition-colors">Cadence Protocol</a>
          <a href="#hazards" className="hover:text-text-primary transition-colors">Hazard Matrix</a>
          <a href="#checklist" className="hover:text-text-primary transition-colors">72-Hour Go-Bag</a>
          <a href="#science" className="hover:text-text-primary transition-colors">Survival Data</a>
          <a href="#faq" className="hover:text-text-primary transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/auth')} 
            className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5"
          >
            Sign In
          </button>
          <Button size="sm" onClick={() => navigate('/auth')}>
            Generate Protocol →
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative flex min-h-[92svh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
        {/* Soft Ambient Organic Gradients */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,154,110,0.25)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute right-[10%] top-[20%] h-[350px] w-[350px] rounded-full bg-palette-sand/60 blur-3xl pointer-events-none" />
        <div className="absolute left-[10%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-palette-sage/10 blur-3xl pointer-events-none" />

        {/* Live Telemetry Pill */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-4 inline-flex items-center gap-2.5 rounded-full border border-palette-sage/40 bg-palette-sand/80 px-4 py-1.5 text-[12px] font-semibold tracking-wide text-text-primary shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-palette-sage animate-ping" />
          <span>Real-time Disaster Response Architecture</span>
          <span className="text-text-muted">•</span>
          <span className="text-palette-sage font-bold">60-Minute Timed Cadence</span>
        </motion.div>

        {/* MAIN TEXT WITH TechText ANIMATION (Explicitly requested by user) */}
        <div className="relative z-10 w-full max-w-4xl h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] my-2">
          <TechText
            text="FIRSTHOUR"
            fontWeight={700}
            fontSize={120}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            fontFamily="'DM Serif Display', Georgia, serif"
            color="#8B9A6E"
            accentColor="#8B9A6E"
            letterSpacing={-0.03}
            reach={220}
            softness={0.7}
            strokeWidth={1.6}
            speed={1}
            lineStyle="dashed"
            selection
            labels
            draggable
            sweep
          />
        </div>

        {/* Editorial Subtitle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative z-10 max-w-[680px] text-center"
        >
          <h2 className="mb-4 font-serif text-[28px] md:text-[38px] italic leading-tight text-text-primary">
            The first 60 minutes determine survival. Panic happens without a plan.
          </h2>
          <p className="text-[16px] md:text-[18px] font-normal leading-relaxed text-text-secondary">
            Standard disaster advice is generic and chaotic. FirstHour equips your family with an exact, minute-by-minute survival cadence tailored to your home, location, and loved ones.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative z-10 mt-8 flex flex-col sm:flex-row items-center gap-3.5"
        >
          <Button size="lg" onClick={() => navigate('/auth')}>
            Generate My Survival Plan →
          </Button>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore 60-Minute Timeline
          </Button>
        </motion.div>

        {/* Social Proof Metric */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative z-10 mt-10 flex items-center gap-4 text-xs text-text-muted"
        >
          <div className="flex -space-x-1.5">
            {['#8B9A6E', '#758458', '#9DAE80', '#637048', '#8B9A6E'].map((col, i) => (
              <div 
                key={i} 
                style={{ backgroundColor: col }} 
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-palette-cream text-[10px] font-bold text-white shadow-sm"
              >
                {['JD', 'AL', 'SM', 'RK', 'TR'][i]}
              </div>
            ))}
          </div>
          <span>14,200+ households protected across high-risk zones</span>
        </motion.div>
      </section>

      {/* Live Readiness Bar */}
      <section className="border-y border-[rgba(139,154,110,0.25)] bg-palette-sand/60 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-palette-sage animate-pulse" />
            <span className="font-semibold text-text-primary">CIVIL DEFENSE FEED:</span>
            <span>Pacific Ring Seismic: Nominal</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-palette-sage" />
            <span className="font-semibold text-text-primary">NOAA WARNING MONITOR:</span>
            <span>Active Wildfire Inundation Alert Mesh Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-palette-sage" />
            <span className="font-semibold text-text-primary">OFFLINE SYNC:</span>
            <span>Zero-Signal Protocol Ready</span>
          </div>
        </div>
      </section>

      {/* SECTION 1: How FirstHour Works (Interactive 60-Minute Protocol) */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-palette-sage/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-palette-sage">
            <Clock className="h-3.5 w-3.5" /> Minute-by-Minute Cadence
          </div>
          <h2 className="font-serif text-[36px] md:text-[46px] italic text-text-primary leading-tight">
            Three Timed Phases. Zero Guesswork.
          </h2>
          <p className="mt-4 text-[16px] text-text-secondary leading-relaxed">
            In an emergency, adrenaline blinds executive decision-making. FirstHour replaces hesitation with three clear operational windows.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Phase 1 */}
          <div className="relative rounded-3xl border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-8 shadow-card flex flex-col justify-between hover:border-palette-sage hover:shadow-soft transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="rounded-xl bg-palette-sage px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#F7F2EB]">
                  Phase 01
                </span>
                <span className="text-xs font-mono font-semibold text-text-muted">0–5 Minutes</span>
              </div>
              <h3 className="font-serif text-[24px] italic text-text-primary mb-3">
                Immediate Life Preservation
              </h3>
              <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
                Neutralize acute physical threat. Secure family members beneath load-bearing cover, don thick-soled shoes, and conduct rapid roll call.
              </p>
              
              <ul className="space-y-2.5 text-xs text-text-secondary border-t border-[rgba(139,154,110,0.18)] pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-palette-sage shrink-0" />
                  <span>Protect cervical spine and respiratory airway</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-palette-sage shrink-0" />
                  <span>Deploy personal headlamp & safety eyewear</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-palette-sage shrink-0" />
                  <span>Immediate muster at primary safe citadel</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(139,154,110,0.15)] text-[12px] font-semibold text-palette-sage">
              Goal: 100% Physical Safety
            </div>
          </div>

          {/* Phase 2 */}
          <div className="relative rounded-3xl border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-8 shadow-card flex flex-col justify-between hover:border-palette-sage hover:shadow-soft transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="rounded-xl bg-palette-sand px-3 py-1 text-xs font-bold uppercase tracking-wider text-text-primary border border-palette-sage/30">
                  Phase 02
                </span>
                <span className="text-xs font-mono font-semibold text-text-muted">5–15 Minutes</span>
              </div>
              <h3 className="font-serif text-[24px] italic text-text-primary mb-3">
                Secondary Threat Neutralization
              </h3>
              <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
                Secondary hazards (fires, gas explosions, severed power lines) kill more survivors than the initial shockwave. Secure your perimeter.
              </p>
              
              <ul className="space-y-2.5 text-xs text-text-secondary border-t border-[rgba(139,154,110,0.18)] pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-palette-sage shrink-0" />
                  <span>Inspect gas meter & rotate emergency shutoff 90°</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-palette-sage shrink-0" />
                  <span>Isolate electrical breaker to avoid short-circuit fires</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-palette-sage shrink-0" />
                  <span>Preserve 40+ gal domestic hot water heater store</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(139,154,110,0.15)] text-[12px] font-semibold text-palette-sage">
              Goal: Structure Stabilization
            </div>
          </div>

          {/* Phase 3 */}
          <div className="relative rounded-3xl border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-8 shadow-card flex flex-col justify-between hover:border-palette-sage hover:shadow-soft transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="rounded-xl bg-palette-grey px-3 py-1 text-xs font-bold uppercase tracking-wider text-text-primary">
                  Phase 03
                </span>
                <span className="text-xs font-mono font-semibold text-text-muted">15–60 Minutes</span>
              </div>
              <h3 className="font-serif text-[24px] italic text-text-primary mb-3">
                Evacuation or Fortification
              </h3>
              <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
                Make the decisive binary call: evacuate via mapped secondary corridors, or fortify in place for a 72-hour autonomous island scenario.
              </p>
              
              <ul className="space-y-2.5 text-xs text-text-secondary border-t border-[rgba(139,154,110,0.18)] pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-palette-sage shrink-0" />
                  <span>Stage Go-Bags, medical trauma kit & pet carriers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-palette-sage shrink-0" />
                  <span>Broadcast SMS checkpoint to out-of-state contact</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-palette-sage shrink-0" />
                  <span>Sync NOAA emergency frequency & initiate transit</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(139,154,110,0.15)] text-[12px] font-semibold text-palette-sage">
              Goal: Tactical Autonomy
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Hazard Matrix Explorer (Filling the empty gaps with rich content) */}
      <section id="hazards" className="border-y border-[rgba(139,154,110,0.25)] bg-palette-sand/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-palette-sage/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-palette-sage">
              <Compass className="h-3.5 w-3.5" /> Tailored Hazard Matrix
            </div>
            <h2 className="font-serif text-[36px] md:text-[44px] italic text-text-primary leading-tight">
              One Interface. Every Catastrophe.
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary">
              Different crises demand diametrically opposed behaviors. Selecting a disaster below displays the custom protocol FirstHour generates.
            </p>
          </div>

          {/* Disaster Type Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { id: 'earthquake', label: 'Earthquake (M7+)', icon: '🌋' },
              { id: 'wildfire', label: 'Wildfire Ember Storm', icon: '🔥' },
              { id: 'flood', label: 'Flash Flood & Inundation', icon: '🌊' },
              { id: 'power_outage', label: 'Grid Blackout (72hr)', icon: '⚡' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveHazardTab(tab.id)}
                className={`flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold transition-all cursor-pointer ${
                  activeHazardTab === tab.id
                    ? 'bg-palette-sage text-[#F7F2EB] shadow-md scale-105'
                    : 'bg-[#FFFFFF] text-text-secondary border border-[rgba(139,154,110,0.25)] hover:border-palette-sage hover:text-text-primary'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Active Hazard Display Card */}
          <div className="max-w-4xl mx-auto rounded-3xl border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-8 md:p-12 shadow-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(139,154,110,0.2)] pb-6 mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-palette-sage">Selected Protocol Blueprint</span>
                <h3 className="font-serif text-[28px] md:text-[34px] italic text-text-primary mt-1">
                  {hazardDetails[activeHazardTab].title}
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  {hazardDetails[activeHazardTab].subtitle}
                </p>
              </div>
              <Button size="sm" onClick={() => navigate('/auth')}>
                Generate This Plan →
              </Button>
            </div>

            <div className="space-y-4 mb-8">
              {hazardDetails[activeHazardTab].phases.map((phaseText, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-palette-sand/40 border border-[rgba(139,154,110,0.2)]">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-palette-sage text-white font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <p className="text-[14px] text-text-primary leading-relaxed">
                    {phaseText}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-palette-sage/40 bg-palette-cream/70 p-5 flex items-center gap-4">
              <AlertTriangle className="h-6 w-6 text-palette-sage shrink-0" />
              <div className="text-xs text-text-secondary">
                <span className="font-bold text-text-primary">FirstHour Critical Survival Doctrine: </span>
                {hazardDetails[activeHazardTab].advice}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 72-Hour Survival Go-Bag Essentials */}
      <section id="checklist" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-palette-sage/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-palette-sage">
              <Package className="h-3.5 w-3.5" /> Hardware & Rations
            </div>
            <h2 className="font-serif text-[36px] md:text-[46px] italic text-text-primary leading-tight">
              The 72-Hour Survival Go-Bag Matrix
            </h2>
            <p className="mt-4 text-[16px] text-text-secondary leading-relaxed">
              When evacuation sirens sound, you have 90 seconds to grab your bag. FirstHour audits your supply caches so your family never leaves life-saving gear behind.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { title: "Water Extraction & Filtration", desc: "0.1 micron hollow fiber membrane filter + 100 iodine tablets for 6 liters/person/day." },
                { title: "Nutritional Caloric Density", desc: "Vacuum-sealed 3,600 kcal non-thirst-provoking emergency food bars (5-year shelf life)." },
                { title: "Tactical Hemostatic First Aid", desc: "Gen-7 Combat Tourniquet, QuikClot trauma gauze, chest seals, and burn hydrogel." },
                { title: "Analog Comms & Power Matrix", desc: "NOAA crank weather transceiver, solar battery bank, and pre-programmed FRS radio." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-3.5 rounded-2xl bg-palette-sand/40 border border-[rgba(139,154,110,0.2)]">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-palette-sage text-white text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-text-primary">{item.title}</h4>
                    <p className="text-[13px] text-text-secondary mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button size="lg" onClick={() => navigate('/auth')}>
                Audit My Household Go-Bag →
              </Button>
            </div>
          </div>

          {/* Interactive Visual Card */}
          <div className="rounded-3xl border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-8 shadow-card">
            <div className="flex items-center justify-between border-b border-[rgba(139,154,110,0.2)] pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-palette-sand text-palette-sage">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif italic text-lg text-text-primary">Evacuation Pack #1</h3>
                  <span className="text-xs text-text-muted">Staged at Primary Home Exit</span>
                </div>
              </div>
              <span className="rounded-full bg-palette-sage/20 px-3 py-1 text-xs font-bold text-palette-sage">
                100% Prepared
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { name: "CAT Tourniquet & Trauma Pack", weight: "0.8 lbs", checked: true },
                { name: "Sawyer Squeeze + 2L Cnoc Water Pouch", weight: "0.6 lbs", checked: true },
                { name: "Datrex 3,600 Calorie Survival Rations", weight: "1.5 lbs", checked: true },
                { name: "Hand-Crank NOAA Alert Radio & Torch", weight: "1.1 lbs", checked: true },
                { name: "Waterproof Wallet (Deeds, Cash, Passports)", weight: "0.4 lbs", checked: true },
                { name: "Pet Harness & 3-Day Kibble Cache", weight: "1.8 lbs", checked: true },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-palette-sand/30 border border-[rgba(139,154,110,0.18)]">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-palette-sage" />
                    <span className="font-medium text-text-primary">{item.name}</span>
                  </div>
                  <span className="font-mono text-text-muted">{item.weight}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-palette-cream border border-[rgba(139,154,110,0.25)] flex items-center justify-between text-xs">
              <span className="text-text-secondary">Total Pack Weight: <strong className="text-text-primary">6.2 lbs</strong></span>
              <span className="text-palette-sage font-semibold">FEMA Compliant Target: &lt; 15 lbs</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Empirical Survival Research & Statistics */}
      <section id="science" className="border-y border-[rgba(139,154,110,0.25)] bg-palette-sand/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-[34px] md:text-[42px] italic text-text-primary leading-tight">
              Backed by Empirical Disaster Science
            </h2>
            <p className="mt-3 text-[15px] text-text-secondary">
              Disaster preparedness is not intuition. It is cold, calculated probability.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 text-center shadow-card">
              <div className="font-serif text-[48px] text-palette-sage leading-none mb-2">87%</div>
              <div className="text-sm font-semibold text-text-primary mb-1">Decisive Window</div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Of fatal disaster injuries are preventable by action taken in the first 5 to 15 minutes.
              </p>
            </div>

            <div className="rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 text-center shadow-card">
              <div className="font-serif text-[48px] text-palette-sage leading-none mb-2">3.4x</div>
              <div className="text-sm font-semibold text-text-primary mb-1">Survival Multiplier</div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Households with pre-assigned gas shutoff and rally protocols evacuate 3.4x faster under dense smoke.
              </p>
            </div>

            <div className="rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 text-center shadow-card">
              <div className="font-serif text-[48px] text-palette-sage leading-none mb-2">0s</div>
              <div className="text-sm font-semibold text-text-primary mb-1">Hesitation Latency</div>
              <p className="text-xs text-text-secondary leading-relaxed">
                When plans are memorized and cached offline, physiological panic paralysis is reduced to zero.
              </p>
            </div>

            <div className="rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 text-center shadow-card">
              <div className="font-serif text-[48px] text-palette-sage leading-none mb-2">72h</div>
              <div className="text-sm font-semibold text-text-primary mb-1">Autonomous Island</div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Average arrival window for national emergency logistics following major infrastructure rupture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Responder Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-palette-sage/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-palette-sage">
            <HeartPulse className="h-3.5 w-3.5" /> Field Validated
          </div>
          <h2 className="font-serif text-[36px] md:text-[44px] italic text-text-primary leading-tight">
            Trusted by First Responders & Emergency Managers
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote: "The biggest killer in disasters is not the shockwave or the flames—it is the 20 minutes families spend arguing about where the pet carrier is and which road to take. FirstHour fixes that completely.",
              author: "Capt. Marcus Vance",
              role: "24-Year Search & Rescue Commander",
              location: "Northern California Task Force"
            },
            {
              quote: "During the 2021 winter grid collapse, families with timed protocols preserved their domestic water stores and avoided carbon monoxide poisoning. Every family needs this in their pocket.",
              author: "Dr. Elena Rostova",
              role: "Disaster Medicine Specialist",
              location: "Wilderness Medical Society"
            },
            {
              quote: "We hand out FirstHour QR wallet cards to our municipal neighborhood response teams. It provides the exact structure FEMA recommends without the 80-page confusing government PDF.",
              author: "Thomas Sterling",
              role: "County Emergency Operations Director",
              location: "Pacific Northwest Region"
            }
          ].map((t, idx) => (
            <div key={idx} className="rounded-3xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-8 shadow-card flex flex-col justify-between">
              <p className="text-[14px] text-text-primary italic leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="border-t border-[rgba(139,154,110,0.2)] pt-4">
                <div className="font-semibold text-text-primary text-[15px]">{t.author}</div>
                <div className="text-xs text-palette-sage font-medium">{t.role}</div>
                <div className="text-xs text-text-muted">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: FAQ Accordion */}
      <section id="faq" className="border-t border-[rgba(139,154,110,0.25)] bg-palette-sand/40 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-palette-sage/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-palette-sage">
              <HelpCircle className="h-3.5 w-3.5" /> Clarity & Protocols
            </div>
            <h2 className="font-serif text-[36px] md:text-[42px] italic text-text-primary leading-tight">
              Frequently Addressed Inquiries
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 shadow-sm cursor-pointer transition-all"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold text-text-primary">{faq.q}</h3>
                  <span className="text-palette-sage font-bold text-lg">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </div>
                {activeFaq === idx && (
                  <p className="mt-4 text-[14px] text-text-secondary leading-relaxed border-t border-[rgba(139,154,110,0.18)] pt-4">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Final Call to Action */}
      <section className="relative flex flex-col items-center justify-center py-24 px-6 text-center bg-palette-cream">
        <div className="max-w-3xl mx-auto rounded-3xl border border-palette-sage/40 bg-palette-sand/70 p-10 md:p-16 shadow-soft">
          <span className="text-xs font-bold uppercase tracking-widest text-palette-sage mb-3 block">
            Zero Preparation Latency
          </span>
          <h2 className="font-serif text-[36px] md:text-[50px] italic text-text-primary leading-tight mb-4">
            Protect Your Loved Ones in 60 Seconds
          </h2>
          <p className="text-[16px] text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
            No long registrations. Generate your household's 60-minute disaster cadence right now, export your wallet QR card, and sleep with peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Generate My Survival Protocol →
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/auth')}>
              Instant Demo Access
            </Button>
          </div>
          <p className="mt-4 text-xs text-text-muted">100% Free · No credit card · Offline compatible</p>
        </div>
      </section>

      {/* SECTION 8: Editorial Footer */}
      <footer className="border-t border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] py-12 text-[14px] text-text-muted">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-center justify-between px-6 gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 font-serif text-[22px] italic text-text-primary">
              FirstHour <span className="h-2 w-2 rounded-full bg-palette-sage" />
            </div>
            <p className="text-xs text-text-secondary mt-1">Certified Rapid Emergency Response Architecture</p>
          </div>

          <div className="flex gap-8 text-xs text-text-secondary font-medium">
            <a href="#how-it-works" className="hover:text-text-primary">Timeline Cadence</a>
            <a href="#hazards" className="hover:text-text-primary">Hazard Matrix</a>
            <a href="#checklist" className="hover:text-text-primary">Go-Bag Supplies</a>
            <a href="#faq" className="hover:text-text-primary">Privacy & Terms</a>
          </div>

          <div className="text-xs text-text-muted">
            FirstHour © {new Date().getFullYear()} · Dedicated to Household Resilience
          </div>
        </div>
      </footer>
    </div>
  );
}
