export const PREFERENCES = [
  { 
    id: 'no_smoking', 
    label: '🚭 Niet roken', 
    icon: '🚭',
    category: 'comfort'
  },
  { 
    id: 'quiet_ride', 
    label: '🔇 Rustige Rid', 
    icon: '🔇',
    category: 'comfort'
  },
  { 
    id: 'music_ok', 
    label: '🎵 Muziek OK', 
    icon: '🎵',
    category: 'entertainment'
  },
  { 
    id: 'pets_ok', 
    label: '🐾 Dieren Toegestaan', 
    icon: '🐾',
    category: 'animals'
  },
  { 
    id: 'luggage_space', 
    label: '🧳 Bagage Ruimte', 
    icon: '🧳',
    category: 'luggage'
  },
  { 
    id: 'ac', 
    label: '❄️ Air Conditioning', 
    icon: '❄️',
    category: 'comfort'
  },
  { 
    id: 'chatty', 
    label: '💬 Spraakzaam', 
    icon: '💬',
    category: 'social'
  },
] as const;

export type PreferenceId = typeof PREFERENCES[number]['id'];