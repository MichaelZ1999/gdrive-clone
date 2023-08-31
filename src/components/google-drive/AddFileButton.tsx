import React, { useState } from "react"
import ReactDOM from "react-dom"
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../contexts/AuthContext"
import { storage, database } from "../../firebase"
import { ROOT_FOLDER } from "../../hooks/useCustom"
import { ProgressBar, Toast } from "react-bootstrap"
import { v4 as uuidv4} from 'uuid'
import {  onSnapshot, query, where,addDoc,updateDoc} from "firebase/firestore"
import { ref,getDownloadURL,uploadBytesResumable } from "firebase/storage";
interface UploadFile{
    id: string;
    name: string;
    progress: number;
    error: boolean;
}

interface AddFileButtonProps{
    currentFolder: any;
}

export default function AddFileButton({ currentFolder }: AddFileButtonProps): JSX.Element {
    
    const [uploadingFiles, setUploadingFiles] = useState<UploadFile[]>([]);
    const { currentUser } = useAuth()

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>): void {
        if(!currentUser)
        return
        const file = (e.target)?.files?.[0];
        if (currentFolder == null || file == null) return

        const id = uuidv4()
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            { id: id, name: file.name, progress: 0, error: false },
        ])

        const filePath =
            currentFolder === ROOT_FOLDER
                ? `${currentFolder.path.join("/")}/${file.name}`
                : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`

        const storageRef = ref(storage,`/files/${currentUser.uid}/${filePath}`)
          const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on( "state_changed", snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id)
                        return { ...uploadFile, progress: progress 
                    }
                    return uploadFile
                })
            })
        },
        () => {   
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, error: true}
                    }
                    return uploadFile
                })
            })

        },
        () => {
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.filter(uploadFile => {
                    return uploadFile.id !== id
                })
            })
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const q = query(database.addFiles,  where("name", '==', file.name),where("userId", "==", currentUser.uid),where("folderId", "==", currentFolder.id));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const existingFile = querySnapshot.docs[0]
                    if (existingFile) {
                        existingFile.data().ref.update({url: downloadURL})
                    } else {
                        addDoc(database.addFiles,{
                            url: downloadURL,
                            name: file.name,
                            createdAt: database.getCurrentTimestamp(),
                            folderId: currentFolder.id,
                            userId: currentUser.uid,
                          })
                    }
                  });
              });        
        })
    }
  
    return (
        <>
            <label className="btn btn-outline-success btn-sm m-0 mr-2">
                <FontAwesomeIcon icon={faFileUpload} />
                <input
                    type="file"
                    onChange={handleUpload}
                    style={{ opacity: 0, position: "absolute", left: "-9999px" }}
                />
            </label>
            {uploadingFiles.length > 0 &&
                ReactDOM.createPortal(
                <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  maxWidth: "250px"
                }}>
                 {uploadingFiles.map(file => (
                    <Toast 
                        key={file.id} 
                        onClose={() => {
                            setUploadingFiles(prevUploadingFiles => {
                                return prevUploadingFiles.filter(uploadFile => {
                                    return uploadFile.id !== file.id
                                })
                            })
                        }}
                    >
                        <Toast.Header 
                            closeButton={file.error}
                            className='text-truncate w-100 d-block'
                        >
                            {file.name}
                        </Toast.Header>
                        <Toast.Body>
                            <ProgressBar
                                animated={!file.error}
                                variant={file.error ? 'danger' : 'primary'}
                                now={file.error ? 100 : file.progress * 100 }
                                label={
                                    file.error ? "Error" : 
                                    `${Math.round(file.progress * 100)}%`
                                } 
                            />
                        </Toast.Body>
                    </Toast>
                 ))}
                </div>, 
                document.body
            )}
        </>
  )
}

// import React, { useState } from "react"
// import ReactDOM from "react-dom"
// import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { useAuth } from "../../contexts/AuthContext"
// import { storage, database } from "../../firebase"
// import { ROOT_FOLDER } from "../../hooks/useCustom"
// import { ProgressBar, Toast } from "react-bootstrap"
// import { v4 as uuidv4} from 'uuid'

// export default function AddFileButton({ currentFolder }) {
//     const [uploadingFiles, setUploadingFiles] = useState([])
//     const { currentUser } = useAuth()

//     function handleUpload(e) {
//         const file = e.target.files[0]
//         if (currentFolder == null || file == null) return

//         const id = uuidv4()
//         setUploadingFiles(prevUploadingFiles => [
//             ...prevUploadingFiles,
//             { id: id, name: file.name, progress: 0, error: false },
//         ])

//         const filePath =
//             currentFolder === ROOT_FOLDER
//                 ? `${currentFolder.path.join("/")}/${file.name}`
//                 : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`

//         const uploadTask = storage
//             .ref(`/files/${currentUser.uid}/${filePath}`)
//             .put(file)

//         uploadTask.on( "state_changed", snapshot => {
//             const progress = snapshot.bytesTransferred / snapshot.totalBytes
//             setUploadingFiles(prevUploadingFiles => {
//                 return prevUploadingFiles.map(uploadFile => {
//                     if (uploadFile.id === id)
//                         return { ...uploadFile, progress: progress 
//                     }
//                     return uploadFile
//                 })
//             })
//         },
//         () => {   
//             setUploadingFiles(prevUploadingFiles => {
//                 return prevUploadingFiles.map(uploadFile => {
//                     if (uploadFile.id === id) {
//                         return { ...uploadFile, error: true}
//                     }
//                     return uploadFile
//                 })
//             })

//         },
//         () => {
//             setUploadingFiles(prevUploadingFiles => {
//                 return prevUploadingFiles.filter(uploadFile => {
//                     return uploadFile.id !== id
//                 })
//             })
            
//             uploadTask.snapshot.ref.getDownloadURL().then(url => {
//                 database.files
//                     .where("name", '==', file.name)
//                     .where("userId", "==", currentUser.uid)
//                     .where("folderId", "==", currentFolder.id)
//                     .get()
//                     .then(existingFiles => {
//                         const existingFile = existingFiles.docs[0]
//                         if (existingFile) {
//                             existingFile.ref.update({url: url})
//                         } else {
//                             database.files.add({
//                                 url: url,
//                                 name: file.name,
//                                 createdAt: database.getCurrentTimestamp(),
//                                 folderId: currentFolder.id,
//                                 userId: currentUser.uid,
//                               })
//                         }
//                     })
//             })        
//         })
//     }
  
//     return (
//         <>
//             <label className="btn btn-outline-success btn-sm m-0 mr-2">
//                 <FontAwesomeIcon icon={faFileUpload} />
//                 <input
//                     type="file"
//                     onChange={handleUpload}
//                     style={{ opacity: 0, position: "absolute", left: "-9999px" }}
//                 />
//             </label>
//             {uploadingFiles.length > 0 &&
//                 ReactDOM.createPortal(
//                 <div
//                 style={{
//                   position: "absolute",
//                   bottom: "1rem",
//                   right: "1rem",
//                   maxWidth: "250px"
//                 }}>
//                  {uploadingFiles.map(file => (
//                     <Toast 
//                         key={file.id} 
//                         onClose={() => {
//                             setUploadingFiles(prevUploadingFiles => {
//                                 return prevUploadingFiles.filter(uploadFile => {
//                                     return uploadFile.id !== file.id
//                                 })
//                             })
//                         }}
//                     >
//                         <Toast.Header 
//                             closeButton={file.error}
//                             className='text-truncate w-100 d-block'
//                         >
//                             {file.name}
//                         </Toast.Header>
//                         <Toast.Body>
//                             <ProgressBar
//                                 animated={!file.error}
//                                 variant={file.error ? 'danger' : 'primary'}
//                                 now={file.error ? 100 : file.progress * 100 }
//                                 label={
//                                     file.error ? "Error" : 
//                                     `${Math.round(file.progress * 100)}%`
//                                 } 
//                             />
//                         </Toast.Body>
//                     </Toast>
//                  ))}
//                 </div>, 
//                 document.body
//             )}
//         </>
//   )
// }
