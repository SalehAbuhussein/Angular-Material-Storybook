import type { Line } from './terminal.types';

export const COMMANDS = ['help', 'status', 'deploy', 'scale', 'logs', 'whoami', 'clear'];

export const BANNER: Line[] = [
  { kind: 'out', text: 'ORBITAL CONTROL v3.2.0  (build 8f21c0)' },
  { kind: 'out', text: 'Type `help` for available commands.' },
  { kind: 'out', text: '' },
];

/** How long `deploy` and `scale` pretend to work, in milliseconds. */
export const JOB_MS = 1300;
