import type { User, UserValue } from './autocomplete-objects.types';

export const userText = (user: UserValue): string =>
  typeof user === 'string' ? user : (user?.name ?? '');

/** Only typed text filters; once a `User` is picked every option shows again. */
export const usersMatching = (users: User[], value: UserValue): User[] => {
  const q = typeof value === 'string' ? value.toLowerCase() : '';
  return users.filter((user) => user.name.toLowerCase().includes(q));
};
