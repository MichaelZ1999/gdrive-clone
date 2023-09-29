import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { IFolder } from "../../models/Folder";
import FolderIcon from '../../assets/foldicon.png';
import OptionsMenu from "./OptionsMenu";
import { addFolderToFavorites } from "./AddToFavorites";

interface FolderProps {
  folder: IFolder;
  onPress: (folder: IFolder) => void; 
}

export default function Folder({ folder, onPress }: FolderProps): JSX.Element {
  const truncatedName = folder.name.length > 10 ? `${folder.name.slice(0, 10)}...` : folder.name;
  function handleOptionSelected(option: string) {
    if (option === "add-to-favorites") {
      addFolderToFavorites(folder); // Assuming you have an API function to add folders to favorites
    } else {
      // Handle other options...
    }
  }
  return (
    <div className="flex flex-row">
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
      <OptionsMenu onOptionSelected={handleOptionSelected} />
    </div>
  );
}