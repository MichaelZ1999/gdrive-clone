import React, { useState } from "react"
import ReactDOM from "react-dom"

import { useAuth } from "../../contexts/AuthContext"
import { storage, database } from "../../firebase"
import { ROOT_FOLDER } from "../../hooks/useFolder"
import { Toast } from "react-bootstrap"
import { v4 as uuidv4} from 'uuid'
import { Button, Progress, notification, message } from "antd"


import {  getDocs, query, where,addDoc} from "firebase/firestore"
import { ref,getDownloadURL,uploadBytesResumable } from "firebase/storage";
import addfileicon from '../../assets/addfileicon.png'

interface UploadFile{
    id: string;
    name: string;
    progress: number;
    error: boolean;
}

interface AddFileButtonProps{
    currentFolder: any;
}

const progressBarStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#f3f3f3"
  };

const progressStyle = (progress: number): React.CSSProperties  => ({
    height: "20px",
    backgroundColor: "#4caf50",
    textAlign: "center",
    lineHeight: "20px",
    color: "white",
    width: `${Math.round(progress * 100)}%`
  });  


export default function AddFileButton({ currentFolder }: AddFileButtonProps): JSX.Element {
    
    const [uploadingFiles, setUploadingFiles] = useState<UploadFile[]>([]);
    const { currentUser } = useAuth()

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>): void {
        if(!currentUser)
        return
        const file = (e.target)?.files?.[0];
        if (currentFolder == null && file == null) {
           console.log('currentfolder', currentFolder)
           console.log('file', file)
            return}

        const id = uuidv4()
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            { id: id, name: file.name, progress: 0, error: false },
        ])
        console.log(currentFolder)
        const filePath =
            !currentFolder
                ? `${ROOT_FOLDER.path}/${file?.name}`
                : `${currentFolder?.path.join("/")}/${currentFolder?.name}/${file.name}`

                console.log(filePath)

        const storageRef = ref(storage,`/files/${currentUser.uid}/${filePath}`)
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on('state_changed', snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            notification.open({
                key: id,
                message: 'Uploading File',
                description: `Uploading ${progress}%`,
                duration: 0,
            });
            message.loading({ content: 'Upload in progress...', key: id });
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

            message.success({ content: 'Upload Complete!', key: id, duration: 2 });
            
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                const q = query(database.addFiles,  where("name", '==', file.name),where("userId", "==", currentUser.uid),where("folderId", "==", currentFolder?currentFolder.id:ROOT_FOLDER.id));
                const  querySnapshot=await  getDocs(q)
                    const existingFile = querySnapshot.docs[0]
                    console.log(existingFile)
                    {
                        addDoc(database.addFiles,{
                            url: downloadURL,
                            name: file.name,
                            createdAt: database.getCurrentTimestamp(),
                            folderId: currentFolder?currentFolder.id:ROOT_FOLDER.id,
                            userId: currentUser.uid,
                            isFavorite: false,
                            isTrash: false,
                          })
                    }
                  });
                     
        })
    }
  
    return (
        <>
            
            <Button>
            <label className="btn btn-outline-success btn-sm m-0 mr-2">
            <img src={addfileicon} className="mr-2 h-10 w-10 "/>
                <input
                    type="file"
                    onChange={handleUpload}
                    style={{ opacity: 0, position: "absolute", left: "-9999px", height: '' }}
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
                        <Progress
                            type="circle"
                            size={"small"}
                            percent={file.error ? 100 : file.progress * 100}
                            strokeColor={file.error ? '#ff4d4f' : '#1890ff'}
                            format={percent =>
                                file.error ? 'Error' : `${Math.round(percent)}%`
                            }
                        />
                        </Toast.Body>
                    </Toast>
                 ))}
                </div>, 
                document.body
            )}
            </Button>
        </>
  )
}
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style= {{width: '45%'}}> 45%</div>
  </div>














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
