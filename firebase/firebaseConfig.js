// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyA9CUe8GBc0-cGFdd7FcA0k60ta95pbM6k",
  authDomain: "loyalty-app-ee76e.firebaseapp.com",
  projectId: "loyalty-app-ee76e",
  storageBucket: "loyalty-app-ee76e.appspot.com",
  messagingSenderId: "471133774716",
  appId: "1:471133774716:web:11f136314c1e67d7a73af9",
  measurementId: "G-V311129DGB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);