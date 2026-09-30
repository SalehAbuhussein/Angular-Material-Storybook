import type { Step } from './controlled-accordion.types';

export const STEPS: Step[] = [
  { id: 'account', title: 'Account', body: 'Pick the workspace this project belongs to.' },
  { id: 'members', title: 'Members', body: 'Invite the people who need access on day one.' },
  { id: 'review', title: 'Review', body: 'Check the summary, then create the project.' },
];

/** The value of `open` when every panel is collapsed. */
export const NONE_OPEN = -1;
