export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

export type DrawerMode = 'side' | 'over';

/** `auto` lets `BreakpointObserver` pick the drawer mode. */
export type ForceMode = 'auto' | DrawerMode;
