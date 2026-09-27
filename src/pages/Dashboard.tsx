import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { usePlanStore, type SurvivalPlan } from '../store/planStore';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Share2, Download, LogOut, CheckCircle2, Circle, 
  ShieldCheck, Radio, PhoneCall, Package, Plus,
  ChevronRight, ArrowLeft, RefreshCw, Printer, Clock
} from 'lucide-react';
import { GenerateModal } from '../components/generate/GenerateModal';
import { Button } from '../components/ui/Button';
import { DISASTER_TYPES } from '../lib/constants';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const { plans, toggleStep, deletePlan, resetDefaultPlans } = usePlanStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'home' | 'plans' | 'supplies' | 'contacts'>('home');
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [viewingPlanId, setViewingPlanId] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState<string | null>(null);

  if (!user) {
    navigate('/auth');
    return null;
  }

  const viewingPlan = plans.find(p => p.id === viewingPlanId);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  // Calculate completion percentage across all plans
  const totalSteps = plans.reduce((acc, p) => acc + p.phases.reduce((pAcc, ph) => pAcc + ph.steps.length, 0), 0);
  const completedSteps = plans.reduce((acc, p) => acc + p.phases.reduce((pAcc, ph) => pAcc + ph.steps.filter(s => s.completed).length, 0), 0);
  const readinessPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 78;

  return (
    <div className="flex h-screen w-full bg-palette-cream text-text-primary overflow-hidden">
      {/* SIDEBAR */}
      <aside className="hidden w-[260px] flex-col border-r border-[rgba(139,154,110,0.25)] bg-palette-sand/70 md:flex">
        <div className="p-6 border-b border-[rgba(139,154,110,0.2)]">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 font-serif text-[24px] italic text-text-primary cursor-pointer hover:opacity-80 transition-opacity"
          >
            FirstHour <span className="h-2 w-2 rounded-full bg-palette-sage" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mt-1 block">
            Command & Readiness
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 px-4 py-5">
          {[
            { id: 'home', label: 'Command Center', icon: ShieldCheck },
            { id: 'plans', label: 'Survival Protocols', icon: Zap, count: plans.length },
            { id: 'supplies', label: '72-Hour Go-Bag Audit', icon: Package },
            { id: 'contacts', label: 'Emergency Contacts', icon: PhoneCall },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !viewingPlanId;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setViewingPlanId(null); }}
                className={`relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'text-text-primary bg-[#FFFFFF] shadow-sm border border-[rgba(139,154,110,0.3)]' 
                    : 'text-text-secondary hover:bg-palette-sand hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-palette-sage' : 'text-text-muted'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="rounded-full bg-palette-sage/20 px-2 py-0.5 text-[11px] font-bold text-palette-sage">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="mt-6 pt-4 border-t border-[rgba(139,154,110,0.2)]">
            <button 
              onClick={() => setIsGenerateOpen(true)}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-palette-sage px-4 py-3 text-sm font-semibold text-[#F7F2EB] shadow-[0_4px_14px_rgba(139,154,110,0.3)] hover:bg-[#78875C] transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Generate New Plan
            </button>
          </div>
        </nav>

        {/* User Card & Sign Out */}
        <div className="p-4 border-t border-[rgba(139,154,110,0.2)] bg-palette-cream/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-palette-sage text-white font-bold text-sm">
              {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-semibold text-text-primary truncate">{user.displayName || 'Authorized Responder'}</span>
              <span className="text-[11px] text-text-muted truncate">{user.email}</span>
            </div>
          </div>
          <button 
            onClick={handleSignOut} 
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-text-muted hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out of platform
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] px-6 md:px-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')} 
              className="md:hidden font-serif italic text-lg text-text-primary"
            >
              FirstHour
            </button>
            <div className="h-4 w-px bg-palette-grey md:hidden" />
            <h1 className="text-[17px] md:text-[19px] font-semibold text-text-primary">
              {viewingPlan 
                ? 'Survival Protocol Dossier' 
                : activeTab === 'home' 
                  ? `Command Center · ${user.displayName || 'Chief Responder'}`
                  : activeTab === 'plans' 
                    ? 'Active Survival Protocols' 
                    : activeTab === 'supplies' 
                      ? '72-Hour Supply Audit' 
                      : 'Emergency Network Contacts'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-palette-sage/30 bg-palette-sand/40 px-3 py-1 text-xs text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-palette-sage animate-pulse" />
              <span>Offline Cache Active</span>
            </div>
            <Button size="sm" onClick={() => setIsGenerateOpen(true)}>
              <Plus className="mr-1 h-3.5 w-3.5" /> New Protocol
            </Button>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {viewingPlan ? (
            <PlanView 
              plan={viewingPlan} 
              onBack={() => setViewingPlanId(null)} 
              toggleStep={toggleStep}
              onShare={() => setShowShareModal(viewingPlan.id)}
            />
          ) : activeTab === 'home' ? (
            <div className="flex flex-col gap-8 max-w-6xl mx-auto">
              {/* Emergency Advisory Strip */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-[rgba(139,154,110,0.35)] bg-palette-sand p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-palette-sage text-white">
                    <Radio className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-palette-sage">USGS / NOAA Live Feed</span>
                      <span className="text-[11px] text-text-muted">• Monitored</span>
                    </div>
                    <p className="text-[13px] font-medium text-text-primary">
                      All local civil seismic & meteorological telemetry within nominal thresholds.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsGenerateOpen(true)}
                  className="text-xs font-semibold text-palette-sage hover:underline shrink-0"
                >
                  Audit Household Plan →
                </button>
              </motion.div>

              {/* Status Overview Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Readiness Score */}
                <div className="flex flex-col justify-between rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-5 shadow-card">
                  <div className="flex items-center justify-between text-text-muted">
                    <span className="text-xs font-semibold uppercase tracking-wider">Readiness Score</span>
                    <ShieldCheck className="h-5 w-5 text-palette-sage" />
                  </div>
                  <div className="my-2">
                    <div className="font-serif text-[42px] leading-none text-text-primary">{readinessPercent}%</div>
                    <div className="mt-2 h-2 w-full rounded-full bg-palette-grey overflow-hidden">
                      <div className="h-full bg-palette-sage rounded-full" style={{ width: `${readinessPercent}%` }} />
                    </div>
                  </div>
                  <p className="text-[12px] text-text-secondary">Based on verified steps & gear</p>
                </div>

                {/* Active Plans */}
                <div className="flex flex-col justify-between rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-5 shadow-card">
                  <div className="flex items-center justify-between text-text-muted">
                    <span className="text-xs font-semibold uppercase tracking-wider">Active Protocols</span>
                    <Zap className="h-5 w-5 text-palette-sage" />
                  </div>
                  <div className="my-2">
                    <div className="font-serif text-[42px] leading-none text-text-primary">{plans.length}</div>
                    <p className="text-[13px] font-medium text-text-primary mt-1">Multi-Hazard Plans Ready</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('plans')}
                    className="text-[12px] font-semibold text-palette-sage hover:underline text-left"
                  >
                    View all protocols →
                  </button>
                </div>

                {/* 60-Minute Cadence */}
                <div className="flex flex-col justify-between rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-5 shadow-card">
                  <div className="flex items-center justify-between text-text-muted">
                    <span className="text-xs font-semibold uppercase tracking-wider">Timed Phases</span>
                    <Clock className="h-5 w-5 text-palette-sage" />
                  </div>
                  <div className="my-2">
                    <div className="font-serif text-[42px] leading-none text-text-primary">3</div>
                    <p className="text-[13px] font-medium text-text-primary mt-1">0–5m • 5–15m • 15–60m</p>
                  </div>
                  <p className="text-[12px] text-text-secondary">Zero-hesitation execution</p>
                </div>

                {/* Offline Sync */}
                <div className="flex flex-col justify-between rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-5 shadow-card">
                  <div className="flex items-center justify-between text-text-muted">
                    <span className="text-xs font-semibold uppercase tracking-wider">Wallet Cards</span>
                    <Download className="h-5 w-5 text-palette-sage" />
                  </div>
                  <div className="my-2">
                    <div className="font-serif text-[42px] leading-none text-text-primary">Synced</div>
                    <p className="text-[13px] font-medium text-text-primary mt-1">Offline Cache Available</p>
                  </div>
                  <p className="text-[12px] text-text-secondary">Works without cellular grid</p>
                </div>
              </div>

              {/* Your Survival Plans (Comprehensive List) */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[20px] font-serif italic text-text-primary">Household Survival Protocols</h2>
                    <p className="text-[13px] text-text-secondary">Customized emergency cadences for your household members.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={resetDefaultPlans}>
                      <RefreshCw className="mr-1 h-3.5 w-3.5" /> Reset Defaults
                    </Button>
                    <Button size="sm" onClick={() => setIsGenerateOpen(true)}>
                      <Plus className="mr-1 h-3.5 w-3.5" /> Add Protocol
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3">
                  {plans.map(plan => {
                    const disaster = DISASTER_TYPES.find(d => d.id === plan.disasterType);
                    const completedInPlan = plan.phases.reduce((acc, ph) => acc + ph.steps.filter(s => s.completed).length, 0);
                    const totalInPlan = plan.phases.reduce((acc, ph) => acc + ph.steps.length, 0);
                    const percent = totalInPlan > 0 ? Math.round((completedInPlan / totalInPlan) * 100) : 0;

                    return (
                      <div 
                        key={plan.id}
                        onClick={() => setViewingPlanId(plan.id)}
                        className="group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-5 shadow-card hover:border-palette-sage hover:shadow-soft transition-all cursor-pointer"
                      >
                        <div className="flex items-start md:items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-palette-sand border border-[rgba(139,154,110,0.2)] text-2xl">
                            {disaster?.emoji || '⚡'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-[16px] font-semibold text-text-primary group-hover:text-palette-sage transition-colors">
                                {plan.title}
                              </h3>
                              <span className="rounded-full bg-palette-sand px-2.5 py-0.5 text-[11px] font-medium text-text-secondary">
                                {plan.phases.length} Phases
                              </span>
                            </div>
                            <p className="text-[13px] text-text-secondary mt-0.5">{plan.subtitle}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                              <span>{totalInPlan} Actionable Steps</span>
                              <span>•</span>
                              <span>{completedInPlan} of {totalInPlan} completed ({percent}%)</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 self-end md:self-center" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => setShowShareModal(plan.id)}
                          >
                            <Share2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deletePlan(plan.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => setViewingPlanId(plan.id)}
                          >
                            Execute Protocol <ChevronRight className="ml-1 h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Emergency Preparedness Modules */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* 72-Hour Supply Kit Audit */}
                <div className="rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-palette-sand text-palette-sage">
                        <Package className="h-4 w-4" />
                      </div>
                      <h3 className="font-serif italic text-lg text-text-primary">Go-Bag Supplies Audit</h3>
                    </div>
                    <span className="text-xs font-semibold text-palette-sage">8/10 Ready</span>
                  </div>
                  <p className="text-xs text-text-secondary mb-4">Essential survival gear stored at primary residence exit.</p>
                  <div className="space-y-2 text-xs">
                    {[
                      { item: "Sawyer Mini 0.1 Micron Water Filter & 6L Reservoir", ready: true },
                      { item: "Datrex 3,600 kcal Emergency Caloric Rations (5-year)", ready: true },
                      { item: "Hand-Crank NOAA Weather Alert Radio & Strobe", ready: true },
                      { item: "CAT Gen-7 Arterial Tourniquet & Trauma Dressing", ready: true },
                      { item: "Waterproof Canister for Deeds, Passports & Cash", ready: false },
                    ].map((g, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-palette-sand/40">
                        <span className="text-text-primary">{g.item}</span>
                        <span className={`text-[11px] font-bold ${g.ready ? 'text-palette-sage' : 'text-amber-700'}`}>
                          {g.ready ? '✓ Staged' : '! Missing'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analog Communications Plan */}
                <div className="rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-palette-sand text-palette-sage">
                        <PhoneCall className="h-4 w-4" />
                      </div>
                      <h3 className="font-serif italic text-lg text-text-primary">Zero-Cellular Comms Plan</h3>
                    </div>
                    <span className="text-xs font-semibold text-palette-sage">Verified</span>
                  </div>
                  <p className="text-xs text-text-secondary mb-4">When cell towers jam, adhere strictly to these channels.</p>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-lg border border-[rgba(139,154,110,0.2)] bg-palette-cream">
                      <div className="font-semibold text-text-primary">Out-of-State Primary Anchor</div>
                      <div className="text-text-secondary">Marcus Hayes (Denver, CO) · +1 (303) 555-0192 (SMS only)</div>
                    </div>
                    <div className="p-3 rounded-lg border border-[rgba(139,154,110,0.2)] bg-palette-cream">
                      <div className="font-semibold text-text-primary">Local Family Rally Point</div>
                      <div className="text-text-secondary">St. Jude Community Park Pavilion (2.4 miles West)</div>
                    </div>
                    <div className="p-3 rounded-lg border border-[rgba(139,154,110,0.2)] bg-palette-cream">
                      <div className="font-semibold text-text-primary">Two-Way FRS / GMRS Standard</div>
                      <div className="text-text-secondary">Channel 1 (462.5625 MHz) · Top of every hour for 10 minutes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'plans' ? (
            /* PLANS TAB */
            <div className="flex flex-col gap-4 max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-[24px] font-serif italic text-text-primary">All Survival Protocols</h2>
                  <p className="text-[14px] text-text-secondary">Review, edit, and drill your customized disaster plans.</p>
                </div>
                <Button onClick={() => setIsGenerateOpen(true)}>
                  <Plus className="mr-1 h-4 w-4" /> Create New Plan
                </Button>
              </div>

              <div className="grid gap-3">
                {plans.map(plan => (
                  <div 
                    key={plan.id}
                    onClick={() => setViewingPlanId(plan.id)}
                    className="flex items-center justify-between p-5 rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] shadow-sm hover:border-palette-sage hover:shadow-md transition-all cursor-pointer"
                  >
                    <div>
                      <h3 className="text-[17px] font-semibold text-text-primary">{plan.title}</h3>
                      <p className="text-[13px] text-text-secondary mt-1">{plan.subtitle}</p>
                      <div className="text-xs text-text-muted mt-2">
                        {plan.phases.reduce((acc, ph) => acc + ph.steps.length, 0)} total action steps across 3 phases
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      Open Plan →
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'supplies' ? (
            /* SUPPLIES TAB */
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-[24px] font-serif italic text-text-primary">72-Hour Survival Go-Bag Inventory</h2>
                <p className="text-[14px] text-text-secondary">Standard FEMA / Red Cross disaster supply checklist tailored for immediate evacuation.</p>
              </div>

              <div className="grid gap-4">
                {[
                  { cat: "Water & Hydration", items: ["1 Gallon per person per day (3-day minimum)", "Sawyer Squeeze or LifeStraw filter", "Potable Aqua iodine water purification tablets"] },
                  { cat: "Food & Sustenance", items: ["3,600 kcal non-perishable survival food bars", "Manual can opener and metal mess kit", "Electrolyte hydration powder packs"] },
                  { cat: "First Aid & Trauma", items: ["Combat Application Tourniquet (CAT Gen 7)", "QuikClot hemostatic gauze dressing", "Emergency splint, burn gel, and antibiotic ointment"] },
                  { cat: "Tools & Shelter", items: ["Emergency Mylar thermal bivvy blankets", "Multi-tool with pliers and wire cutter", "Duct tape, paracord (50 ft), and stormproof matches"] },
                  { cat: "Communication & Power", items: ["Hand-crank AM/FM/NOAA weather radio", "High-capacity power bank with solar charging", "Loud emergency signaling whistle"] },
                ].map((section, idx) => (
                  <div key={idx} className="rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 shadow-sm">
                    <h3 className="font-serif italic text-[18px] text-text-primary mb-3">{section.cat}</h3>
                    <div className="space-y-2.5">
                      {section.items.map((item, itemIdx) => (
                        <label key={itemIdx} className="flex items-center gap-3 p-2.5 rounded-xl bg-palette-sand/30 hover:bg-palette-sand/50 transition-colors cursor-pointer">
                          <input type="checkbox" defaultChecked={itemIdx < 2} className="h-4 w-4 rounded border-palette-sage text-palette-sage focus:ring-palette-sage" />
                          <span className="text-[14px] text-text-primary">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* CONTACTS TAB */
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-[24px] font-serif italic text-text-primary">Emergency Contact Directory</h2>
                <p className="text-[14px] text-text-secondary">Keep physical and digital copies in all vehicle gloveboxes and go-bags.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "National Emergency Services", number: "911", desc: "Life-threatening emergencies only" },
                  { title: "FEMA Disaster Helpline", number: "1-800-621-3362", desc: "Federal relief & registration" },
                  { title: "Poison Control Center", number: "1-800-222-1222", desc: "24/7 toxic exposure guidance" },
                  { title: "Red Cross Disaster Relief", number: "1-800-733-2767", desc: "Shelter locator & reunification" },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-5 shadow-sm">
                    <div className="text-xs font-semibold text-palette-sage uppercase tracking-wider">{c.title}</div>
                    <div className="font-serif text-[24px] text-text-primary my-1">{c.number}</div>
                    <p className="text-xs text-text-secondary">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Share / QR Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowShareModal(null)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-sm rounded-2xl border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-6 text-center shadow-2xl"
            >
              <h3 className="font-serif text-[22px] italic text-text-primary mb-2">Offline Survival QR</h3>
              <p className="text-xs text-text-secondary mb-6">Scan with any phone camera to save this protocol offline into Apple Wallet or Android Files.</p>
              
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-palette-sage bg-palette-sand/40 p-4">
                <div className="flex flex-col items-center gap-2">
                  <ShieldCheck className="h-16 w-16 text-palette-sage" />
                  <span className="text-[11px] font-mono text-text-muted">FIRSTHOUR-SYNC-VALID</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <Button onClick={() => setShowShareModal(null)}>Done</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Generate Modal */}
      <AnimatePresence>
        {isGenerateOpen && (
          <GenerateModal 
            isOpen={isGenerateOpen} 
            onClose={() => setIsGenerateOpen(false)} 
            onPlanCreated={(id) => { 
              setIsGenerateOpen(false); 
              setViewingPlanId(id); 
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// PlanView Component
function PlanView({ 
  plan, 
  onBack, 
  toggleStep,
  onShare 
}: { 
  plan: SurvivalPlan; 
  onBack: () => void; 
  toggleStep: (planId: string, phaseId: string, stepId: string) => void;
  onShare: () => void;
}) {
  const completedCount = plan.phases.reduce((acc, p) => acc + p.steps.filter(s => s.completed).length, 0);
  const totalCount = plan.phases.reduce((acc, p) => acc + p.steps.length, 0);
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8 max-w-4xl mx-auto pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-sm font-semibold text-palette-sage hover:underline cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Command Center
        </button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={() => window.print()}>
            <Printer className="mr-1.5 h-3.5 w-3.5" /> Print Pocket Dossier
          </Button>
          <Button size="sm" onClick={onShare}>
            <Share2 className="mr-1.5 h-3.5 w-3.5" /> Share / QR Card
          </Button>
        </div>
      </div>

      {/* Header Info */}
      <div className="rounded-3xl border border-[rgba(139,154,110,0.3)] bg-[#FFFFFF] p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-palette-sand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-palette-sage mb-3">
              <ShieldCheck className="h-3.5 w-3.5" /> Certified Disaster Cadence
            </div>
            <h1 className="font-serif text-[32px] md:text-[38px] italic text-text-primary leading-tight">
              {plan.title}
            </h1>
            <p className="text-[15px] text-text-secondary mt-1">{plan.subtitle}</p>
          </div>

          <div className="flex flex-col items-start md:items-end shrink-0">
            <span className="text-xs text-text-muted">Protocol Completion</span>
            <span className="font-serif text-[32px] text-palette-sage">{percent}%</span>
            <span className="text-xs text-text-secondary">{completedCount} of {totalCount} verified</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-2.5 w-full rounded-full bg-palette-grey overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            className="h-full bg-palette-sage rounded-full"
          />
        </div>
      </div>

      {/* Timed Phases List */}
      <div className="flex flex-col gap-6">
        {plan.phases.map((phase, i) => (
          <div 
            key={phase.id} 
            className="rounded-3xl border border-[rgba(139,154,110,0.25)] bg-[#FFFFFF] p-6 md:p-8 shadow-card"
          >
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(139,154,110,0.18)] pb-4">
              <div className="flex items-center gap-3">
                <span className={`rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                  i === 0 
                    ? 'bg-palette-sage text-[#F7F2EB]' 
                    : i === 1 
                      ? 'bg-palette-sand text-text-primary border border-palette-sage/30' 
                      : 'bg-palette-grey text-text-primary'
                }`}>
                  Phase {i + 1}
                </span>
                <h3 className="font-serif text-[22px] italic text-text-primary">{phase.title}</h3>
              </div>
              <span className="text-xs font-mono font-semibold text-text-muted">
                Cadence Window: {phase.timeRange}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {phase.steps.map((step, stepIdx) => (
                <div 
                  key={step.id} 
                  onClick={() => toggleStep(plan.id, phase.id, step.id)}
                  className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all ${
                    step.completed 
                      ? 'border-palette-sage/30 bg-palette-sand/40 opacity-75' 
                      : 'border-[rgba(139,154,110,0.2)] bg-palette-cream/40 hover:border-palette-sage hover:bg-palette-sand/30'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {step.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-palette-sage" />
                    ) : (
                      <Circle className="h-5 w-5 text-[rgba(139,154,110,0.4)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-[15px] font-semibold text-text-primary ${step.completed ? 'line-through text-text-muted' : ''}`}>
                        {stepIdx + 1}. {step.title}
                      </h4>
                      {step.priority === 'critical' && (
                        <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700 uppercase tracking-wider">
                          Critical
                        </span>
                      )}
                    </div>
                    <p className={`text-[13px] text-text-secondary mt-1 ${step.completed ? 'line-through text-text-muted' : ''}`}>
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
