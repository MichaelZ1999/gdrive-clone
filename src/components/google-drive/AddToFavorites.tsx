import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { database, firestore } from "../../firebase";

export async function addFolderToFavorites(folder: any) {
  try {
    await setDoc(doc(firestore, "favorites"), folder);
    console.log("Folder added to favorites successfully!");
  } catch (error) {
    console.error("Error adding folder to favorites:", error);
  }
}

export async function addFileToFavorites(file: any) {
  try {
    await setDoc(doc(firestore, "favorites"), file);
    console.log("File added to favorites successfully!");
  } catch (error) {
    console.error("Error adding file to favorites:", error);
  }
}



//await addDoc(collection(database.addFavorites, "favorites"), file);