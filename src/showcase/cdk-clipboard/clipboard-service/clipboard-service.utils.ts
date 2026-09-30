import type { TeamMember } from './clipboard-service.types';

export const toJson = (rows: TeamMember[]): string => JSON.stringify(rows, null, 2);

export const toCsv = (rows: TeamMember[]): string =>
  ['name,team', ...rows.map((row) => `${row.name},${row.team}`)].join('\n');
