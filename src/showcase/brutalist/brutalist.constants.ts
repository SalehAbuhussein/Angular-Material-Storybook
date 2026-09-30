import type { Job } from './brutalist.types';

export const JOBS: Job[] = [
  { name: 'nightly-etl', owner: 'data', status: 'RUNNING', runtime: '04:12' },
  { name: 'invoice-sync', owner: 'billing', status: 'QUEUED', runtime: '00:00' },
  { name: 'image-resize', owner: 'media', status: 'FAILED', runtime: '00:47' },
  { name: 'search-index', owner: 'search', status: 'DONE', runtime: '11:08' },
  { name: 'churn-model', owner: 'ml', status: 'RUNNING', runtime: '22:31' },
];

export const JOB_COLUMNS = ['name', 'owner', 'status', 'runtime', 'act'];

/** How long the fake deploy keeps the progress bar up, in milliseconds. */
export const DEPLOY_MS = 1400;
