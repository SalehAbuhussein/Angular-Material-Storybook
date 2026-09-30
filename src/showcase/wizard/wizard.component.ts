import { Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';

import { ACCOUNT_DEFAULTS, PLAN_DEFAULTS, PLANS, REGIONS, TEAM_DEFAULTS } from './wizard.constants';
import type { Orientation } from './wizard.types';
import { countInvites, planNameOf, regionNameOf } from './wizard.utils';

/**
 * A three step signup with a review step. Each step owns its own FormGroup, so
 * a linear stepper can block progress until that step is valid.
 */
@Component({
  selector: 'demo-wizard',
  imports: [
    MatStepperModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
})
export class Wizard {
  _fb = inject(FormBuilder);

  readonly height = input(720);
  readonly linear = input(true);
  readonly orientation = input<Orientation>('horizontal');

  readonly plans = PLANS;
  readonly done = signal(false);

  _stepper = viewChild(MatStepper);

  readonly account = this._fb.nonNullable.group({
    workspace: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    region: ['eu', [Validators.required]],
  });

  readonly plan = this._fb.nonNullable.group({
    planId: ['team', [Validators.required]],
    annual: [false],
  });

  readonly team = this._fb.nonNullable.group({
    invites: [''],
  });

  _planEvents = toSignal(this.plan.events, { initialValue: null });
  _accountEvents = toSignal(this.account.events, { initialValue: null });
  _teamEvents = toSignal(this.team.events, { initialValue: null });

  readonly planName = computed(() => {
    this._planEvents();
    return planNameOf(PLANS, this.plan.value.planId);
  });

  readonly regionName = computed(() => {
    this._accountEvents();
    // `form.value` is a Partial, because disabled controls drop out of it.
    // `getRawValue()` keeps the full, non-optional type.
    return regionNameOf(REGIONS, this.account.getRawValue().region);
  });

  readonly inviteCount = computed(() => {
    this._teamEvents();
    return countInvites(this.team.value.invites ?? '');
  });

  /** Jumps the stepper to a step, used by the "Change" links on the review step. */
  goTo(index: number): void {
    const s = this._stepper();
    if (s) s.selectedIndex = index;
  }

  finish(): void {
    this.done.set(true);
  }

  /** Clears every step's form and rewinds the stepper to the first step. */
  startOver(): void {
    this.done.set(false);
    this.account.reset({ ...ACCOUNT_DEFAULTS });
    this.plan.reset({ ...PLAN_DEFAULTS });
    this.team.reset({ ...TEAM_DEFAULTS });
    queueMicrotask(() => this._stepper()?.reset());
  }
}
