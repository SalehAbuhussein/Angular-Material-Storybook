export const withoutItem = <T>(items: T[], item: T): T[] => items.filter((i) => i !== item);

export const withAdded = <T>(items: T[], item: T): T[] => [...items, item];

export const renamed = <T>(items: T[], from: T, to: T): T[] =>
  items.map((i) => (i === from ? to : i));
