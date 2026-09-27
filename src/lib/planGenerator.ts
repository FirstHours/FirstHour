import type { SurvivalPlan, PlanStep } from '../store/planStore';
import { DISASTER_TYPES, type DisasterId } from './constants';

interface GeneratorInputs {
  disasterType: DisasterId;
  environment: string; // Urban, Suburban, Rural, Remote
  building: string; // House, Apartment, Office, Vehicle, Outdoors
  adults: number;
  children: number;
  elderly: boolean;
  pets: boolean;
  medical: string;
}

export function generatePlan(inputs: GeneratorInputs): Omit<SurvivalPlan, 'id' | 'createdAt'> {
  const disasterName = DISASTER_TYPES.find(d => d.id === inputs.disasterType)?.name || 'Emergency';
  
  const phase1: PlanStep[] = [];
  const phase2: PlanStep[] = [];
  const phase3: PlanStep[] = [];

  const addStep = (phase: number, title: string, detail: string, priority: 'critical'|'urgent'|'normal' = 'normal') => {
    const step: PlanStep = { id: crypto.randomUUID(), title, detail, priority, completed: false };
    if (phase === 1) phase1.push(step);
    else if (phase === 2) phase2.push(step);
    else phase3.push(step);
  };

  // Base steps by disaster type
  if (inputs.disasterType === 'earthquake') {
    addStep(1, 'Drop, Cover, and Hold On', 'Get under a sturdy piece of furniture immediately.', 'critical');
    if (inputs.building === 'Apartment' || inputs.building === 'Office') {
      addStep(1, 'Stay away from windows and exterior walls', 'Do not use elevators under any circumstances.', 'critical');
    }
    addStep(2, 'Check for injuries and structural damage', 'Assess your immediate surroundings before moving.', 'urgent');
    addStep(2, 'Turn off gas main if you smell gas', 'Do not light matches or turn on light switches.', 'urgent');
    addStep(3, 'Prepare for aftershocks', 'Put on sturdy shoes to protect from broken glass.', 'normal');
  } else if (inputs.disasterType === 'flood') {
    addStep(1, 'Move to higher ground immediately', 'Do not wait for instructions if water is rising rapidly.', 'critical');
    addStep(2, 'Turn off main power and gas', 'Only do this if you can reach switches without stepping in water.', 'urgent');
    addStep(3, 'Gather emergency supplies', 'Focus on water, non-perishable food, and medications.', 'normal');
  } else if (inputs.disasterType === 'wildfire') {
    addStep(1, 'Dress for survival', 'Wear long pants, long sleeves, heavy shoes, and a dry mask or cloth.', 'critical');
    addStep(2, 'Pack your vehicle', 'Position your car pointing outward with keys in the ignition.', 'urgent');
    addStep(2, 'Close all windows and doors', 'Remove flammable window shades and lightweight curtains.', 'urgent');
    addStep(3, 'Turn on all lights', 'This makes your house visible in heavy smoke.', 'normal');
  } else {
    addStep(1, 'Assess immediate danger', 'Determine if you need to evacuate or shelter in place.', 'critical');
    addStep(2, 'Secure your perimeter', 'Lock doors, close windows, and gather in a central location.', 'urgent');
    addStep(3, 'Monitor emergency broadcasts', 'Use a battery-operated radio or cell phone for updates.', 'normal');
  }

  // Personalization
  if (inputs.children > 0) {
    addStep(1, 'Secure children immediately', 'Keep children close and explain the situation calmly.', 'critical');
    addStep(2, 'Assign tasks to older children', 'Give them simple responsibilities to keep them focused.', 'normal');
    addStep(3, 'Pack comfort items', 'Grab a favorite toy or blanket to reduce trauma.', 'normal');
  }

  if (inputs.pets) {
    addStep(1, 'Leash or cage pets', 'Animals may panic and hide. Secure them immediately.', 'urgent');
    addStep(3, 'Pack pet supplies', 'Include food, water, and veterinary records.', 'normal');
  }

  if (inputs.elderly) {
    addStep(1, 'Assist elderly family members', 'Ensure they have mobility aids ready.', 'critical');
    addStep(2, 'Prepare crucial medical equipment', 'Pack hearing aids, glasses, and mobility devices.', 'urgent');
  }

  if (inputs.medical.trim().length > 0) {
    addStep(1, 'Secure critical medications', `Ensure access to: ${inputs.medical}`, 'critical');
  }

  if (inputs.environment === 'Remote') {
    addStep(3, 'Prepare for zero assistance', 'Emergency services may not reach you. Rely on your supplies.', 'urgent');
  }

  return {
    title: `60-Minute ${disasterName} Protocol`,
    subtitle: `${inputs.environment} ${inputs.building.toLowerCase()} · ${inputs.adults} adults · ${inputs.children} children${inputs.pets ? ' · pets' : ''}`,
    disasterType: inputs.disasterType,
    phases: [
      { id: 'p1', title: '0 to 5 Minutes: Survive the initial event', timeRange: '0–5 min', steps: phase1 },
      { id: 'p2', title: '5 to 15 Minutes: Immediate response', timeRange: '5–15 min', steps: phase2 },
      { id: 'p3', title: '15 to 60 Minutes: Stabilize and evacuate', timeRange: '15–60 min', steps: phase3 },
    ]
  };
}
