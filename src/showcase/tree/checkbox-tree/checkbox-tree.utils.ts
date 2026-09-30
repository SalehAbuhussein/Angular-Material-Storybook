import type { FileNode } from '../tree.types';

export const leavesOf = (node: FileNode): string[] =>
  node.children?.length ? node.children.flatMap(leavesOf) : [node.name];

export const allSelected = (node: FileNode, selected: Set<string>): boolean =>
  leavesOf(node).every((leaf) => selected.has(leaf));

export const someSelected = (node: FileNode, selected: Set<string>): boolean =>
  leavesOf(node).some((leaf) => selected.has(leaf)) && !allSelected(node, selected);

/** A copy of the set with every leaf under `node` added or removed. */
export const withLeaves = (selected: Set<string>, node: FileNode, checked: boolean): Set<string> => {
  const next = new Set(selected);
  for (const leaf of leavesOf(node)) {
    if (checked) {
      next.add(leaf);
    } else {
      next.delete(leaf);
    }
  }
  return next;
};

export const sortedNames = (selected: Set<string>): string[] => [...selected].sort();
