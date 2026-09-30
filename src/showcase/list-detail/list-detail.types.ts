export type MessageLabel = 'Support' | 'Billing' | 'Sales';

export interface Message {
  id: number;
  from: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  unread: boolean;
  label: MessageLabel;
}
