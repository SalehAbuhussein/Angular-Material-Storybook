import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

/**
 * `<mat-form-field>` is the chrome around a control: the floating label, the
 * underline or outline, the hint line, and the error line. It does not accept
 * every input. The control inside must implement `MatFormFieldControl`, which
 * means `matInput`, `mat-select`, `mat-chip-grid`, or `mat-date-range-input`.
 */
const meta: Meta = {
  title: 'Form Controls/Form Field',
  decorators: [
    moduleMetadata({
      imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Every input on the wrapper itself, with one plain `matInput` inside. */
export const Playground: Story = {
  argTypes: {
    appearance: {
      control: 'inline-radio',
      options: ['fill', 'outline'],
      description: 'The only two appearances in Material 3.',
    },
    floatLabel: {
      control: 'inline-radio',
      options: ['auto', 'always'],
      description: '`auto` floats the label on focus or value, `always` keeps it floated.',
    },
    subscriptSizing: {
      control: 'inline-radio',
      options: ['fixed', 'dynamic'],
      description: '`fixed` always reserves the hint/error line. `dynamic` collapses it.',
    },
    hideRequiredMarker: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
  },
  args: {
    appearance: 'fill',
    floatLabel: 'auto',
    subscriptSizing: 'fixed',
    hideRequiredMarker: false,
    label: 'Project name',
    hint: 'Shown to everyone on the team',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo">
        <mat-form-field
          [appearance]="appearance"
          [floatLabel]="floatLabel"
          [subscriptSizing]="subscriptSizing"
          [hideRequiredMarker]="hideRequiredMarker">
          <mat-label>{{ label }}</mat-label>
          <input matInput required placeholder="Apollo" />
          <mat-hint>{{ hint }}</mat-hint>
        </mat-form-field>
      </div>`,
  }),
};

/**
 * `fill` is the default and reads as a solid block. `outline` draws a border and
 * works better on a coloured or busy surface. Pick one and use it everywhere.
 */
export const Appearances: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <mat-form-field appearance="fill">
          <mat-label>Fill</mat-label>
          <input matInput />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Outline</mat-label>
          <input matInput />
        </mat-form-field>
      </div>`,
  }),
};

/**
 * `matPrefix` and `matSuffix` sit inside the field. Use `matIconPrefix` for an
 * icon and `matTextPrefix` for text so the spacing is right for each.
 */
export const PrefixAndSuffix: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Search</mat-label>
          <mat-icon matIconPrefix>search</mat-icon>
          <input matInput />
          <button matIconSuffix type="button" aria-label="Clear search">
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Price</mat-label>
          <span matTextPrefix>$&nbsp;</span>
          <input matInput type="number" value="120" />
          <span matTextSuffix>.00</span>
        </mat-form-field>
      </div>`,
  }),
};

/**
 * Two hints can share the line: the default one sits left, `align="end"` sits
 * right. `hintLabel` on the field is shorthand for a single left hint.
 */
export const Hints: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Bio</mat-label>
          <input matInput maxlength="60" #bio value="Angular developer" />
          <mat-hint>A sentence about you</mat-hint>
          <mat-hint align="end">{{ bio.value.length }} / 60</mat-hint>
        </mat-form-field>

        <mat-form-field appearance="outline" hintLabel="Shorthand for one hint">
          <mat-label>Nickname</mat-label>
          <input matInput />
        </mat-form-field>
      </div>`,
  }),
};

/**
 * `fixed` sizing always reserves a line for hints and errors, so the layout
 * never jumps. `dynamic` reclaims the space when there is nothing to show.
 */
export const SubscriptSizing: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <mat-form-field appearance="outline" subscriptSizing="fixed">
          <mat-label>Fixed</mat-label>
          <input matInput />
        </mat-form-field>
        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Dynamic</mat-label>
          <input matInput />
        </mat-form-field>
      </div>`,
  }),
};

/**
 * The field swaps hints for errors as soon as the control is invalid and has
 * been touched. Blur the field without typing to see it happen.
 */
export const ErrorState: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" required />
          <mat-hint>We never share it</mat-hint>
          <mat-error>An email address is required</mat-error>
        </mat-form-field>
      </div>`,
  }),
};
