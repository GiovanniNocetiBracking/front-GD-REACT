import React, { useContext, useState, useEffect } from "react";
import { auth } from "../components/Firebase/firebaseConfig";
import firebase from "firebase/app";
import "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function register(email, password) {
    //
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return auth.createUserWithEmailAndPassword(email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  }
  function login(email, password) {
    //return auth.signInWithEmailAndPassword(email, password);
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return auth.signInWithEmailAndPassword(email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  }
  function logOut() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsuscribe;
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    register,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
