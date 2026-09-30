export const initialsOf = (name: string): string =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('');

export const followerCount = (base: number, following: boolean): number =>
  base + (following ? 1 : 0);
