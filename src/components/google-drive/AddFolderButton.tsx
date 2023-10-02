import React, { useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { database } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { IFolder } from '../../models/Folder';
import {  addDoc } from "firebase/firestore"; 
import addfoldericon from '../../assets/addfoldericon.png'




interface AddFolderButtonProps {
    currentFolder: IFolder | null;
  }
  
  const ROOT_FOLDER: IFolder = {
    name: 'Root',
    id: 'root',
    path: [],
  };

export default function AddFolderButton( { currentFolder }: AddFolderButtonProps) {
    
    const [ open, setOpen ] = useState(false)
    const [name, setName] = useState("")
    const { currentUser } = useAuth()

function openModal() {
    setOpen(true)
}
    
function closeModal() {
    setOpen(false)
} 
    
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if(!currentUser)
    return
    e.preventDefault()
    
    const path = currentFolder?[...currentFolder.path]:[...ROOT_FOLDER.path]
    
    if (currentFolder) {
          path.push({ name: currentFolder.name, id: currentFolder.id })
        }
    
        addDoc(database.addFolders,
       { name: name,
        parentId: currentFolder?currentFolder.id:ROOT_FOLDER.id,
        userId: currentUser.uid,
        path: path,
        createdAt: database.getCurrentTimestamp(),
        isFavorite: false,
        isTrash: false,
    })
    setName("")
    closeModal()
}
return (
    <>
        <Button onClick={openModal}
            type="default"
            shape="round"
            size="small"
            className="flex-row"
            style={{height: 'auto'}}>
        <img src={addfoldericon} className="mr-2 h-10 w-10"  alt="Add Folder Icon" />
        </Button>
        


        
{/* <!-- Modal toggle --> */}


{/* <!-- Main modal --> */}
<Modal show={open} onHide={closeModal}  id="authentication-modal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full max-w-md max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" onClick={closeModal} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create Folder</h3>
                <form onSubmit={handleSubmit} className="space-y-6" action="#">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Folder Name</label>
                        <input type="text"
                            
                            value={name}
                            onChange={e => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="my photos" required/>
                    </div>
                
                    
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Folder</button>
                    
                </form>
            </div>
        </div>
    </div>
</Modal> 




        

    </>
    
  )
}


















