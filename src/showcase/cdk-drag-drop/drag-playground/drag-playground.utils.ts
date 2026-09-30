import type { LockAxisOption } from './drag-playground.types';

/** `cdkDragLockAxis` takes 'x' | 'y' | null, so the 'none' option maps to null. */
export const toLockAxis = (value: LockAxisOption): 'x' | 'y' | null => (value === 'none' ? null : value);
