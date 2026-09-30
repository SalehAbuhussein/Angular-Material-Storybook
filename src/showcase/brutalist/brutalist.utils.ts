import type { Job, JobCounts, JobStatus, Scope } from './brutalist.types';

export const withoutKilled = (jobs: Job[], killed: string[]): Job[] =>
  jobs.filter((j) => !killed.includes(j.name));

/** The jobs that match both the scope toggle and the filter text. */
export const filterJobs = (jobs: Job[], scope: Scope, query: string): Job[] => {
  const q = query.trim().toLowerCase();
  return jobs.filter((j) => {
    const scopeOk =
      scope === 'all' ||
      (scope === 'running' && j.status === 'RUNNING') ||
      (scope === 'failed' && j.status === 'FAILED');
    const textOk = !q || `${j.name} ${j.owner}`.toLowerCase().includes(q);
    return scopeOk && textOk;
  });
};

const countOf = (jobs: Job[], status: JobStatus): number =>
  jobs.filter((j) => j.status === status).length;

export const countJobs = (jobs: Job[]): JobCounts => ({
  running: countOf(jobs, 'RUNNING'),
  queued: countOf(jobs, 'QUEUED'),
  failed: countOf(jobs, 'FAILED'),
});
