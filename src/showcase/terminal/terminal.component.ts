import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
  type ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BANNER, COMMANDS, JOB_MS } from './terminal.constants';
import type { Line, Phosphor } from './terminal.types';
import { leaderDots, suggestionsFor, telemetryRows } from './terminal.utils';

/**
 * A CRT terminal: phosphor green on near-black, scanlines, text glow, and a
 * blinking block cursor. The prompt is a mat-form-field with an autocomplete.
 */
@Component({
  selector: 'demo-terminal',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatTooltipModule,
    FormsModule,
  ],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class Terminal implements OnInit, OnDestroy {
  readonly height = input(620);
  readonly phosphor = input<Phosphor>('green');

  readonly tab = signal(0);
  readonly draft = signal('');
  readonly busy = signal(false);
  readonly scanlines = signal(true);
  readonly glow = signal(true);
  readonly verbose = signal(false);
  readonly lines = signal<Line[]>([]);

  readonly suggestions = computed(() => suggestionsFor(this.draft()));
  readonly telemetry = computed(() => telemetryRows(this.verbose()));
  readonly dots = leaderDots;

  readonly _screen = viewChild<ElementRef<HTMLElement>>('screen');
  readonly _injector = inject(Injector);
  _timers: ReturnType<typeof setTimeout>[] = [];

  ngOnInit(): void {
    this.initComponent();
  }

  ngOnDestroy(): void {
    this._timers.forEach(clearTimeout);
  }

  /** Prints the banner and starts following the newest line. */
  initComponent(): void {
    this._initLines();
    this._initAutoScroll();
  }

  /** Echoes the draft as input, then prints what that command answers. */
  run(): void {
    const raw = this.draft().trim();
    if (!raw) return;
    this._push({ kind: 'in', text: raw });
    this.draft.set('');

    const [cmd] = raw.split(/\s+/);
    switch (cmd) {
      case 'help':
        this._push({ kind: 'out', text: 'Commands: ' + COMMANDS.join(', ') });
        break;
      case 'status':
        this._push(
          { kind: 'ok', text: 'ORBIT STABLE. 4 SUBSYSTEMS ONLINE.' },
          { kind: 'out', text: 'Last handshake 41 seconds ago.' },
        );
        break;
      case 'whoami':
        this._push({ kind: 'out', text: 'operator (clearance 3)' });
        break;
      case 'clear':
        this.lines.set([]);
        return;
      case 'deploy':
      case 'scale':
        this.busy.set(true);
        this._push({ kind: 'out', text: `Running ${cmd}...` });
        this._timers.push(
          setTimeout(() => {
            this.busy.set(false);
            this._push({ kind: 'ok', text: `${cmd.toUpperCase()} COMPLETE.` });
          }, JOB_MS),
        );
        break;
      case 'logs':
        this._push(
          { kind: 'out', text: '[08:12] uplink established' },
          { kind: 'out', text: '[08:14] telemetry batch 4412 sent' },
          { kind: 'err', text: '[08:19] packet loss 2.1% on channel B' },
        );
        break;
      default:
        this._push({ kind: 'err', text: `command not found: ${cmd}` });
    }
  }

  /** Back to the banner with an empty prompt. */
  reset(): void {
    this.lines.set([...BANNER]);
    this.draft.set('');
    this.busy.set(false);
  }

  _initLines(): void {
    this.lines.set([...BANNER]);
  }

  /** Keeps the newest line in view as output arrives. */
  _initAutoScroll(): void {
    effect(
      () => {
        this.lines();
        const el = this._screen()?.nativeElement;
        if (el) queueMicrotask(() => (el.scrollTop = el.scrollHeight));
      },
      { injector: this._injector },
    );
  }

  _push(...lines: Line[]): void {
    this.lines.update((current) => [...current, ...lines]);
  }
}
