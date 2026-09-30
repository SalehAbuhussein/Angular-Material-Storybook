import type { Message } from './list-detail.types';

/** Messages whose sender, subject or preview contain the query, ignoring case. */
export function filterMessages(messages: Message[], query: string): Message[] {
  const q = query.trim().toLowerCase();
  if (!q) return messages;
  return messages.filter((m) => `${m.from} ${m.subject} ${m.preview}`.toLowerCase().includes(q));
}

export const findMessage = (messages: Message[], id: number | null): Message | null =>
  messages.find((m) => m.id === id) ?? null;
