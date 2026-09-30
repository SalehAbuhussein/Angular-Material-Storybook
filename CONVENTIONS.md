# Authoring conventions for this docs Storybook

Stack: Angular 22.1.7, Angular Material 22.1.7 (Material 3), Storybook 10.6 with
`@storybook/angular-vite`, zoneless, standalone components, SCSS.

Read `src/showcase/button/button.stories.ts` and `src/showcase/button/button.mdx`
first. They are the reference. Match them exactly in shape and tone.

## File layout

One folder per component under `src/showcase/<kebab-name>/`:

```
src/showcase/select/select.stories.ts
src/showcase/select/select.mdx
```

Guide pages with no stories go in `src/docs/<nn>-<name>.mdx`.

## Story file rules

- Import from `@storybook/angular-vite`, never `@storybook/angular`.
- Use `moduleMetadata({ imports: [...] })` for the Material modules a story needs.
- `title` is `'<Chapter>/<Component>'`, e.g. `'Form Controls/Select'`. Chapter
  names are fixed: `Form Controls`, `Buttons and Indicators`, `Navigation`,
  `Layout`, `Popups and Modals`, `Data Table`, `CDK`, `Recipes`.
- First export is always `Playground`: one story with `argTypes` + `args` so the
  reader can poke at the main inputs from the controls panel.
- Then 3 to 6 focused stories, each showing exactly one idea, named in PascalCase.
- Prefer `render: (args) => ({ props: args, template: '...' })` with an inline
  template. Only declare a real component class when the example needs state,
  a service (dialog, snackbar), or a form.
- When you declare a component, make it `standalone` (the Angular 22 default —
  do not write `standalone: true`, it is implied) and register it via
  `moduleMetadata({ imports: [MyDemo] })`.
- **Never `export` a demo component class.** Storybook treats every export in a
  `.stories.ts` as a story and will try to call the class without `new`, which
  fails at render time. Declare it with a bare `class MyDemo {}`.
- Wrap multi-element demos in `<div class="docs-demo">` or
  `<div class="docs-demo docs-demo--row">`. Full-width demos get
  `<div class="docs-surface">`. These classes already exist in
  `.storybook/preview.scss`; do not invent new global classes.
- Set `parameters: { layout: 'fullscreen' }` on stories that need the whole
  canvas (sidenav, toolbar, table).
- Add a short JSDoc comment above every exported story. Storybook shows it as the
  story description.

## MDX rules

Every component folder has an `.mdx` with this skeleton:

```mdx
import { Meta, Canvas, Controls } from '@storybook/addon-docs/blocks';
import * as XStories from './x.stories';

<Meta of={XStories} />

# Component name

**Import:** `import { MatXModule } from '@angular/material/x';`

One or two sentences: what it is and when to reach for it.

## Try it
<Canvas of={XStories.Playground} />
<Controls of={XStories.Playground} />

## <Each concept, one heading>
Prose, then <Canvas of={XStories.Something} />, then a short copyable snippet.

## API you will actually use
A table of the 4 to 8 inputs/outputs that matter. Not the full API dump.

## Accessibility
What the component gives you and what you still have to supply.

## Common mistakes
A numbered list of 3 to 5 real mistakes with the fix.

## Related
Links to sibling docs pages.
```

Cross-links use Storybook doc paths:
`[Select](?path=/docs/form-controls-select--docs)` — the path is the kebab-cased
title with `/` replaced by `-`, plus `--docs`.

## Writing style

- Second person, present tense. Short sentences.
- Sentence case headings. No em dashes. No emoji. No "not just X but Y".
- Explain the *why* before the *how*. Assume the reader knows Angular basics but
  has never used Angular Material.
- Every code block must be copy-paste runnable in the reader's own app.
- No filler. No "in this section we will explore".

## Angular Material 22 API notes (get these right)

- Buttons are directives on native elements: `<button matButton>`,
  `matButton="filled|tonal|elevated|outlined"`, `<button matIconButton>`,
  `<button matFab>`, `<button matMiniFab>`, `<button matFab extended>`
  (`extended` is a separate boolean input, not a value of `matFab`).
  There is no `<mat-button>` element and no `mat-raised-button` in M3 style.
- `MatFormField` appearances are `fill` (default) and `outline`.
- Standalone imports: import the `Mat*Module` from `@angular/material/<name>`.
- Verify any selector or input you are unsure about by reading
  `node_modules/@angular/material/types/<name>.d.ts` before writing it (v22 has
  no per-component `index.d.ts`). Do not guess from memory of older versions.
- Use Material Symbols / Material Icons ligature names inside `<mat-icon>`
  (`add`, `delete`, `expand_more`). The font is already loaded.
- Theme colors come from CSS variables like `var(--mat-sys-primary)` and
  `var(--mat-sys-surface-container)`. Never hardcode hex colors in examples.

## Do not

- Do not edit `.storybook/*`, `src/styles.scss`, `angular.json`, or `package.json`.
- Do not install packages.
- Do not create files outside your assigned folders.
- Do not run `npm run build-storybook` (the orchestrator builds once at the end).
