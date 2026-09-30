import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/** The directive with every input wired to the controls panel. */
@Component({
  selector: 'demo-clipboard-playground',
  imports: [ClipboardModule, MatButtonModule],
  templateUrl: './clipboard-playground.component.html',
  styleUrl: './clipboard-playground.component.scss',
})
export class ClipboardPlayground {
  readonly text = input('npm i @angular/cdk');
  readonly attempts = input(1);

  readonly copied = signal<boolean | null>(null);
}
