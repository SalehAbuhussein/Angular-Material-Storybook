import type { FlatNode } from './level-tree.types';

export const levelOf = (node: FlatNode): number => node.level;

/** Drops every node whose ancestor is collapsed. */
export const visibleRows = (nodes: FlatNode[], open: Set<string>): FlatNode[] => {
  const rows: FlatNode[] = [];
  let hiddenAbove = Infinity;
  for (const node of nodes) {
    if (node.level > hiddenAbove) continue;
    hiddenAbove = Infinity;
    rows.push(node);
    if (node.expandable && !open.has(node.id)) {
      hiddenAbove = node.level;
    }
  }
  return rows;
};

/** A copy of the set with `id` removed if it was there, added if it was not. */
export const toggledIn = (set: Set<string>, id: string): Set<string> => {
  const next = new Set(set);
  if (!next.delete(id)) {
    next.add(id);
  }
  return next;
};
