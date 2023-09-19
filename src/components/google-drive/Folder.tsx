import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { IFolder } from "../../models/Folder";
import FolderIcon from '../../assets/foldicon.png';

interface FolderProps {
  folder: IFolder;
  onPress: any;
}

export default function Folder({ folder, onPress }: FolderProps): JSX.Element {
  const truncatedName = folder.name.length > 10 ? `${folder.name.slice(0, 10)}...` : folder.name;
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
    </div>
  );
}