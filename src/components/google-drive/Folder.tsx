import React from "react"
import { Link, LinkProps } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"

interface FolderProps {
  folder: {
    id: string;
    name: string;
  }
}
export default function Folder({ folder }: FolderProps): JSX.Element {
  return (
    <Button
      to={{
        pathname: `/folder/${folder.id}`,
      }}
      variant="outline-dark"
      className="text-truncate w-100"
      as={Link as any}
    >
      <FontAwesomeIcon icon={faFolder} className="mr-2" />
      {folder.name}
    </Button>
  )
}