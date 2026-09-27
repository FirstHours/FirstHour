import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DISASTER_TYPES, type DisasterId } from '../../lib/constants';
import { Button } from '../ui/Button';
import { generatePlan } from '../../lib/planGenerator';
import { usePlanStore } from '../../store/planStore';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';

interface GenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanCreated: (planId: string) => void;
}

export function GenerateModal({ isOpen, onClose, onPlanCreated }: GenerateModalProps) {
  const [step, setStep] = useState(1);
  const [disasterType, setDisasterType] = useState<DisasterId | null>('earthquake');
  const [environment, setEnvironment] = useState('Urban');
  const [building, setBuilding] = useState('Apartment');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [elderly, setElderly] = useState(false);
  const [pets, setPets] = useState(true);
  const [medical, setMedical] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  
  const { addPlan } = usePlanStore();

  const loadingMessages = [
    "Analyzing geographical hazard matrix...",
    "Calculating prioritized family evacuation milestones...",
    "Sequencing the 60-minute critical response cadence...",
    "Generating offline wallet sync card..."
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % loadingMessages.length);
      }, 1000);
      
      const timeout = setTimeout(() => {
        const planData = generatePlan({
          disasterType: disasterType!,
          environment, building, adults, children, elderly, pets, medical
        });
        const newPlan = { ...planData, id: 'plan_' + crypto.randomUUID().substring(0, 8), createdAt: Date.now() };
        addPlan(newPlan);
        onPlanCreated(newPlan.id);
      }, 3000);

      return () => { clearInterval(interval); clearTimeout(timeout); };
    }
  }, [isGenerating]);

  useEffect(() => {
    if (isOpen) {
      setStep(1); 
      setIsGenerating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#1C2216]/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Dialog */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="relative z-10 w-full max-w-[620px] max-h-[92vh] overflow-y-auto rounded-[24px] border border-[rgba(139,154,110,0.35)] bg-[#FFFFFF] p-8 md:p-10 shadow-2xl text-text-primary"
      >
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 text-text-muted hover:bg-palette-sand hover:text-text-primary transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div key="generating" className="flex h-[380px] flex-col items-center justify-center text-center">
              <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-palette-sand border border-palette-sage/30">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-3 border-palette-sage border-t-transparent"
                />
                <Sparkles className="h-8 w-8 text-palette-sage" />
              </div>
              
              <h3 className="font-serif text-[24px] italic text-text-primary mb-2">Synthesizing Survival Protocol</h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingMsgIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-[15px] text-text-secondary font-medium"
                >
                  {loadingMessages[loadingMsgIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Stepper Header */}
              <div className="mb-6 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  <span>Protocol Architect · Step {step} of 4</span>
                  <span>{Math.round((step / 4) * 100)}% Complete</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div 
                      key={i} 
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        step >= i ? 'bg-palette-sage' : 'bg-palette-grey'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Threat Selection */}
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="font-serif text-[28px] italic text-text-primary mb-1">Select Disaster Scenario</h3>
                    <p className="text-[14px] text-text-secondary">What primary acute threat does your household need an immediate plan for?</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {DISASTER_TYPES.map(d => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDisasterType(d.id)}
                        className={`flex flex-col items-center gap-2.5 rounded-2xl border p-4 text-center transition-all cursor-pointer ${
                          disasterType === d.id 
                            ? 'border-palette-sage bg-palette-sand/70 text-text-primary shadow-sm scale-[1.02] ring-2 ring-palette-sage/30' 
                            : 'border-[rgba(139,154,110,0.2)] bg-palette-cream/50 text-text-secondary hover:border-palette-sage hover:bg-palette-sand/30'
                        }`}
                      >
                        <span className="text-[32px]">{d.emoji}</span>
                        <span className="text-[13px] font-semibold">{d.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button disabled={!disasterType} onClick={() => setStep(2)}>
                      Continue to Location <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Location & Building */}
              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-serif text-[28px] italic text-text-primary mb-1">Your Environment & Structure</h3>
                    <p className="text-[14px] text-text-secondary">Evacuation corridors and shelter options vary drastically by building density.</p>
                  </div>
                  
                  <div>
                    <label className="mb-2.5 block text-[13px] font-semibold text-text-primary">Surrounding Topography</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Urban', 'Suburban', 'Rural', 'Remote'].map(env => (
                        <button
                          key={env}
                          type="button"
                          onClick={() => setEnvironment(env)}
                          className={`rounded-xl py-2.5 px-3 text-[13px] font-medium border transition-all cursor-pointer ${
                            environment === env 
                              ? 'bg-palette-sage text-[#F7F2EB] border-palette-sage shadow-sm' 
                              : 'bg-palette-cream border-[rgba(139,154,110,0.25)] text-text-secondary hover:border-palette-sage'
                          }`}
                        >
                          {env}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2.5 block text-[13px] font-semibold text-text-primary">Structure Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['House', 'Apartment', 'High-Rise Office', 'Vehicle', 'Outdoors'].map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBuilding(b)}
                          className={`rounded-xl py-2.5 px-3 text-[13px] font-medium border transition-all cursor-pointer ${
                            building === b 
                              ? 'bg-palette-sage text-[#F7F2EB] border-palette-sage shadow-sm' 
                              : 'bg-palette-cream border-[rgba(139,154,110,0.25)] text-text-secondary hover:border-palette-sage'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                    <Button className="flex-1" onClick={() => setStep(3)}>
                      Household Dynamics <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Household Members */}
              {step === 3 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-serif text-[28px] italic text-text-primary mb-1">Household Composition</h3>
                    <p className="text-[14px] text-text-secondary">Customized tasks and pacing depend on who is in your care.</p>
                  </div>
                  
                  <div className="space-y-4 rounded-2xl border border-[rgba(139,154,110,0.25)] bg-palette-sand/30 p-5">
                    <div className="flex items-center justify-between border-b border-[rgba(139,154,110,0.2)] pb-4">
                      <div>
                        <span className="text-[14px] font-semibold text-text-primary block">Adults (18+)</span>
                        <span className="text-[12px] text-text-muted">Primary responders & drivers</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))} 
                          className="h-8 w-8 rounded-lg border border-[rgba(139,154,110,0.3)] bg-white text-text-primary font-bold hover:bg-palette-sand transition-colors"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-semibold text-text-primary">{adults}</span>
                        <button 
                          type="button"
                          onClick={() => setAdults(adults + 1)} 
                          className="h-8 w-8 rounded-lg border border-[rgba(139,154,110,0.3)] bg-white text-text-primary font-bold hover:bg-palette-sand transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b border-[rgba(139,154,110,0.2)] pb-4">
                      <div>
                        <span className="text-[14px] font-semibold text-text-primary block">Children / Dependents</span>
                        <span className="text-[12px] text-text-muted">Requires designated buddy supervision</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))} 
                          className="h-8 w-8 rounded-lg border border-[rgba(139,154,110,0.3)] bg-white text-text-primary font-bold hover:bg-palette-sand transition-colors"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-semibold text-text-primary">{children}</span>
                        <button 
                          type="button"
                          onClick={() => setChildren(children + 1)} 
                          className="h-8 w-8 rounded-lg border border-[rgba(139,154,110,0.3)] bg-white text-text-primary font-bold hover:bg-palette-sand transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b border-[rgba(139,154,110,0.2)] pb-4">
                      <div>
                        <span className="text-[14px] font-semibold text-text-primary block">Elderly or Mobility-Limited</span>
                        <span className="text-[12px] text-text-muted">Need specialized mobility assistance or wheelchair</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setElderly(!elderly)} 
                        className={`relative h-[26px] w-[46px] rounded-full transition-colors ${elderly ? 'bg-palette-sage' : 'bg-palette-grey'}`}
                      >
                        <motion.div 
                          layout 
                          className="absolute top-[3px] h-[20px] w-[20px] rounded-full bg-white shadow-sm" 
                          animate={{ left: elderly ? 22 : 3 }} 
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between border-b border-[rgba(139,154,110,0.2)] pb-4">
                      <div>
                        <span className="text-[14px] font-semibold text-text-primary block">Pets / Companion Animals</span>
                        <span className="text-[12px] text-text-muted">Incorporate carrier, leash & food staging</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setPets(!pets)} 
                        className={`relative h-[26px] w-[46px] rounded-full transition-colors ${pets ? 'bg-palette-sage' : 'bg-palette-grey'}`}
                      >
                        <motion.div 
                          layout 
                          className="absolute top-[3px] h-[20px] w-[20px] rounded-full bg-white shadow-sm" 
                          animate={{ left: pets ? 22 : 3 }} 
                        />
                      </button>
                    </div>

                    <div>
                      <label className="mb-2 block text-[13px] font-semibold text-text-primary">
                        Critical Medical / Prescription Requisites (Optional)
                      </label>
                      <input 
                        type="text" 
                        value={medical}
                        onChange={(e) => setMedical(e.target.value)}
                        placeholder="e.g. Insulin, EpiPen, Portable Oxygen, Heart meds"
                        className="w-full rounded-xl border border-[rgba(139,154,110,0.3)] bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-palette-sage focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                    <Button className="flex-1" onClick={() => setStep(4)}>
                      Review Protocol <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Generate */}
              {step === 4 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-serif text-[28px] italic text-text-primary mb-1">Audit Protocol Parameters</h3>
                    <p className="text-[14px] text-text-secondary">Your 60-minute survival roadmap will be structured around these precise conditions.</p>
                  </div>
                  
                  <div className="flex flex-col gap-3 rounded-2xl border border-[rgba(139,154,110,0.3)] bg-palette-sand/40 p-6 text-[14px]">
                    <div className="flex justify-between py-2 border-b border-[rgba(139,154,110,0.2)]">
                      <span className="text-text-secondary">Disaster Threat</span> 
                      <span className="font-semibold text-text-primary capitalize flex items-center gap-1.5">
                        {DISASTER_TYPES.find(d => d.id === disasterType)?.emoji} {disasterType}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[rgba(139,154,110,0.2)]">
                      <span className="text-text-secondary">Environment & Structure</span> 
                      <span className="font-semibold text-text-primary">{environment} · {building}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[rgba(139,154,110,0.2)]">
                      <span className="text-text-secondary">Personnel Deployment</span> 
                      <span className="font-semibold text-text-primary">{adults} Adult(s), {children} Child(ren)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-text-secondary">Specialized Needs</span> 
                      <span className="font-semibold text-text-primary text-right">
                        {[elderly && 'Elderly Mobility', pets && 'Pets Included', medical].filter(Boolean).join(', ') || 'Standard Go-Kit'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Check className="h-4 w-4 text-palette-sage shrink-0" />
                    <span>Includes 0–5m, 5–15m, and 15–60m phases + offline PDF checklist</span>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
                    <Button className="flex-1" onClick={() => setIsGenerating(true)}>
                      Generate My 60-Minute Plan →
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
