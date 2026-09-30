# Angular Material, documented gradually

A runnable documentation site for **Angular Material 22** (Material 3), built as a
Storybook. Every page pairs an explanation with a live, editable example, and
every example shows its real source files in tabs, the way material.angular.dev
does.

## Run it

```bash
npm install
npm run storybook
```

Storybook opens on http://localhost:6006.

## Read it in this order

1. **Start Here**: what Angular Material is, install and setup, how to read these docs
2. **Foundations**: theming, color and variables, utility classes, typography, density, dark mode, icons
3. **Form Controls**: form field, input, select, autocomplete, checkbox, radio, slider, datepicker, chips
4. **Buttons and Indicators**: button, FAB, badge, icon, progress, tooltip, ripple
5. **Navigation / Layout / Popups and Modals / Data Table / CDK**: in any order
6. **Full Layouts**: complete working screens that put the components together, including a Material 3 style product page
7. **Beyond Material**: five screens that look nothing like Material, built entirely from it
8. **M3 Components**: six Material 3 components Angular Material does not ship yet (button group, split button, FAB menu, carousel, loading indicator, floating toolbar)

Each component page has the same shape: a **Try it** playground with live controls,
one section per concept, the handful of API members you actually use, an
accessibility note, and the mistakes people make.

## Theme switches

The Storybook toolbar has two buttons that restyle every story at once:

- **Scheme** flips `color-scheme` between light and dark, which is how the Material 3 tokens are meant to be toggled in a real app. See **Foundations/Dark Mode**.
- **Palette** cycles the primary palette (azure, violet, rose, green, orange). It is the same as changing `primary:` in `src/styles.scss`.

## Stack

| Piece | Version |
| --- | --- |
| Angular | 22.1 (zoneless, standalone, signals) |
| Angular Material + CDK | 22.1 (Material 3) |
| Storybook | 10.6 (`@storybook/angular-vite`) |
| Node | 24 |

## Commands

| Command | What it does |
| --- | --- |
| `npm run storybook` | Dev server with hot reload on port 6006 |
| `npm run build-storybook` | Static site into `storybook-static/` |
| `npm start` | The plain Angular app (not the docs) |
| `npm test` | Vitest unit tests |
| `npm run verify` | Builds the app, then renders every story headlessly |

## Where things live

```
.storybook/                 Storybook config, providers, theme and palette switches
.storybook/code-tabs.ts     The <Example> block: an example plus its source files in tabs
src/docs/                   Narrative guide chapters (MDX)
src/showcase/<c>/           One folder per component or screen
  <c>.mdx                   The docs page
  <c>.stories.ts            Storybook meta and stories only
  <c>.component.ts/html/scss  The demo component
  <c>.types.ts / .constants.ts / .utils.ts   Only when the component needs them
  <child>/                  A nested component, same layout
src/styles.scss             The Material 3 theme, explained in Foundations/Theming
CONVENTIONS.md              House rules for adding a new component page
```

## Component code style

Demo components follow one structure so they read the same everywhere:

1. `ngOnInit` calls `initComponent()`, which calls small `_initX()` helpers. Only components with setup work have them.
2. Private members start with `_`. No `private` or `public` keywords.
3. Types, constants and one-line helpers live in `.types.ts`, `.constants.ts` and `.utils.ts` next to the component.
4. Templates and styles are separate `.html` and `.scss` files.
5. Comments explain methods and anything the code cannot say on its own.

## Adding a component page

1. Create `src/showcase/<your-component>/` with the files above. `src/showcase/product-page/` is a complete reference.
2. In the MDX page, use `<Example of={Stories.X} />` for each example. It shows the example and, in tabs, the story's markup plus every file of each component it renders.
3. Follow `CONVENTIONS.md`.
4. `npm run storybook` and the page appears in the sidebar.
