import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import Folder from './Folder';
import { firestore } from '../../firebase'; 
import { useAuth } from '../../contexts/AuthContext';
import File from './File';

const Trash = () => {
  const [trashFolders, setTrashFolders] = useState([]);
  const [trashFiles, settrashFiles] = useState([]);
  const [ curentFolder, setCurrentFolder ]= useState()
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchTrashFolders = () => {
      const q = query(collection(firestore, 'folders'), where('isTrash', '==', true), where('userId', '==', currentUser.uid));
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const trashFoldersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTrashFolders(trashFoldersData);
      });
  
      return () => unsubscribe();
    };
  
    fetchTrashFolders();
  }, []);

  useEffect(() => {
  const fetchTrashFiles = () => {
    const q = query(collection(firestore, 'files'), where('isTrash', '==', true), where('userId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const trashFilesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      settrashFiles(trashFilesData);
    });

    return () => unsubscribe();
  };

  fetchTrashFiles();
}, []);

  return (
      <>
      <h1>Trashed Folders</h1>
        <div className='flex justify-around '>
        <div className="grid grid-cols-4 grid-flow-row gap-7 ">
          {trashFolders.map((folder) => (
            <Folder key={folder.id} folder={folder} onPress={(fold)=>setCurrentFolder(fold)}/>
          ))}
        </div>
        </div>
        <h1>Trashed Files</h1>
        <div className='flex justify-around '>
        <div className="grid grid-cols-4 grid-flow-row gap-7 ">
          {trashFiles.map((file) => (
            <File file={file} />
          ))}
        </div>
        </div>
      </>
  );
};

export default Trash;
