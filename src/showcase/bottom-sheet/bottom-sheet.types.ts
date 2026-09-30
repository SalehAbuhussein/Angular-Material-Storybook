export interface ShareTarget {
  id: string;
  label: string;
  icon: string;
}

/** Shape of the data passed into the share sheet. */
export interface ShareData {
  fileName: string;
  targets: ShareTarget[];
}
