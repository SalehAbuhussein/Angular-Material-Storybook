import type { AbstractControl, ValidationErrors } from '@angular/forms';

/** Cross-field validator: the two password controls have to agree. */
export function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return password && confirm && password !== confirm ? { passwordsMismatch: true } : null;
}

/** The submitted values as pretty JSON, with the password group masked. */
export const submittedJson = <T extends { passwords: unknown }>(value: T): string => {
  const { passwords, ...rest } = value;
  return JSON.stringify({ ...rest, password: '********' }, null, 2);
};
