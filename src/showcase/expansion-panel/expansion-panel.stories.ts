import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { ControlledAccordion } from './controlled-accordion/controlled-accordion.component';

/**
 * `MatExpansionPanel` is a header you click and a body that grows. An accordion
 * is a group of panels that coordinate: by default opening one closes the rest.
 */
const meta: Meta = {
  title: 'Layout/Expansion Panel',
  decorators: [
    moduleMetadata({
      imports: [MatExpansionModule, MatButtonModule, MatIconModule, ControlledAccordion],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** One panel on its own. `expanded` is two-way bindable through `expandedChange`. */
export const Playground: Story = {
  argTypes: {
    expanded: { control: 'boolean' },
    disabled: { control: 'boolean' },
    hideToggle: { control: 'boolean', description: 'Hides the chevron on the right.' },
    togglePosition: { control: 'inline-radio', options: ['before', 'after'] },
  },
  args: { expanded: false, disabled: false, hideToggle: false, togglePosition: 'after' },
  render: (args) => ({
    props: args,
    template: `
      <mat-expansion-panel
        style="width: 420px"
        [expanded]="expanded"
        [disabled]="disabled"
        [hideToggle]="hideToggle"
        [togglePosition]="togglePosition"
      >
        <mat-expansion-panel-header>
          <mat-panel-title>Shipping address</mat-panel-title>
          <mat-panel-description>Where the order goes</mat-panel-description>
        </mat-expansion-panel-header>
        <p>221B Baker Street, London NW1 6XE</p>
      </mat-expansion-panel>`,
  }),
};

/**
 * The header takes a title and an optional description. The description is the
 * summary people read while the panel is closed, so put the useful value there.
 */
export const Header: Story = {
  render: () => ({
    template: `
      <mat-expansion-panel style="width: 440px" expanded>
        <mat-expansion-panel-header>
          <mat-panel-title>
            <mat-icon style="margin-right: 8px">person</mat-icon> Personal details
          </mat-panel-title>
          <mat-panel-description>Dana Wu, dana&#64;example.com</mat-panel-description>
        </mat-expansion-panel-header>
        <p>Editing these details updates every project in the workspace.</p>
      </mat-expansion-panel>`,
  }),
};

/**
 * Inside `<mat-accordion>` only one panel stays open. Add `multi` to let several
 * open at once.
 */
export const AccordionMulti: Story = {
  render: () => ({
    template: `
      <div class="docs-demo" style="width: 440px">
        <mat-accordion multi>
          <mat-expansion-panel>
            <mat-expansion-panel-header><mat-panel-title>Filters</mat-panel-title></mat-expansion-panel-header>
            <p>Status, owner and date range.</p>
          </mat-expansion-panel>
          <mat-expansion-panel>
            <mat-expansion-panel-header><mat-panel-title>Columns</mat-panel-title></mat-expansion-panel-header>
            <p>Choose which columns the table shows.</p>
          </mat-expansion-panel>
          <mat-expansion-panel>
            <mat-expansion-panel-header><mat-panel-title>Export</mat-panel-title></mat-expansion-panel-header>
            <p>CSV or JSON, current filters applied.</p>
          </mat-expansion-panel>
        </mat-accordion>
      </div>`,
  }),
};

/** A FAQ: one question open at a time, which is the default accordion behaviour. */
export const FaqAccordion: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    props: {
      faq: [
        {
          q: 'How do I cancel my plan?',
          a: 'Open Billing, then Cancel plan. Access continues until the end of the period you already paid for.',
        },
        {
          q: 'Can I move a project to another workspace?',
          a: 'Yes. Project settings, Advanced, Move project. You need admin rights in both workspaces.',
        },
        {
          q: 'Where is my data stored?',
          a: 'In the region you chose when you created the workspace. It is not replicated outside that region.',
        },
      ],
    },
    template: `
      <div class="docs-surface" style="padding: 24px">
        <h2 style="margin: 0 0 16px; font: var(--mat-sys-headline-small)">Common questions</h2>
        <mat-accordion>
          @for (item of faq; track item.q) {
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>{{ item.q }}</mat-panel-title>
              </mat-expansion-panel-header>
              <ng-template matExpansionPanelContent>
                <p>{{ item.a }}</p>
              </ng-template>
            </mat-expansion-panel>
          }
        </mat-accordion>
      </div>`,
  }),
};

/**
 * `mat-action-row` pins buttons to the bottom of the panel body. Here the open
 * panel is bound to a signal, so code can drive the accordion too.
 */
export const ActionRowWizard: Story = {
  render: () => ({ template: `<docs-controlled-accordion />` }),
};
