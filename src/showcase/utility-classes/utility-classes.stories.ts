import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { ClassExamples } from './class-examples/class-examples.component';
import { UtilityClasses } from './utility-classes.component';
import { BG, BORDER, CORNER, FONT, SAMPLE_TEXT, SHADOW, TEXT } from './utility-classes.constants';
import type { Group } from './utility-classes.types';
import { classList, classOptions, markupSnippet } from './utility-classes.utils';

/** A dropdown of every class in one group, with "(none)" first. */
const dropdown = (prefix: string, names: string[], description: string) => ({
  control: { type: 'select' as const, labels: { '': '(none)' } },
  options: classOptions(prefix, names),
  description,
});

/**
 * `mat.system-classes()` turns the most used `--mat-sys-*` tokens into
 * one-line CSS classes. Add them in a template instead of writing a rule.
 */
const meta: Meta<UtilityClasses> = {
  title: 'Foundations/Utility Classes',
  component: UtilityClasses,
  decorators: [moduleMetadata({ imports: [UtilityClasses, ClassExamples] })],
  argTypes: {
    bg: dropdown('mat-bg-', BG, 'Background color'),
    textColor: dropdown('mat-text-', TEXT, 'Text color'),
    font: dropdown('mat-font-', FONT, 'Typography'),
    corner: dropdown('mat-corner-', CORNER, 'Corner radius'),
    border: dropdown('mat-', BORDER, 'Border'),
    shadow: dropdown('mat-shadow-', SHADOW, 'Shadow'),
    text: { table: { disable: true } },
  },
  parameters: {
    // Only the six class dropdowns. Without this Storybook also lists the
    // component's computed values (classes, html, pairWarning) as free inputs.
    controls: { include: ['bg', 'textColor', 'font', 'corner', 'border', 'shadow'] },
    docs: {
      source: {
        // "Show code" prints the markup you would write, not the demo component.
        transform: (code: string, ctx: { args: Record<string, string> }) => {
          const a = ctx.args;
          // The example galleries have no class args; keep their own markup.
          if (!('bg' in a)) return code;
          return markupSnippet(
            classList([a['bg'], a['textColor'], a['font'], a['corner'], a['border'], a['shadow']]),
            SAMPLE_TEXT,
          );
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<UtilityClasses>;

/**
 * Pick one class per group from the dropdowns. "(none)" leaves that group
 * out. Flip the toolbar scheme and palette buttons too: the classes only read
 * tokens, so they follow both.
 */
export const BuildYourOwn: Story = {
  args: {
    bg: 'mat-bg-primary-container',
    textColor: 'mat-text-on-primary-container',
    font: 'mat-font-body-lg',
    corner: 'mat-corner-lg',
    border: '',
    shadow: 'mat-shadow-1',
  },
};

/** A filled card: the same look `mat-card appearance="filled"` uses. */
export const FilledCard: Story = {
  args: {
    bg: 'mat-bg-surface-container-highest',
    textColor: 'mat-text-on-surface',
    font: 'mat-font-body-md',
    corner: 'mat-corner-md',
    border: '',
    shadow: '',
  },
};

/** A soft error box for a message above a form. */
export const ErrorBox: Story = {
  args: {
    bg: 'mat-bg-error-container',
    textColor: 'mat-text-on-error-container',
    font: 'mat-font-body-md',
    corner: 'mat-corner-sm',
    border: '',
    shadow: '',
  },
};

/** A pill label, the shape and colors of a tonal chip. */
export const PillLabel: Story = {
  args: {
    bg: 'mat-bg-secondary-container',
    textColor: 'mat-text-on-secondary-container',
    font: 'mat-font-label-lg',
    corner: 'mat-corner-full',
    border: '',
    shadow: '',
  },
};

// Each example card prints its own markup, so the canvas "Show code" is hidden.
const examples = (group: Group): Story => ({
  render: () => ({ template: `<docs-class-examples group="${group}" />` }),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
});

/** All 15 background classes, each in a real piece of UI, with its markup. */
export const BackgroundExamples: Story = examples('bg');

/** All 13 text color classes, each in context. */
export const TextColorExamples: Story = examples('text');

/** All 15 type classes, each on the kind of text it is made for. */
export const TypographyExamples: Story = examples('font');

/** The 6 corner classes, smallest to fully round. */
export const CornerExamples: Story = examples('corner');

/** The 2 borders and 5 shadow levels. */
export const BorderAndShadowExamples: Story = examples('border-shadow');
