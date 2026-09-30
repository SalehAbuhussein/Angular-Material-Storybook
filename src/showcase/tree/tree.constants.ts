import type { FileNode } from './tree.types';

export const FILES: FileNode[] = [
  {
    name: 'src',
    children: [
      {
        name: 'app',
        children: [{ name: 'app.ts' }, { name: 'app.html' }, { name: 'app.scss' }],
      },
      { name: 'main.ts' },
      { name: 'styles.scss' },
    ],
  },
  {
    name: 'docs',
    children: [{ name: 'setup.md' }, { name: 'theming.md' }],
  },
  { name: 'package.json' },
];
