import type { Release } from './table.types';

export const RELEASES: Release[] = [
  { version: '22.1.7', name: 'Aluminium', released: '2026-02-10', status: 'active', notes: 'Material 3 tokens are the default theme surface.' },
  { version: '21.2.0', name: 'Krypton', released: '2025-09-02', status: 'lts', notes: 'Signal queries became stable.' },
  { version: '20.0.4', name: 'Mercury', released: '2025-05-28', status: 'lts', notes: 'Zoneless change detection went to developer preview.' },
  { version: '19.3.1', name: 'Neon', released: '2024-11-19', status: 'end of life', notes: 'Last release with the legacy theming API.' },
  { version: '18.2.0', name: 'Cobalt', released: '2024-06-05', status: 'end of life', notes: 'Standalone components became the default.' },
];
