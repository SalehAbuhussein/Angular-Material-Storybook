import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/** The directive on its own: one attribute, no TypeScript. */
@Component({
  selector: 'demo-copy-directive',
  imports: [ClipboardModule, MatButtonModule, MatIconModule],
  templateUrl: './copy-directive.component.html',
  styleUrl: './copy-directive.component.scss',
})
export class CopyDirective {
  readonly command = 'ng add @angular/material';
}
