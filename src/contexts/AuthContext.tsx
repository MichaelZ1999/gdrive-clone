import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { database, auth } from '../firebase';
import type { UserInfo } from 'firebase/auth'
import { Auth } from 'firebase/auth'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,sendPasswordResetEmail,updateEmail,updatePassword} from "firebase/auth";

export interface User extends Omit<UserInfo, 'providerId'> {
  emailVerified: boolean;
}


interface AuthContextProps {
  
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  onUpdateEmail: (email: string) => Promise<void>;
  onUpdatePassword: (password: string) => Promise<void>;
  currentUser:User | null
}




const AuthContext = React.createContext<AuthContextProps | null>(null);

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
      return context;
}

export function AuthProvider({ children }: { children: React.ReactNode}) {
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)
  
  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth,email, password)
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth,email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth,email)
  }

  function onUpdateEmail(email: string): Promise<void>{
    if (auth.currentUser) {
      return updateEmail(auth.currentUser,email)
    } throw new Error('Cannot update Email. No current user available.') 
  }
    
  function onUpdatePassword(password: string): Promise<void>{
    if (auth.currentUser) {
      return updatePassword(auth.currentUser,password)
    } throw new Error('Cannot update password. No current user available.') 
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
                setCurrentUser(user);
                setLoading(false);
              })

    return unsubscribe
  }, [])

  const value: AuthContextProps = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    onUpdateEmail,
    onUpdatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}



























// import React from 'react'
// import { useState, useContext, useEffect, createContext } from 'react'
// import { auth } from '../firebase';
// import Login from '../components/authentication/Login';





// const AuthContext = createContext<AuthContextProps | undefined> (undefined);

// export function useAuth(): AuthContextProps {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//       return context;
//   }
   
// export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  
//   const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
//   const [loading, setLoading] = useState(true)
  
//   function signup(email: string, password: string): Promise<firebase.auth.UserCredential> {
//     return auth.createUserWithEmailAndPassword(email, password)
//   }

//   function login(email: string, password:string): Promise<firebase.auth.UserCredential>{
//     return auth.signInWithEmailAndPassword(email, password)
//   }

//   function logout(): Promise<void>{
//     return auth.signOut()
//   }

//   function resetPassword(email: string): Promise<void> {
//     return auth.sendPasswordResetEmail(email)
//   }

//   function updateEmail(email: string): Promise<void>{
//     if (currentUser) {
//       return currentUser.updateEmail(email)
//   } throw new Error('Cannot update Email. No current user available.') }

//   function updatePassword(password: string): Promise<void>{
//     if (currentUser) {
//       return currentUser.updatePassword(password)
//   } throw new Error('Cannot update password. No current user available.') }

  
  
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged
//     (
//       user => {
//                 setCurrentUser(user);
//                 setLoading(false);
//               }
//                       )

//     return unsubscribe
//   }, [])

// const value: AuthContextProps = {
//     currentUser,
//     signup,
//     login,
//     logout,
//     resetPassword,
//     updateEmail,
//     updatePassword,
// };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }
