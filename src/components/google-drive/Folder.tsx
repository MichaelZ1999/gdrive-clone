import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

import { IFolder } from "../../models/Folder";
import FolderIcon from '../../assets/foldicon.png';
import OptionsMenu from "./OptionsMenu";
import { firestore } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
interface FolderProps {
  folder: IFolder;
  onPress: any;
}

export default function Folder({ folder, onPress }: FolderProps): JSX.Element {

  const truncatedName = folder.name.length > 10 ? `${folder.name.slice(0, 10)}...` : folder.name;
  // const handleOptionSelected = (option) => {
  //   // Handle the selected option based on your requirements
  //   console.log(`Selected option: ${option}`);
  // };
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTrash, setIsTrash] = useState(false);
  const [existingFolders, setExistingFolders] = useState([]);
  
  const toggleFavorite = async () => {
    try {
      await  
      updateDoc(doc(firestore, 'folders', folder.id), { isFavorite: !isFavorite });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log("Error updating folder:", error);
    }
  };

  const toggleTrash = async (folderId) => {
    try {
      await 
      updateDoc(doc(firestore, 'folders', folder.id), { isTrash: !isTrash });
      setIsTrash(!isTrash);
      setExistingFolders(existingFolders.filter(folder => folder.id !== folderId));
    } catch (error) {
      console.log("Error deleting folder:", error);
    }
  };
  
  return (
    <div className="flex flex-col">
      <Link to={`/home/folder/${folder.id}`}>
        <Button
          type="default"
          shape="default"
          className="text-truncate w-100 flex-1 flex-row"
          onClick={() => onPress(folder)}
          style={{height: 'auto'}}
        >
          <img src={FolderIcon} className="mr-0 h-10 w-10" alt="Folder Icon" />
          {truncatedName}
        </Button>
       

      </Link>
      {/* <OptionsMenu onOptionSelected={handleOptionSelected} /> */}

      <Button onClick={toggleFavorite}>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</Button>
      <Button onClick={toggleTrash}>{isTrash ? 'Restore' : 'Delete'}</Button>

    </div>
  );
}