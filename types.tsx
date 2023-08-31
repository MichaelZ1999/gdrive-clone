// ./types.ts

export interface ActionType {
    type: string;
    payload: any;
  }
  
  export interface StateType {
    folderId: string | null;
    folder: any;
    childFiles: any[];
    childFolders: any[];
    users: any[]; // or replace with an appropriate user type
    favorites: any[]; // or replace with an appropriate favorite type
    trash: any[]; // or replace with an appropriate trash type
  }