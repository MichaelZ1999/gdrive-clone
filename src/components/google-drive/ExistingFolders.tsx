import React from "react"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import Folder from "./Folder"
import AddFolderButton from "./AddFolderButton"
import AddFileButton from './AddFileButton'
import { useParams, useLocation } from 'react-router'
import { useFolder } from '../../hooks/useFolder'
import { useState, useEffect } from "react"
import { firestore } from '../../firebase'; 
import File from "./File"
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';



export default function ExistingFolders() {
const { folderId } = useParams<{ folderId: string }>();
const [existingFolders, setExistingFolders] = useState([]);
const [existingFiles, setExistingFiles] = useState([]);
const { currentUser } = useAuth()
  


  const [ curentFolder, setCurrentFolder ]= useState()
    const { folder, childFolders, childFiles } = useFolder(folderId, curentFolder)
  
    useEffect(() => {
      const fetchExistingFolders = async () => {
        const q = query(collection(firestore, 'folders'), where('isTrash', '==', false), where('userId', '==', currentUser.uid));
        return onSnapshot(q, (querySnapshot) => {
            const existingFoldersData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            setExistingFolders(existingFoldersData);
          });
        };
      
        fetchExistingFolders();
      }, []);
      useEffect(() => {
        const fetchExistingFiles = async () => {
            const q = query(collection(firestore, 'files'), where('isTrash', '==', false), where('userId', '==', currentUser.uid));
            return onSnapshot(q, (querySnapshot) => {
                const existingFilesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                ...doc.data()
              }));
              setExistingFiles(existingFilesData);
            });
          };
        
          fetchExistingFiles();
        }, []);
      
    

  return (
    <>
      <FolderBreadcrumbs currentFolder={folder} />
              <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">              
                <div className="flex flex-row-reverse">
                  <AddFileButton currentFolder={folder} />
                  <AddFolderButton currentFolder={folder} />
                  </div>
              </div>
          
          {existingFolders.length > 0 && (
            
            <div className='flex justify-around '>
              <div className="grid grid-cols-4 grid-flow-row gap-7 ">
              {
                existingFolders.map((existingFolder: any)  => (
                  <div
                    key={existingFolder.id}
                    style={{maxWidth: "150px"}}
                    className='p-10'
                  >
                    <Folder folder={existingFolder} onPress={(fold)=>setCurrentFolder(fold)}/>

                  </div>

                ) )}

            </div>
            </div>
          )}
          {existingFolders.length > 0 && existingFiles.length > 0 && <hr />}
          {existingFiles.length > 0 && (
              <div className='flex justify-evenly  '>
                <div className="grid grid-cols-4 grid-flow-row gap-7">
              {
                existingFiles.map((existingFile: any) => (
                  <div
                    key={existingFile.id}
                    style={{maxWidth: "150px"}}
                    className='p-2'
                  >
                    <File
                        file={existingFile}
                        
                    />
                  </div>
                ) )}
            </div>
            </div>
            
          )}
          
    </>
  )
}