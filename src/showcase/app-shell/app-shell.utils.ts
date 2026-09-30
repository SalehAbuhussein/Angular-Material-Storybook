import type { DrawerMode, ForceMode, NavItem } from './app-shell.types';

export const drawerMode = (forced: ForceMode, isHandset: boolean): DrawerMode =>
  forced !== 'auto' ? forced : isHandset ? 'over' : 'side';

export const navLabel = (nav: NavItem[], id: string): string =>
  nav.find((n) => n.id === id)?.label ?? '';
