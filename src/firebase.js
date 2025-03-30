import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCN6WSwTiKmyL-jGr8cfEyNDkLyrJGYN1M",
  authDomain: "netflix-clone-ad767.firebaseapp.com",
  projectId: "netflix-clone-ad767",
  storageBucket: "netflix-clone-ad767.firebasestorage.app",
  messagingSenderId: "968270655044",
  appId: "1:968270655044:web:b7ac4daf198c22c8531611"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};