import { createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged,deleteUser, createUserWithEmailAndPassword,updateProfile,  signInWithEmailAndPassword, signOut, updateEmail ,updatePassword } from "firebase/auth"; 
import auth from '../firebase/firebase'

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserInfo] = useState({});
 
  const createUser =  (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password)
      // navigate('/login')
  }
  const signIn =  (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
    // navigate('/login')
}

  const upProfile = (value) => {
    return updateProfile(auth.currentUser, value)
  }

  const delUser = () => {
    return deleteUser(auth.currentUser)
  }
 

  const logout = () => {
    return signOut(auth)
  } 

  const upEmail =  (email) => {
    return updateEmail(auth.currentUser, email)
  } 

  const upPassword =  (password) => {
    return updatePassword(auth.currentUser, password)
  } 

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserInfo({
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        accessToken: user.accessToken,
        emailVerified: user.emailVerified ,
        photoUrl: user.photoUrl
      })
    })
    return () => {
      unsubscribe()
    } 
  },[])
 
  const data = {upEmail, signIn, logout, user, delUser,createUser,upProfile, auth,setUserInfo ,upPassword};
  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useAuth = () => useContext(Context);