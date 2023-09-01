import React, { Dispatch } from "react"
import { Link, LinkProps } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { IFolder } from "../../models/Folder"

interface FolderProps {
  folder: {
    id: string;
    name: string;
  },
  onPress:any
}
export default function Folder({ folder ,onPress}: FolderProps): JSX.Element {
  return (
    <Button
      to={{
        pathname: `/folder/${folder.id}`,
      }}
      onClick={()=>onPress(folder)}
      variant="outline-dark"
      className="text-truncate w-100"
      as={Link as any}
    >
      <FontAwesomeIcon icon={faFolder} className="mr-2" />
      {folder.name}
    </Button>
  )
}