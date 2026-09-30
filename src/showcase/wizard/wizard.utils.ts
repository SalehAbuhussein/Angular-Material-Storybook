import type { Plan } from './wizard.types';

export const planNameOf = (plans: Plan[], id: string | undefined): string =>
  plans.find((p) => p.id === id)?.name ?? '';

export const regionNameOf = (regions: Record<string, string>, id: string): string => regions[id] ?? '';

/** Counts the non-empty entries in a comma separated list of emails. */
export const countInvites = (invites: string): number =>
  invites
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean).length;
