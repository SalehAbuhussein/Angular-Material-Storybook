export interface User {
  id: number;
  name: string;
  email: string;
}

/** What the control holds: a picked `User`, the text being typed, or nothing. */
export type UserValue = User | string | null;
