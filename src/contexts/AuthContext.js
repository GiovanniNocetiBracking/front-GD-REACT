import React, { useContext, useState, useEffect } from "react"
import { auth, firestore } from "../components/Firebase/firebaseConfig"
import "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function register(email, password) {
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        firestore.collection("userInfo").doc(cred.user.uid).set({
          userName: "",
          lastName: "",
          firstName: "",
          about: "",
        })
      })
  }
  function login(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function logOut() {
    return auth
      .signOut()
      .then((result) => {
        console.log("console then logOut", result)
      })
      .catch((error) => {
        console.log("console error logOut", error)
      })
  }
  function forgotPassword(email) {
    return auth
      .sendPasswordResetEmail(email)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function signInWithGoogle(provider) {
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function signInWithFacebook(provider) {
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function signInWithGitHub(provider) {
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
      console.log("useEffect", user)
    })
    return unsuscribe
  }, [])

  const value = {
    currentUser,
    login,
    register,
    logOut,
    forgotPassword,
    signInWithGoogle,
    signInWithFacebook,
    signInWithGitHub,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
