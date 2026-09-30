import type { ProfileData } from '../dialog.types';

export const profileLabel = (profile: ProfileData): string => `${profile.name} / ${profile.email}`;
