import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/**
 * The three accents side by side, each with its job and a real element that
 * uses it. Primary and secondary share a hue; tertiary is a different one.
 */
@Component({
  selector: 'docs-accent-roles',
  imports: [MatButtonModule],
  templateUrl: './accent-roles.component.html',
  styleUrl: './accent-roles.component.scss',
})
export class AccentRolesDemo {}
