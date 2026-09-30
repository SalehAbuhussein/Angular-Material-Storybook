import { COMMANDS } from './terminal.constants';
import type { TelemetryRow } from './terminal.types';

export const suggestionsFor = (draft: string): string[] => {
  const q = draft.trim().toLowerCase();
  return COMMANDS.filter((c) => c.startsWith(q));
};

export const telemetryRows = (verbose: boolean): TelemetryRow[] => [
  { k: 'ALTITUDE', v: '412.6 KM' },
  { k: 'VELOCITY', v: '7.66 KM/S' },
  { k: 'POWER', v: verbose ? '94.2% (4 ARRAYS NOMINAL)' : '94.2%' },
  { k: 'SIGNAL', v: '-71 DBM' },
  { k: 'UPTIME', v: '182D 04:11' },
];

/** The dot leader between a telemetry key and its value, padded to line up. */
export const leaderDots = (key: string): string => ' ' + '.'.repeat(Math.max(2, 22 - key.length)) + ' ';
