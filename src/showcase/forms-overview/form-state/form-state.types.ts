export interface ControlState {
  valid: boolean;
  touched: boolean;
  dirty: boolean;
  /** Whether `mat-error` is on screen: invalid and touched. */
  showing: boolean;
}
