export interface IFolder {
    name: string;
    id: string | null;
    path: Array<{ name: string; id: string | null }>;
  }