import type { Section } from './settings-page.types';

export const SECTIONS: Section[] = [
  { id: 'profile', label: 'Profile', icon: 'person' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  { id: 'appearance', label: 'Appearance', icon: 'palette' },
  { id: 'security', label: 'Security', icon: 'lock' },
];

export const DIGEST_DAYS = ['Monday', 'Wednesday', 'Friday'];
