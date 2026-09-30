import type { Member } from '../table-recipes.types';

/** `role:<name>` matches the role exactly; anything else searches the name. */
export const nameOrRoleMatches = (row: Member, filter: string): boolean => {
  if (filter.startsWith('role:')) {
    return row.role === filter.slice('role:'.length);
  }
  return row.name.toLowerCase().includes(filter);
};
