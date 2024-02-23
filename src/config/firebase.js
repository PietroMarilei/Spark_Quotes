
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
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