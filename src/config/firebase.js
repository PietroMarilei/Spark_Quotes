
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCixSJnnB9NKlvmQ819IctaUxVq45RfGzE",
    authDomain: "sparkquotes-5c90c.firebaseapp.com",
    projectId: "sparkquotes-5c90c",
    storageBucket: "sparkquotes-5c90c.appspot.com",
    messagingSenderId: "690692668288",
    appId: "1:690692668288:web:ea89f353b496f661369f65",
};
const app = initializeApp(firebaseConfig);
//get name service
export const auth =  getAuth(app)

export const googleProvider = new GoogleAuthProvider()

export const db  = getFirestore(app)