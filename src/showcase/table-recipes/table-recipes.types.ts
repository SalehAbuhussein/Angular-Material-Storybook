export interface Member {
  id: number;
  name: string;
  email: string;
  team: string;
  role: 'owner' | 'editor' | 'viewer';
}
