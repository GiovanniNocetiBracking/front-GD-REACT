import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "../components/Firebase/firebaseConfig";
import "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function register(email, password) {
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        firestore.collection("userInfo").doc(cred.user.uid).set({
          userName: "",
          lastName: "",
          name: "",
          about: "",
        });
      });
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logOut() {
    return auth.signOut();
  }
  function forgotPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsuscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logOut,
    forgotPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
