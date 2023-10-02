

//   import React from 'react'
//   import { useFolder } from "./useFolder";

//   export default function useFavorites() {
//     const {folder, file} = useFolder(null, null); 
  
//     const favorites = useMemo(() => {
//       return {
//         folders: folder.filter((f: any) => f.isFavorite),
//         files: file.filter((f: any )=> f.isFavorite)
//      }
//     }, [folder, file])
  
//     return favorites;
//   }
  






















// import { useEffect, useState } from "react";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
// import { database, firestore } from '../firebase';

// export function useFavorites() {
//   const [favoriteFolders, setFavoriteFolders] = useState([]);
//   const [favoriteFiles, setFavoriteFiles] = useState([]);

//   useEffect(() => {
//     const unsubscribeFolders = onSnapshot(
//       query(collection(firestore, "favorites"), where("type", "==", "folder")),
//       (snapshot) => {
//         const folders = snapshot.docs.map((doc) => doc.data());
//         setFavoriteFolders(folders);
//       }
//     );

//     const unsubscribeFiles = onSnapshot(
//       query(collection(firestore, "favorites"), where("type", "==", "file")),
//       (snapshot) => {
//         const files = snapshot.docs.map((doc) => doc.data());
//         setFavoriteFiles(files);
//       }
//     );

//     return () => {
//       unsubscribeFolders();
//       unsubscribeFiles();
//     };
//   }, []);

//   return {
//     favoriteFolders,
//     favoriteFiles,
//   };
// }