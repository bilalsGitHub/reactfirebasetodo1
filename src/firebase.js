// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkmHcaOQoYciw4d4ZmE6uI8zdTM2fW30w",
  authDomain: "react1-c6cef.firebaseapp.com",
  projectId: "react1-c6cef",
  storageBucket: "react1-c6cef.appspot.com",
  messagingSenderId: "812723613347",
  appId: "1:812723613347:web:c2e233ee9d65075c669916",
  measurementId: "G-6J3WY9JCRL",
};
// Firebase'i başlatın
const app = initializeApp(firebaseConfig);

// Firebase servislerini başlatın
const auth = getAuth(app); // Authentication servisi
const provider = new GoogleAuthProvider(); // Google sağlayıcısı
const db = getFirestore(app); // Firestore veritabanı

export { db, auth, provider, signInWithPopup, signOut };
