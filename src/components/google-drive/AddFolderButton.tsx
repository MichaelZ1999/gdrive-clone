import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { database } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { IFolder } from '../../models/Folder';
import {  addDoc } from "firebase/firestore"; 
interface AddFolderButtonProps {
    currentFolder: IFolder | null;
  }
  
  const ROOT_FOLDER: IFolder = {
    name: 'Root',
    id: null,
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
    
    if (currentFolder == null) return
    const path = [...currentFolder.path]
    
    if (currentFolder !== ROOT_FOLDER) {
          path.push({ name: currentFolder.name, id: currentFolder.id })
        }
    
        addDoc(database.addFolders,
       { name: name,
        parentId: currentFolder.id,
        userId: currentUser.uid,
        path: path,
        createdAt: database.getCurrentTimestamp(),
    })
    setName("")
    closeModal()
}
return (
    <>
    <Button onClick={openModal} variant="outline-success" size="sm">
      <FontAwesomeIcon icon={faFolderPlus} />
    </Button>
    <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Folder Name</Form.Label>
                    <Form.Control
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="success" type="submit">
                    Add Folder
                </Button>
            </Modal.Footer>
        </Form>

    </Modal>
    </>
    
  )
}




















// import React, { useState, FormEvent } from 'react'
// import { Button, Modal, Form } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
// import { database } from '../../firebase'
// import { useAuth } from '../../contexts/AuthContext'
// import { Folder } from '../../hooks/useCustom'



// // interface AddFolderButtonProps {
// //     currentFolder: {
// //         name: string;
// //         id: string;
// //         path: Array<any>;
// //     } | null;
// // }
// interface AddFolderButtonProps {
//     currentFolder: Folder | null;
// }

// const ROOT_FOLDER: Folder = {
//     name: 'Root',
//     id: null,
//     path: [],
// }

// export default function AddFolderButton({ currentFolder }: AddFolderButtonProps) {
    
//     const [ open, setOpen ] = useState(false)
//     const [ name, setName ] = useState("")
//     const { currentUser } = useAuth()

// function openModal() {
//     setOpen(true)
// }
    
// function closeModal() {
//     setOpen(false)
// } 
    
// function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
    
//     if (currentFolder == null) return
//     const path = [...currentFolder.path]
    
//     if (currentFolder !== ROOT_FOLDER) {
//           path.push({ name: currentFolder.name, id: currentFolder.id as string })
//         }
    
//     database.folders.add({
//         name: name,
//         parentId: currentFolder.id,
//         userId: currentUser.uid,
//         path: path,
//         createdAt: database.getCurrentTimestamp(),
//     })
//     setName("")
//     closeModal()
// }
// return (
//     <>
//     <Button onClick={openModal} variant="outline-success" size="sm">
//       <FontAwesomeIcon icon={faFolderPlus} />
//     </Button>
//     <Modal show={open} onHide={closeModal}>
//         <Form onSubmit={handleSubmit}>
//             <Modal.Body>
//                 <Form.Group>
//                     <Form.Label>Folder Name</Form.Label>
//                     <Form.Control
//                 type="text"
//                 required
//                 value={name}
//                 onChange={e => setName(e.target.value)}/>
//                 </Form.Group>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={closeModal}>
//                     Close
//                 </Button>
//                 <Button variant="success" type="submit">
//                     Add Folder
//                 </Button>
//             </Modal.Footer>
//         </Form>

//     </Modal>
//     </>
    
//   )
// }
