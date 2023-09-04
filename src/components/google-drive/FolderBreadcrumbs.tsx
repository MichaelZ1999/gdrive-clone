import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { ROOT_FOLDER } from '../../hooks/useCustom'
import { Link } from 'react-router-dom'

interface FolderBreadcrumbsProps {
  currentFolder: Folder;
}

interface Folder {
  name: string;
  id: string | null;
  path?: Folder[];
}



export default function FolderBreadcrumbs({ currentFolder}:
  FolderBreadcrumbsProps): JSX.Element {
    let path: Folder[] = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if (currentFolder && currentFolder.path) path = [...path, ...currentFolder.path];
    return (
        <Breadcrumb
          className="flex-grow-1"
          listProps={{ className: "bg-white px-8 m-4 space-x-4 flex justify" }}
        >
          {path.map((folder, index) => (
            <Breadcrumb.Item
              key={folder.id}
              linkAs={Link}
              linkProps={{
                to: folder.id ? `/folder/${folder.id}` : "/",
              }}
              className="text-truncate d-inline-block font-serif"
              style={{ maxWidth: "150px" }}
            > {">> "}
              {folder.name}
            </Breadcrumb.Item>
          ))}
          {currentFolder && (
            <Breadcrumb.Item
              className="text-truncate d-inline-block  "
              style={{ maxWidth: "200px" }}
              active
            >
              {currentFolder.name}
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      )
    }
