import type { ActivityEvent, Project } from './profile.types';

export const ACTIVITY: ActivityEvent[] = [
  { icon: 'commit', title: 'Pushed 4 commits to design-system', ago: '2 hours ago' },
  { icon: 'rate_review', title: 'Reviewed PR #218, approved', ago: '5 hours ago' },
  { icon: 'bug_report', title: 'Closed issue #91, focus trap on mobile', ago: 'Yesterday' },
  { icon: 'forum', title: 'Commented on RFC: token naming', ago: '2 days ago' },
  { icon: 'rocket_launch', title: 'Shipped v3.2.0 to production', ago: '4 days ago' },
];

export const PROJECTS: Project[] = [
  { name: 'Design system', role: 'Maintainer', items: 128 },
  { name: 'Checkout rewrite', role: 'Contributor', items: 42 },
  { name: 'Docs site', role: 'Owner', items: 17 },
];

export const BASE_FOLLOWERS = 1_284;
