import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "../components/Firebase/firebaseConfig";
import "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	async function register(email, password) {
		return await auth
			.createUserWithEmailAndPassword(email, password)
			.then((cred) => {
				firestore.collection("userInfo").doc(cred.user.uid).set({
					userName: "",
					lastName: "",
					firstName: "",
					about: "",
				});
			})
			.then((cred) => {
				firestore.collection("userNotificationInfo").doc(cred.user.uid).set({
					notificatedUsersByMail: "",
					notificatedUsersByCellPhone: "",
				});
			});
	}
	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password).then(() => {
			setLoading(false);
		});
	}
	function logOut() {
		return auth.signOut();
	}
	function forgotPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}
	function signInWithGoogle(provider) {
		return auth.signInWithPopup(provider).then((cred) => {
			const doc = firestore.collection("userInfo").doc(cred.user.uid);
			doc.get().then((userData) => {
				if (userData.exists) {
					setLoading(false);
				} else {
					firestore.collection("userInfo").doc(cred.user.uid).set({
						userName: "",
						lastName: "",
						firstName: "",
						about: "",
					});
					firestore.collection("userNotificationInfo").doc(cred.user.uid).set({
						notificatedUsersByMail: "",
						notificatedUsersByCellPhone: "",
					});
					setLoading(false);
				}
			});
		});
	}
	function signInWithFacebook(provider) {
		return auth.signInWithPopup(provider).then((cred) => {
			const doc = firestore.collection("userInfo").doc(cred.user.uid);
			doc.get().then((userData) => {
				if (userData.exists) {
					setLoading(false);
				} else {
					firestore.collection("userInfo").doc(cred.user.uid).set({
						userName: "",
						lastName: "",
						firstName: "",
						about: "",
					});
					firestore.collection("userNotificationInfo").doc(cred.user.uid).set({
						notificatedUsersByMail: "",
						notificatedUsersByCellPhone: "",
					});
					setLoading(false);
				}
			});
		});
	}
	function signInWithGitHub(provider) {
		return auth.signInWithPopup(provider).then((cred) => {
			const doc = firestore.collection("userInfo").doc(cred.user.uid);
			doc.get().then((userData) => {
				if (userData.exists) {
					setLoading(false);
				} else {
					firestore.collection("userInfo").doc(cred.user.uid).set({
						userName: "",
						lastName: "",
						firstName: "",
						about: "",
					});
					firestore.collection("userNotificationInfo").doc(cred.user.uid).set({
						notificatedUsersByMail: "",
						notificatedUsersByCellPhone: "",
					});
					setLoading(false);
				}
			});
		});
	}
	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsuscribe;
	}, []);

	const value = {
		currentUser,
		login,
		register,
		logOut,
		forgotPassword,
		signInWithGoogle,
		signInWithFacebook,
		signInWithGitHub,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
