import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { AccentRolesDemo } from './accent-roles/accent-roles.component';
import { OUTLINE_FIXED } from './color-tokens.constants';
import { CornerScale } from './corner-scale/corner-scale.component';
import { ElevationScale } from './elevation-scale/elevation-scale.component';
import { RolePairsDemo } from './role-pairs/role-pairs.component';
import { SurfaceLevelsDemo } from './surface-levels/surface-levels.component';
import { SwatchGrid } from './swatch-grid/swatch-grid.component';
import { TertiaryInUseDemo } from './tertiary-in-use/tertiary-in-use.component';
import { TokenCard } from './token-card/token-card.component';
import { TokenGroups } from './token-groups/token-groups.component';

/**
 * `mat.theme()` emits every design value as a CSS custom property prefixed
 * `--mat-sys-`. Read them from your own CSS and your components follow the
 * theme, the palette and the dark mode switch with no extra code.
 */
const meta: Meta = {
  title: 'Foundations/Color and Variables',
  decorators: [
    moduleMetadata({
      imports: [
        SwatchGrid,
        TokenGroups,
        RolePairsDemo,
        SurfaceLevelsDemo,
        TokenCard,
        ElevationScale,
        CornerScale,
        AccentRolesDemo,
        TertiaryInUseDemo,
      ],
    }),
  ],
  // The stories render demo components; the page prints the real CSS next to
  // each one, so the canvas "Show code" would only show demo tags.
  parameters: { docs: { canvas: { sourceState: 'none' } } },
};

export default meta;
type Story = StoryObj;

/**
 * Pick a token group and read the exact variable name off each tile. Flip the
 * toolbar between light and dark: nothing here is hardcoded, so every tile
 * repaints itself.
 */
export const Playground: Story = {
  argTypes: {
    group: {
      control: 'select',
      options: ['primary', 'surface', 'secondary and tertiary', 'error', 'outline and fixed'],
      description: 'Which group of system colour tokens to show.',
    },
  },
  args: { group: 'primary' },
  render: (args) => ({
    props: args,
    template: `<div class="docs-demo"><docs-token-groups [group]="group" /></div>`,
  }),
};

/**
 * Every colour role next to its `on-*` partner, with real text on both. The
 * rule is mechanical: text on `X` uses `on-X`.
 */
export const RolePairs: Story = {
  render: () => ({
    template: `<div class="docs-demo"><docs-role-pairs /></div>`,
  }),
};

/**
 * The neutral ladder. Pick a step by how raised the element should feel, not by
 * how light the colour looks, because the order inverts in dark mode.
 */
export const SurfaceLevels: Story = {
  render: () => ({
    template: `<div class="docs-demo"><docs-surface-levels /></div>`,
  }),
};

/**
 * Outline, shadow, scrim, the inverse pair and the fixed tokens. `shadow` and
 * `scrim` are near black in both themes, so they carry no `on-*` partner.
 */
export const StateAndOutline: Story = {
  render: () => ({
    props: {
      swatches: OUTLINE_FIXED,
    },
    template: `<div class="docs-demo"><docs-swatch-grid [swatches]="swatches" /></div>`,
  }),
};

/**
 * Primary, secondary and tertiary next to each other, each with its job and
 * a real element that uses it. Cycle the toolbar palette: primary and
 * secondary change together, tertiary stays blue.
 */
export const AccentRoles: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-accent-roles /></div>` }),
};

/**
 * Tertiary in three real jobs: a recommended plan, a "New" marker on a list,
 * and the one bar in a chart that matters.
 */
export const TertiaryInUse: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-tertiary-in-use /></div>` }),
};

/**
 * A card with no Material component and no hex value in it. Colour, type,
 * radius and elevation all come from `--mat-sys-*`, so it themes itself.
 */
export const UsingTokensInYourOwnComponent: Story = {
  render: () => ({
    template: `<div class="docs-demo"><docs-token-card /></div>`,
  }),
};

/**
 * `--mat-sys-level0` through `level5` are complete `box-shadow` values, not
 * numbers. Assign them directly to `box-shadow`.
 */
export const Elevation: Story = {
  render: () => ({
    template: `<div class="docs-demo"><docs-elevation-scale /></div>`,
  }),
};

/**
 * The shape scale. The directional tokens expand to a four-value radius, which
 * is what bottom sheets and side panels need.
 */
export const CornerRadius: Story = {
  render: () => ({
    template: `<div class="docs-demo"><docs-corner-scale /></div>`,
  }),
};
