/**
 * One row in a swatch grid. `token` and `on` are the bare system token names,
 * without the `--mat-sys-` prefix, so the template can build the variable
 * reference itself.
 */
export interface Swatch {
  token: string;
  on?: string;
  note: string;
}
