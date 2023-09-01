import React, { useState } from 'react'
import Navbar from './Navbar'
import { Container } from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import AddFileButton from './AddFileButton'
import { useParams, useLocation } from 'react-router'
import { useFolder } from '../../hooks/useCustom'
import Folder from './Folder'
import File from './File'

import FolderBreadcrumbs from './FolderBreadcrumbs'

interface DashboardProps {}

export default function Dashboard() {

  const { folderId } = useParams<{ folderId: string }>();
  const [ curentFolder, setCurrentFolder ]= useState()
  const { folder, childFolders, childFiles } = useFolder(folderId, curentFolder)
  console.log(folder,'folrder>>>')
    
  return (
    <>
    <Navbar/>
    <Container fluid>
          <div className="d-flex align-items-center">
            <FolderBreadcrumbs currentFolder={folder} />
            <AddFileButton currentFolder={folder} />
            <AddFolderButton currentFolder={folder} />
          </div> 
             
          {/* {folder && <Folder folder={folder}></Folder>} */}
          {childFolders.length > 0 && (
            <div className='d-flex flex-wrap'>
              {
                childFolders.map((childFolder: any)  => (
                  <div
                    key={childFolder.id}
                    style={{maxWidth: "150px"}}
                    className='p-2'
                  >
                    <Folder folder={childFolder} onPress={(fold)=>setCurrentFolder(fold)}/>

                  </div>

                ) )}

            </div>
          )}
          {childFolders.length > 0 && childFiles.length > 0 && <hr />}
          {childFiles.length > 0 && (
            <div className='d-flex flex-wrap'>
              {
                childFiles.map((childFile: any) => (
                  <div
                    key={childFile.id}
                    style={{maxWidth: "150px"}}
                    className='p-2'
                  >
                    <File file={childFile}/>
                  </div>
                ) )}
            </div>
          )}
     </Container>
    
    </>
    
  )
}
