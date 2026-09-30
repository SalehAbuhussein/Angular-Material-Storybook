import type { Team } from './select-compare.types';

export const sameTeamId = (a: Team | null, b: Team | null): boolean => a?.id === b?.id;
