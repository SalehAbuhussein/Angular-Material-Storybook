import type { FlatNode } from './level-tree.types';

export const FLAT_NODES: FlatNode[] = [
  { id: 'src', name: 'src', level: 0, expandable: true },
  { id: 'src/app', name: 'app', level: 1, expandable: true },
  { id: 'src/app/app.ts', name: 'app.ts', level: 2, expandable: false },
  { id: 'src/app/app.html', name: 'app.html', level: 2, expandable: false },
  { id: 'src/main.ts', name: 'main.ts', level: 1, expandable: false },
  { id: 'docs', name: 'docs', level: 0, expandable: true },
  { id: 'docs/setup.md', name: 'setup.md', level: 1, expandable: false },
  { id: 'package.json', name: 'package.json', level: 0, expandable: false },
];
