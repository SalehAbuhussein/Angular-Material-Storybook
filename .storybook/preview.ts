import { applicationConfig, type Preview } from '@storybook/angular-vite';
import { SyntaxHighlighter } from 'storybook/internal/components';
import scss from 'refractor/scss';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { addons } from 'storybook/preview-api';

import '../src/styles.scss';
import './preview.scss';
import {
  PALETTE_EVENT,
  SCHEME_EVENT,
  applyPalette,
  applyScheme,
  readPalette,
  readScheme,
  type Palette,
  type Scheme,
} from './scheme';

// Light/dark and the palette are CSS switches, not Storybook globals, so
// flipping them never re-renders a story. See scheme.ts for why.
applyScheme(readScheme());
applyPalette(readPalette());
addons.getChannel().on(SCHEME_EVENT, (scheme: Scheme) => applyScheme(scheme));
addons.getChannel().on(PALETTE_EVENT, (palette: Palette) => applyPalette(palette));

// Storybook ships a short list of Prism grammars and SCSS is not one of them, so
// every scss code block in these docs rendered as flat grey text. The Sass
// examples are most of the Theming and Color pages, so register the grammar.
SyntaxHighlighter.registerLanguage('scss', scss);

/**
 * Global Storybook setup.
 *
 * `applicationConfig` injects providers into the standalone Angular application
 * that Storybook bootstraps for every story — the same providers you would pass
 * to `bootstrapApplication()` in `main.ts`.
 */
const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        // Angular Material components animate; without this they render but do not move.
        provideAnimationsAsync(),
        // Some examples (autocomplete, table) load data over HTTP.
        provideHttpClient(),
        // Components with routerLink (toolbar, list, tabs) need a router.
        // The catch-all route matters: Storybook serves stories from
        // `iframe.html`, and an empty route array makes the first navigation
        // throw NG04002, which kills change detection for every story on the
        // page after the first one.
        provideRouter([{ path: '**', children: [] }]),
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Start Here',
          ['Welcome', 'Install and Setup', 'How to Read These Docs'],
          'Foundations',
          ['Theming', 'Color and Variables', 'Utility Classes', 'Typography', 'Density', 'Dark Mode', 'Icons'],
          'Form Controls',
          'Buttons and Indicators',
          'Navigation',
          'Layout',
          'Popups and Modals',
          'Data Table',
          'CDK',
          'Full Layouts',
          [
            'App Shell',
            'Dashboard',
            'Data Table Page',
            'Settings Page',
            'Sign In',
            'Detail Page',
            'Product Page',
            'Multi Step Form',
            'List and Detail',
            'Profile Page',
            'Empty, Loading and Error',
          ],
          'Beyond Material',
          [
            'Overview',
            'Neo Brutalist Console',
            'Glass Dashboard',
            'Neon Terminal',
            'Editorial Reader',
            'Soft Player',
          ],
          'M3 Components',
          [
            'Overview',
            'Button Group',
            'Split Button',
            'FAB Menu',
            'Carousel',
            'Loading Indicator',
            'Floating Toolbar',
          ],
          'Recipes',
          '*',
        ],
      },
    },
  },
};

export default preview;
