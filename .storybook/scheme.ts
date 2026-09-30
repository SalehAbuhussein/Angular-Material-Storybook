/**
 * Shared by the manager (toolbar button) and the preview (the canvas).
 *
 * The light/dark switch deliberately does NOT use Storybook globals. A globals
 * change re-renders every story on a docs page, which destroys and rebuilds
 * each Angular app and throws away whatever state you had built up in it.
 * Instead the toolbar sends a channel event and the preview flips one CSS
 * property. Material's tokens are light-dark() values, so that is all it takes.
 */
export const SCHEME_EVENT = 'docs-scheme/set';
export const SCHEME_KEY = 'docs-scheme';

export type Scheme = 'light' | 'dark';

export function readScheme(): Scheme {
  try {
    return localStorage.getItem(SCHEME_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function writeScheme(scheme: Scheme): void {
  try {
    localStorage.setItem(SCHEME_KEY, scheme);
  } catch {
    // Private mode or blocked storage: the switch still works for this page.
  }
}

export function applyScheme(scheme: Scheme): void {
  document.body.style.colorScheme = scheme;
  document.body.dataset['scheme'] = scheme;
}

/**
 * The palette switch works the same way. preview.scss re-runs `mat.theme()` for
 * each name under `body[data-palette]`, so switching is one attribute change.
 * `azure` is the app's own palette from src/styles.scss, so it sets nothing.
 */
export const PALETTE_EVENT = 'docs-palette/set';
export const PALETTE_KEY = 'docs-palette';
export const PALETTES = ['azure', 'violet', 'rose', 'green', 'orange'] as const;

export type Palette = (typeof PALETTES)[number];

export function readPalette(): Palette {
  try {
    const saved = localStorage.getItem(PALETTE_KEY) as Palette;
    return PALETTES.includes(saved) ? saved : 'azure';
  } catch {
    return 'azure';
  }
}

export function writePalette(palette: Palette): void {
  try {
    localStorage.setItem(PALETTE_KEY, palette);
  } catch {
    // Same as writeScheme: the switch still works for this page.
  }
}

export function applyPalette(palette: Palette): void {
  if (palette === 'azure') {
    delete document.body.dataset['palette'];
  } else {
    document.body.dataset['palette'] = palette;
  }
}
