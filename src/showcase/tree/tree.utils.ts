import type { FileNode } from './tree.types';

export const childrenOf = (node: FileNode): FileNode[] => node.children ?? [];

/** The `when` predicate for the node template that has a toggle. */
export const hasChildren = (_: number, node: FileNode): boolean => !!node.children?.length;
