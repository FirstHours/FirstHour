import { create } from 'zustand';

export interface PlanStep {
  id: string;
  title: string;
  detail: string;
  priority: 'critical' | 'urgent' | 'normal';
  completed: boolean;
}

export interface PlanPhase {
  id: string;
  title: string;
  timeRange: string;
  steps: PlanStep[];
}

export interface SurvivalPlan {
  id: string;
  title: string;
  subtitle: string;
  disasterType: string;
  createdAt: number;
  phases: PlanPhase[];
}

interface PlanState {
  plans: SurvivalPlan[];
  addPlan: (plan: SurvivalPlan) => void;
  deletePlan: (id: string) => void;
  toggleStep: (planId: string, phaseId: string, stepId: string) => void;
  resetDefaultPlans: () => void;
}

const DEFAULT_SEEDED_PLANS: SurvivalPlan[] = [
  {
    id: 'plan_eq_sf',
    title: '7.2 Richter Major Earthquake Protocol',
    subtitle: 'Urban multi-story residence · 2 adults, 1 child · Pets included',
    disasterType: 'earthquake',
    createdAt: Date.now() - 3600000 * 24 * 2,
    phases: [
      {
        id: 'p1',
        title: '0 to 5 Minutes: Immediate Life Preservation',
        timeRange: '0–5 min',
        steps: [
          {
            id: 's1',
            title: 'Drop, Cover, and Hold On beneath load-bearing tables',
            detail: 'Protect cervical spine immediately. Do NOT run outdoors through falling debris zones.',
            priority: 'critical',
            completed: true
          },
          {
            id: 's2',
            title: 'Don hard-soled boots and headlamp before stepping on floor',
            detail: 'Glass and ruptured structural fasteners account for 68% of post-quake trauma injuries.',
            priority: 'critical',
            completed: true
          },
          {
            id: 's3',
            title: 'Audit household members & calm breathing',
            detail: 'Perform rapid roll call. Ensure children stay low and follow voice commands.',
            priority: 'urgent',
            completed: false
          }
        ]
      },
      {
        id: 'p2',
        title: '5 to 15 Minutes: Utility Neutralization & Secondary Hazards',
        timeRange: '5–15 min',
        steps: [
          {
            id: 's4',
            title: 'Inspect natural gas meter with smell/sound test',
            detail: 'If hiss or sulfur odor detected, use emergency wrench to turn valve 90° perpendicular. Never use matches or switches.',
            priority: 'critical',
            completed: false
          },
          {
            id: 's5',
            title: 'Shut down electrical main breaker panel',
            detail: 'Prevents electrical arching fires when municipal transformers are re-energized by the grid.',
            priority: 'urgent',
            completed: false
          },
          {
            id: 's6',
            title: 'Isolate municipal water shutoff valve',
            detail: 'Preserves the 40–50 gallons of clean drinking water stored in your domestic hot water tank.',
            priority: 'urgent',
            completed: false
          }
        ]
      },
      {
        id: 'p3',
        title: '15 to 60 Minutes: Evacuation Staging & Broadcast Sync',
        timeRange: '15–60 min',
        steps: [
          {
            id: 's7',
            title: 'Tune hand-crank emergency radio to 740 AM / 88.5 FM',
            detail: 'Record local civil defense emergency broadcast instructions and bridge/highway structural closures.',
            priority: 'normal',
            completed: false
          },
          {
            id: 's8',
            title: 'Retrieve primary Go-Bags & medical trauma pouch',
            detail: 'Stage packs by secondary exit door away from exterior masonry facades.',
            priority: 'urgent',
            completed: false
          },
          {
            id: 's9',
            title: 'Send standardized SMS ping to out-of-state emergency contact',
            detail: 'Local phone calls fail due to network congestion; SMS packets route through secondary control channels.',
            priority: 'normal',
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'plan_wf_cal',
    title: 'Rapid-Onset Wildfire & Ember Evacuation Protocol',
    subtitle: 'Wildland-urban interface home · 2 adults · Vehicle egress',
    disasterType: 'wildfire',
    createdAt: Date.now() - 3600000 * 24 * 5,
    phases: [
      {
        id: 'p1',
        title: '0 to 5 Minutes: Egress Preparation & Personal Fortification',
        timeRange: '0–5 min',
        steps: [
          {
            id: 's21',
            title: 'Don 100% natural fiber wool/cotton garments & N95 masks',
            detail: 'Synthetic fibers melt instantly onto skin under intense radiant heat.',
            priority: 'critical',
            completed: false
          },
          {
            id: 's22',
            title: 'Turn car around in driveway facing outbound with keys in ignition',
            detail: 'In dense smoke, turning a vehicle around is disorienting and blocks emergency engines.',
            priority: 'critical',
            completed: false
          }
        ]
      },
      {
        id: 'p2',
        title: '5 to 15 Minutes: Structure Hardening Against Flying Embers',
        timeRange: '5–15 min',
        steps: [
          {
            id: 's23',
            title: 'Turn on all exterior and interior lighting circuits',
            detail: 'Significantly increases structure visibility to aerial firefighting tankers through heavy smoke.',
            priority: 'urgent',
            completed: false
          },
          {
            id: 's24',
            title: 'Close all windows, sliding doors, and chimney dampers',
            detail: 'Prevent hot wind drafts from pulling flaming embers into attic and living spaces.',
            priority: 'urgent',
            completed: false
          }
        ]
      },
      {
        id: 'p3',
        title: '15 to 60 Minutes: Evacuation Corridor Transit',
        timeRange: '15–60 min',
        steps: [
          {
            id: 's25',
            title: 'Load animal crates, pet food, and critical medication cache',
            detail: 'Pets will hide in closets during smoke events; cage immediately before loading cargo.',
            priority: 'urgent',
            completed: false
          },
          {
            id: 's26',
            title: 'Follow designated South River highway evacuation corridor',
            detail: 'Drive with headlights and hazard indicators on. Set vehicle air recirculation to internal mode.',
            priority: 'critical',
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'plan_bl_winter',
    title: 'Severe Grid Blackout & Extended Winter Storm Plan',
    subtitle: 'Suburban single-family · 4 family members · 72-hour autonomous island',
    disasterType: 'power_outage',
    createdAt: Date.now() - 3600000 * 24 * 8,
    phases: [
      {
        id: 'p1',
        title: '0 to 5 Minutes: Surge Defense & Sensor Audit',
        timeRange: '0–5 min',
        steps: [
          {
            id: 's31',
            title: 'Disconnect high-value inverter appliances & HVAC electronics',
            detail: 'Prevents catastrophic burnout from sudden inductive voltage spikes when lines restore.',
            priority: 'urgent',
            completed: true
          },
          {
            id: 's32',
            title: 'Verify battery bank charge state and LED lanterns',
            detail: 'Distribute dedicated light sources to each member; avoid open flames due to carbon monoxide risk.',
            priority: 'critical',
            completed: true
          }
        ]
      },
      {
        id: 'p2',
        title: '5 to 15 Minutes: Core Micro-Climate Room Selection',
        timeRange: '5–15 min',
        steps: [
          {
            id: 's33',
            title: 'Establish south-facing interior room as thermal citadel',
            detail: 'Hang heavy thermal blankets over window glass and doorway thresholds to conserve body heat.',
            priority: 'urgent',
            completed: false
          },
          {
            id: 's34',
            title: 'Open sink faucets to slow drip',
            detail: 'Relieves pressure in freezing copper and PEX pipes to avoid burst plumbing lines.',
            priority: 'urgent',
            completed: false
          }
        ]
      },
      {
        id: 'p3',
        title: '15 to 60 Minutes: Rationing & Civil Monitor',
        timeRange: '15–60 min',
        steps: [
          {
            id: 's35',
            title: 'Audit refrigerated perishable calories first',
            detail: 'Consume chilled foods within 4 hours; do not open freezer chest unnecessarily.',
            priority: 'normal',
            completed: false
          },
          {
            id: 's36',
            title: 'Establish FRS Channel 1 neighborhood radio check-in',
            detail: 'Maintain scheduled 10-minute check-ins at the top of every hour to conserve transceiver batteries.',
            priority: 'normal',
            completed: false
          }
        ]
      }
    ]
  }
];

export const usePlanStore = create<PlanState>((set) => {
  let initialPlans: SurvivalPlan[] = [];
  try {
    const raw = localStorage.getItem('firsthour_plans');
    if (raw) {
      initialPlans = JSON.parse(raw);
    }
  } catch {
    initialPlans = [];
  }

  // Pre-seed if user has no plans so the UI is never half empty
  if (!initialPlans || initialPlans.length === 0) {
    initialPlans = DEFAULT_SEEDED_PLANS;
    try {
      localStorage.setItem('firsthour_plans', JSON.stringify(initialPlans));
    } catch {}
  }

  return {
    plans: initialPlans,
    addPlan: (plan) => set((state) => {
      const newPlans = [plan, ...state.plans];
      try {
        localStorage.setItem('firsthour_plans', JSON.stringify(newPlans));
      } catch {}
      return { plans: newPlans };
    }),
    deletePlan: (id) => set((state) => {
      const newPlans = state.plans.filter((p) => p.id !== id);
      try {
        localStorage.setItem('firsthour_plans', JSON.stringify(newPlans));
      } catch {}
      return { plans: newPlans };
    }),
    toggleStep: (planId, phaseId, stepId) => set((state) => {
      const newPlans = state.plans.map((plan) => {
        if (plan.id !== planId) return plan;
        return {
          ...plan,
          phases: plan.phases.map((phase) => {
            if (phase.id !== phaseId) return phase;
            return {
              ...phase,
              steps: phase.steps.map((step) => {
                if (step.id !== stepId) return step;
                return { ...step, completed: !step.completed };
              })
            };
          })
        };
      });
      try {
        localStorage.setItem('firsthour_plans', JSON.stringify(newPlans));
      } catch {}
      return { plans: newPlans };
    }),
    resetDefaultPlans: () => {
      try {
        localStorage.setItem('firsthour_plans', JSON.stringify(DEFAULT_SEEDED_PLANS));
      } catch {}
      set({ plans: DEFAULT_SEEDED_PLANS });
    }
  };
});
