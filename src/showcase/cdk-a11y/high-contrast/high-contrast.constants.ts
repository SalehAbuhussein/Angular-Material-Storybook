import { HighContrastMode } from '@angular/cdk/a11y';

export const HIGH_CONTRAST_LABELS: Record<HighContrastMode, string> = {
  [HighContrastMode.NONE]: 'none',
  [HighContrastMode.BLACK_ON_WHITE]: 'black on white',
  [HighContrastMode.WHITE_ON_BLACK]: 'white on black',
};
