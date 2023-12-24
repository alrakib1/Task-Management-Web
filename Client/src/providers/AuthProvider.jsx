import PropTypes from "prop-types";

import { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../services/firebase.config";

import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {



  const auth = getAuth(app);

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  //  create new user

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // log in existing user

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };



  //  login user using gmail: 

  const loginWithGmail = ()=>{
    setLoading(true);
    return signInWithPopup(auth, provider);
  }

  // update current user

const updateUser = (name,photo)=>{
 return updateProfile(auth.currentUser, {
    displayName: name, photoURL: photo
  })
}

  //  sign out user

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

// to get current logged in user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("current user",currentUser);
      setUser(currentUser);
      setLoading(false)
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const authInfo = {
    user,
    loading,
    signUp,
    logIn,
    logOut,
    loginWithGmail,
    updateUser
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
