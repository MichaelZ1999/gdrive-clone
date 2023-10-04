import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import Folder from './Folder';
import { firestore } from '../../firebase'; 
import { useAuth } from '../../contexts/AuthContext';
import File from './File';

const Favorites = () => {
  const [favoriteFolders, setFavoriteFolders] = useState([]);
  const [favoriteFiles, setFavoriteFiles] = useState([]);
  const [ curentFolder, setCurrentFolder ]= useState()
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchFavoriteFolders = () => {
      const q = query(collection(firestore, 'folders'), where('isFavorite', '==', true), where('userId', '==', currentUser.uid));
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const favoriteFoldersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setFavoriteFolders(favoriteFoldersData);
      });
      return () => unsubscribe();
    };
    fetchFavoriteFolders();
  }, []);

  useEffect(() => {
    const fetchFavoriteFiles = async () => {
      try {
        const q = query(collection(firestore, 'files'), where('isFavorite', '==', true), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const favoriteFilesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setFavoriteFiles(favoriteFilesData);
      } catch (error) {
        console.log('Error fetching favorite files:', error);
      }
    };

    fetchFavoriteFiles();
  }, []);

  return (
      <>
      <h1>Favorite Folders</h1>
        <div className='flex justify-around '>
        <div className="grid grid-cols-4 grid-flow-row gap-7 ">
          {favoriteFolders.map((folder) => (
            <Folder key={folder.id} folder={folder} onPress={(fold)=>setCurrentFolder(fold)} />
          ))}
        </div>
        </div>
        <h1>Favorite Files</h1>
        <div className='flex justify-around '>
        <div className="grid grid-cols-4 grid-flow-row gap-7 ">
          {favoriteFiles.map((file) => (
            <File file={file} />
          ))}
        </div>
        </div>
      </>
  );
};

export default Favorites;















// import React from "react";
// import { IFolder } from '../../models/Folder';
// import { FileProps } from "./File";


// interface FavoritesProps {
//   favoriteFolders: IFolder[];
//   favoriteFiles: FileProps[];
// }

// export default function Favorites({ favoriteFolders, favoriteFiles }: FavoritesProps): JSX.Element {
//   return (
//     <div>
//       <h2>Favorite Folders</h2>
//       {favoriteFolders.map((folder) => (
//         <div key={folder.id}>
//           {/* Render the favorite folder */}
//         </div>
//       ))}

//       <h2>Favorite Files</h2>
//       {favoriteFiles.map((file) => (
//         <div key={file.id}>
//           {/* Render the favorite file */}
//         </div>
//       ))}
//     </div>
//   );
// }