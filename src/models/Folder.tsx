export interface Folder {
    name: string;
    id: string | null;
    path: Array<{ name: string; id: string | null }>;
  }