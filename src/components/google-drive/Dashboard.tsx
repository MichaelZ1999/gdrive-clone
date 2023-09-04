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
import NavbarUser from './UserNavBar'
interface DashboardProps {}

export default function Dashboard() {

  const { folderId } = useParams<{ folderId: string }>();
  const [ curentFolder, setCurrentFolder ]= useState()
  const { folder, childFolders, childFiles } = useFolder(folderId, curentFolder)
  console.log(folder,'folrder>>>')
    
  return (
    <>
    
    
        <NavbarUser/> 
        <FolderBreadcrumbs currentFolder={folder} />
          <div className="flex align-items-center justify-center pb-14">
              <div className="flex flex-row-reverse">
                  <AddFileButton currentFolder={folder} />
                  <AddFolderButton currentFolder={folder} />
              </div>
          </div> 
             
          {/* {folder && <Folder folder={folder}></Folder>} */}
          {childFolders.length > 0 && (
            
            <div className='flex justify-around '>
              <div className="grid grid-cols-4 grid-flow-row gap-7 ">
              {
                childFolders.map((childFolder: any)  => (
                  <div
                    key={childFolder.id}
                    style={{maxWidth: "150px"}}
                    className='p-10'
                  >
                    <Folder folder={childFolder} onPress={(fold)=>setCurrentFolder(fold)}/>

                  </div>

                ) )}

            </div>
            </div>
          )}
          {childFolders.length > 0 && childFiles.length > 0 && <hr />}
          {childFiles.length > 0 && (
              <div className='flex justify-evenly  '>
                <div className="grid grid-cols-4 grid-flow-row gap-7">
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
            </div>
            
          )}

    
    </>
    
  )
}


<section>
<div class="items-center px-8 py-12 mx-auto max-w-7xl lg:px-16 md:px-12 lg:py-24">
  <div class="justify-center w-full mx-auto">
    <nav class="flex py-3 border-y" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-4">
        <li>
          <div class="flex items-center">
            <a href="#" class="inline-flex items-center text-sm font-medium text-gray-500 duration-200 hover:text-gray-700 hover:scale-95">
              <ion-icon class="flex-shrink-0 w-4 h-4 md hydrated" name="home-outline" role="img" aria-label="home outline"></ion-icon>
              <span class="ml-4">
                Parent
              </span>
            </a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <span class="flex-shrink-0 w-5 h-5 text-gray-300">
              /
            </span>
            <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:scale-95 hover:text-gray-700">
              Parent
            </a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <span class="flex-shrink-0 w-5 h-5 text-gray-300">
              /
            </span>
            <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:scale-95 hover:text-gray-700">
              Parent
            </a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <span class="flex-shrink-0 w-5 h-5 text-gray-300">
              /
            </span>
            <a href="#" class="ml-4 text-sm font-medium text-blue-500 hover:scale-95 hover:text-gray-700" aria-current="page">
              Current
            </a>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
</section>            