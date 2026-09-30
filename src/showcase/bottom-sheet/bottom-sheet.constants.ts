import type { ShareTarget } from './bottom-sheet.types';

export const TARGETS: ShareTarget[] = [
  { id: 'link', label: 'Copy link', icon: 'link' },
  { id: 'email', label: 'Send by email', icon: 'mail' },
  { id: 'drive', label: 'Save to Drive', icon: 'cloud_upload' },
  { id: 'print', label: 'Print', icon: 'print' },
];
