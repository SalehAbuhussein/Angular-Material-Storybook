import { Component, OnDestroy, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';

import { DEPLOY_MS, JOBS, JOB_COLUMNS } from './brutalist.constants';
import type { Accent, Job, Scope } from './brutalist.types';
import { countJobs, filterJobs, withoutKilled } from './brutalist.utils';

/**
 * Neo brutalism: flat fills, 3px black borders, hard offset shadows, no radius
 * anywhere, and a display face doing the shouting. Every control below is a
 * stock Angular Material component.
 */
@Component({
  selector: 'demo-brutalist',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    FormsModule,
  ],
  templateUrl: './brutalist.component.html',
  styleUrl: './brutalist.component.scss',
})
export class Brutalist implements OnDestroy {
  readonly height = input(760);
  readonly accent = input<Accent>('acid');

  readonly scope = signal<Scope>('all');
  readonly query = signal('');
  readonly autoRetry = signal(true);
  readonly verbose = signal(false);
  readonly deploying = signal(false);
  readonly killed = signal<string[]>([]);

  readonly cols = JOB_COLUMNS;

  readonly live = computed(() => withoutKilled(JOBS, this.killed()));
  readonly rows = computed(() => filterJobs(this.live(), this.scope(), this.query()));
  readonly counts = computed(() => countJobs(this.live()));

  _deployTimer?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    clearTimeout(this._deployTimer);
  }

  /** Shows the progress bar for a moment, standing in for a real deploy. */
  deploy(): void {
    this.deploying.set(true);
    this._deployTimer = setTimeout(() => this.deploying.set(false), DEPLOY_MS);
  }

  /** Removes the job from every view of the queue. */
  kill(job: Job): void {
    this.killed.update((list) => [...list, job.name]);
  }
}
