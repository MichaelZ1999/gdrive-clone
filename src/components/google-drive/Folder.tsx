import React, { Dispatch } from "react"
import { Link, LinkProps } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { IFolder } from "../../models/Folder"
import FolderIcon from '../foldicon.png'

interface FolderProps {
  folder: {
    id: string;
    name: string;
  },
  onPress:any
}
export default function Folder({ folder ,onPress}: FolderProps): JSX.Element {
  return (
    <>
    <div className="flex flex-row">
      <Button
      to={{
        pathname: `/folder/${folder.id}`,
      }}

      onClick={()=>onPress(folder)}
      variant="outline-dark"
      className="text-truncate w-100 flex-1 flex-row"
      as={Link as any}
    >
    <img src={FolderIcon} className="mr-0 h-10 w-10"/>
      {folder.name}
    </Button>
    </div>
    
    </>
  )
}