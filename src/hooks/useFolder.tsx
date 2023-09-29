import { useReducer, useEffect } from "react"
import { database ,firestore} from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import { collection, onSnapshot,query, where, orderBy, addDoc, setDoc, doc } from "firebase/firestore";

//N//
const ACTIONS = {
    SELECT_FOLDER: "select-folder",
    UPDATE_FOLDER: "update-folder",
    SET_CHILD_FOLDERS: "set-child-folders",
    SET_CHILD_FILES: "set-child-files",
  }
//N//
export const ROOT_FOLDER = { name: "Root", id: 'root', path: [] }  

function reducer(state: any, { type, payload }:{ type: string, payload: any}) {
    switch (type) {
      case ACTIONS.SELECT_FOLDER:
        return {
          folderId: payload.folderId,
          folder: payload.folder,
          childFiles: [],
          childFolders: []
        }
      case ACTIONS.UPDATE_FOLDER:
        return {
          ...state,
          folder: payload.folder
        }
      case ACTIONS.SET_CHILD_FOLDERS:
        return {
          ...state,
          childFolders: payload.childFolders
        }
      case ACTIONS.SET_CHILD_FILES:
        return {
          ...state,
          childFiles: payload.childFiles
          }
      default:
        return state
    }
  }

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
      })
      console.log('past reducer')
  const { currentUser } = useAuth()
  console.log('past auth')

  useEffect(() => {
    console.log(folderId,folder);
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, 
        folder } })
      }, [folderId, folder])

  useEffect(() => {
    console.log(folderId,folder,'folderCheck');

        if (folderId == null) {
          return dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: { folder: ROOT_FOLDER },
          })
    }
      }, [folderId])
    
  useEffect(() => {
    if(!currentUser)
    return
    const q = query(database.addFolders,where("parentId", "==", folderId),where("userId", "==", currentUser.uid),orderBy("createdAt"));
    return onSnapshot(q, (querySnapshot) => {
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: querySnapshot.docs.map(database.formatDoc) },
      })
    });
      }, [folderId, currentUser])    
    
  useEffect(() => {
    if(!currentUser)
    return
    const q = query(database.addFiles,where("folderId", "==", folderId),where("userId", "==", currentUser.uid),orderBy("createdAt"));
    return onSnapshot(q, (querySnapshot) => {
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: { childFiles: querySnapshot.docs.map(database.formatDoc) },
      })
    });
      }, [folderId, currentUser])  
    return state
  }
// const addToFavorites = async (item: any) => {
//   try {
//     // Add the item to the favorites collection

//   await setDoc(doc(firestore, "favorites", currentUser.uid), {
//       itemId: item.id,
//       itemType: item.type, // "folder" or "file"
//       userId: currentUser.uid,
//       });
//       console.log('Item added to favorites successfully!');
//     } catch (error) {
//       console.log('Error adding item to favorites:', error);
//       }
//     };
//   return {...state, addToFavorites}