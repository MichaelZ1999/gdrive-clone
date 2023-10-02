import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore,serverTimestamp  ,DocumentData,collection,doc} from 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDD0Mtg4vwuZ3u4MCEYgH1yhGuevrBjVkw",
  authDomain: "auth-development-8e667.firebaseapp.com",
  projectId: "auth-development-8e667",
  storageBucket: "auth-development-8e667.appspot.com",
  messagingSenderId: "575702284212",
  appId: "1:575702284212:web:f5a3262c661ddc4dfa24e1"
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = {
  addFolders:collection(firestore,'folders'),
  getFolders:doc(collection(firestore,'folders')),
  addFiles:collection(firestore,'files'),
  getFiles:doc(collection(firestore,'files')),
  addUsers:collection(firestore,'users'),
  getUsers:doc(collection(firestore,'users')),
  
  formatDoc: (doc: DocumentData) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimestamp: serverTimestamp
};
export const storage = getStorage();
export const auth =getAuth()
// ... rest of the code



// addTrashs:collection(firestore,'trashs'),
  // getTrashs:doc(collection(firestore,'trashs')),
  // addFavs:collection(firestore,'favs'),
  // getFavs:doc(collection(firestore,'favs')),


















// // import firebase from "firebase/compat/app"
// import "firebase/compat/firestore"
// // import "firebase/compat/storage"

// import firebase from "firebase/compat/app"
// // import "firebase/auth"
// // import "firebase/storage"
// // import "firebase/compat/"
// const app = firebase.initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID

// })
// const firestore = app.firestore()
// export const database = {
//     folders: firestore.collection('folders'),
//     files: firestore.collection('files'),
//     users: firestore.collection('users'),
//     trash: firestore.collection('trash'),
//     fav: firestore.collection('fav'),
//     formatDoc: (doc: firebase.firestore.DocumentData) => {
//         return { id: doc.id, ...doc.data()}
//     },
//     getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
// }
// export const storage = app.storage()
// export const auth = app.auth()
// export default app

  