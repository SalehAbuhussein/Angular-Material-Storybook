import type { StorybookConfig } from '@storybook/angular-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        // MDX 3 drops GitHub-flavoured markdown by default, which turns every
        // table in these docs into one run-on paragraph. remark-gfm brings back
        // tables, strikethrough and autolinks.
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/angular-vite',

  viteFinal: async (config) => {
    // Angular Material's M3 theme emits `light-dark(<light>, <dark>)` for every
    // --mat-sys-* token. Lightning CSS downlevels that into a var() pair whose
    // helper variables it attaches to whichever selector declares
    // `color-scheme` (our `body`), while the tokens themselves live on `html`.
    // The helpers are then out of scope, every token substitutes to two
    // concatenated colors, and nothing paints. Its polyfill also switches on
    // `prefers-color-scheme` rather than the `color-scheme` property, which
    // would break the light/dark toolbar. Keep native light-dark() instead.
    config.build = {
      ...config.build,
      cssMinify: 'esbuild',
      cssTarget: ['chrome123', 'firefox123', 'safari17'],
    };
    config.css = { ...config.css, transformer: 'postcss' };
    return config;
  },
};

export default config;
