export type JobStatus = 'RUNNING' | 'QUEUED' | 'FAILED' | 'DONE';

export interface Job {
  name: string;
  owner: string;
  status: JobStatus;
  runtime: string;
}

export type Accent = 'acid' | 'hot' | 'sky';

export type Scope = 'all' | 'running' | 'failed';

export interface JobCounts {
  running: number;
  queued: number;
  failed: number;
}
