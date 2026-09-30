import type { GroupItem } from './m3-button-group.types';

export const VIEWS: GroupItem[] = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

export const FORMAT: GroupItem[] = [
  { id: 'bold', label: 'Bold', icon: 'format_bold' },
  { id: 'italic', label: 'Italic', icon: 'format_italic' },
  { id: 'underline', label: 'Underline', icon: 'format_underlined' },
  { id: 'strike', label: 'Strikethrough', icon: 'format_strikethrough' },
];
