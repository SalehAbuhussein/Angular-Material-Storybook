import { PAIR } from './utility-classes.constants';

/** Joins the picked classes, skipping every group left empty. */
export const classList = (classes: string[]): string => classes.filter(Boolean).join(' ');

export const markupSnippet = (classes: string, text: string): string =>
  `<div class="${classes}">\n  ${text}\n</div>`;

/** Every class in a group as a full class name, with '' first for "none". */
export const classOptions = (prefix: string, names: string[]): string[] => [
  '',
  ...names.map((name) => prefix + name),
];

const suffix = (cls: string, prefix: string): string => cls.replace(prefix, '');

/**
 * The text class the picked background wants, as a full class name, or null
 * when nothing is picked or the picked text class already matches.
 */
export const pairWarningFor = (bg: string, textColor: string): string | null => {
  const want = PAIR[suffix(bg, 'mat-bg-')];
  if (!want) return null;
  const wanted = `mat-text-${want}`;
  return wanted === textColor ? null : wanted;
};
