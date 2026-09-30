import type { NavItem } from './app-shell.types';

export const NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'orders', label: 'Orders', icon: 'receipt_long', badge: 12 },
  { id: 'customers', label: 'Customers', icon: 'group' },
  { id: 'inventory', label: 'Inventory', icon: 'inventory_2' },
  { id: 'reports', label: 'Reports', icon: 'insights' },
];
