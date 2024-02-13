// Firebase SDK './config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAQbmONByZV7v8utQ-21w5wxgCRM0XeA7k",
    authDomain: "blogpostbytarun.firebaseapp.com",
    databaseURL: "https://blogpostbytarun-default-rtdb.firebaseio.com",
    projectId: "blogpostbytarun",
    storageBucket: "blogpostbytarun.appspot.com",
    messagingSenderId: "554013420542",
    appId: "1:554013420542:web:5b6a24bf8c2c70233deeaf",
    measurementId: "G-TJ8DKFFG32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);  