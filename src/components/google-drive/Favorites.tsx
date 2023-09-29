// Favorites.tsx
import React from "react";
import Folder from "./Folder";
import File from "./File";
import { useFavorites } from "../../hooks/useFavorites";

export default function Favorites() {
  const { favoriteFolders, favoriteFiles } = useFavorites();

  return (
    <div>
      <h2>Favorites</h2>
      <div>
        {favoriteFolders.map((folder) => (
          <Folder key={folder.id} folder={folder} onPress={folder}/>
        ))}
      </div>
      <div>
        {favoriteFiles.map((file) => (
          <File key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}