import type { Plan } from './wizard.types';

export const PLANS: Plan[] = [
  { id: 'starter', name: 'Starter', price: 0, blurb: 'One project, community support' },
  { id: 'team', name: 'Team', price: 24, blurb: 'Ten projects, priority support' },
  { id: 'scale', name: 'Scale', price: 96, blurb: 'Unlimited projects, SSO, SLA' },
];

export const REGIONS: Record<string, string> = {
  eu: 'Europe',
  us: 'United States',
  me: 'Middle East',
};

/** The values each step's form goes back to on "Start over". */
export const ACCOUNT_DEFAULTS = { workspace: '', email: '', region: 'eu' };
export const PLAN_DEFAULTS = { planId: 'team', annual: false };
export const TEAM_DEFAULTS = { invites: '' };
