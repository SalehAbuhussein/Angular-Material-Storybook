export type LineKind = 'in' | 'out' | 'err' | 'ok';

export interface Line {
  kind: LineKind;
  text: string;
}

export type Phosphor = 'green' | 'amber' | 'ice';

export interface TelemetryRow {
  k: string;
  v: string;
}
