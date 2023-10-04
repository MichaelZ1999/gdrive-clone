import React from "react"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import Folder from "./Folder"
import AddFolderButton from "./AddFolderButton"
import AddFileButton from './AddFileButton'
import { useParams, useLocation } from 'react-router'
import { useFolder } from '../../hooks/useFolder'
import { useState } from "react"
import File from "./File"
// import MediaViewer from './MediaViewer';



export default function Folders() {
const { folderId } = useParams<{ folderId: string }>();
  // const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // const [open, setOpen] = useState(false);
  const [ curentFolder, setCurrentFolder ]= useState()
  const { folder, childFolders, childFiles } = useFolder(folderId, curentFolder)
    console.log(folder,'folrder>>>')
    //Addition
    // const [selectedMedia, setSelectedMedia] = useState<{ type: string; url: string } | null>(null);



  return (
    <>
      <FolderBreadcrumbs currentFolder={folder} />
              <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">              
                <div className="flex flex-row-reverse">
                  <AddFileButton currentFolder={folder} />
                  <AddFolderButton currentFolder={folder} />
                  </div>
              </div>
          
          {childFolders.length > 0 && (
            
            <div className='flex justify-around '>
              <div className="grid grid-cols-4 grid-flow-row gap-7 ">
              {
                childFolders.filter((childFolder: any) => !childFolder.isTrash)
                            .map((childFolder: any)  => (
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
                childFiles.filter((childFile: any) => !childFile.isTrash).map((childFile: any) => (
                  <div
                    key={childFile.id}
                    style={{maxWidth: "150px"}}
                    className='p-2'
                  >
                    <File
                        file={childFile}
                    />
                  </div>
                ) )}
            </div>
            </div>
            
          )}
          
    </>
  )
}

                        //openMedia={(type: string, url: string) => setSelectedMedia({ type, url })}


//openMedia={(type: string, url: string) => setSelectedMedia({ type, url })}
{/* {selectedMedia && (
        <MediaViewer
          mediaType={selectedMedia.type}
          mediaUrl={selectedMedia.url}
          onClose={() => setSelectedMedia(null)}
        />
      )} */}
//Addition
    // const [selectedMedia, setSelectedMedia] = useState<{ type: string; url: string } | null>(null);

// import MediaViewer from './MediaViewer';

  // const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // const [open, setOpen] = useState(false);