
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore,} from "firebase/firestore";
import {signInWithEmailAndPassword} from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCiqN9qzIBIPUUcB3y2EVECD6by5Af-ybU",
  authDomain: "netflix-clone-bb354.firebaseapp.com",
  projectId: "netflix-clone-bb354",
  storageBucket: "netflix-clone-bb354.firebasestorage.app",
  messagingSenderId: "709471427053",
  appId: "1:709471427053:web:b10159d7d45be950ddefe4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
     const res =   await createUserWithEmailAndPassword(auth,email, password);
     const user = res.user;
     await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
     })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async(email, password)=>{
try {
await signInWithEmailAndPassword(auth, email, password);
} catch (error)  {
console.log(error);
toast.error(error.code.split('/')[1].split('-').join(" "));
}
}
const logout = ()=>{
  signOut(auth);
}
export {auth, db, login, signup, logout};