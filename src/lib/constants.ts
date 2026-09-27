export const DISASTER_TYPES = [
  { id: 'earthquake', name: 'Earthquake', emoji: '🌋', color: 'amber' },
  { id: 'flood', name: 'Flood', emoji: '🌊', color: 'blue' },
  { id: 'wildfire', name: 'Wildfire', emoji: '🔥', color: 'coral' },
  { id: 'hurricane', name: 'Hurricane', emoji: '🌀', color: 'purple' },
  { id: 'tornado', name: 'Tornado', emoji: '🌪️', color: 'gray' },
  { id: 'tsunami', name: 'Tsunami', emoji: '🌊', color: 'blue' },
  { id: 'chemical_spill', name: 'Chemical Spill', emoji: '🧪', color: 'green' },
  { id: 'power_outage', name: 'Power Outage', emoji: '⚡', color: 'yellow' }
] as const;

export type DisasterId = typeof DISASTER_TYPES[number]['id'];
