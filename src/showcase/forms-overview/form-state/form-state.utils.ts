import type { AbstractControl } from '@angular/forms';

import type { ControlState } from './form-state.types';

export const controlState = (control: AbstractControl): ControlState => ({
  valid: control.valid,
  touched: control.touched,
  dirty: control.dirty,
  showing: control.invalid && control.touched,
});
