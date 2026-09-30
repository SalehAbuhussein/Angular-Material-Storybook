import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { ClipboardPlayground } from './clipboard-playground/clipboard-playground.component';
import { ClipboardService } from './clipboard-service/clipboard-service.component';
import { CopyDirective } from './copy-directive/copy-directive.component';
import { CopyFeedback as CopyFeedbackComponent } from './copy-feedback/copy-feedback.component';
import { PendingCopy } from './pending-copy/pending-copy.component';

/**
 * `@angular/cdk/clipboard` is a directive and a service over
 * `document.execCommand('copy')`. It works without permissions prompts and
 * without the async Clipboard API, as long as the copy happens in a user
 * gesture.
 */
const meta: Meta = {
  title: 'CDK/Clipboard',
  decorators: [
    moduleMetadata({
      imports: [
        ClipboardPlayground,
        CopyDirective,
        CopyFeedbackComponent,
        ClipboardService,
        PendingCopy,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** `cdkCopyToClipboard` takes the text, and `cdkCopyToClipboardCopied` reports the result. */
export const Playground: Story = {
  argTypes: {
    text: { control: 'text', description: 'Value of `cdkCopyToClipboard`.' },
    attempts: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Retries for long text (`cdkCopyToClipboardAttempts`).',
    },
  },
  args: { text: 'npm i @angular/cdk', attempts: 1 },
  render: (args) => ({
    props: args,
    template: `<demo-clipboard-playground [text]="text" [attempts]="attempts" />`,
  }),
};

/** The whole feature in one attribute. */
export const CopyWithTheDirective: Story = {
  render: () => ({ template: `<demo-copy-directive />` }),
};

/** A copy with no feedback looks like a broken button. Say something. */
export const CopyFeedback: Story = {
  render: () => ({ template: `<demo-copy-feedback />` }),
};

/** Inject `Clipboard` when the text is built in code rather than bound in a template. */
export const TheClipboardService: Story = {
  render: () => ({ template: `<demo-clipboard-service />` }),
};

/** `beginCopy` splits the expensive DOM work from the copy itself. */
export const LargeTextWithPendingCopy: Story = {
  render: () => ({ template: `<demo-pending-copy />` }),
};
