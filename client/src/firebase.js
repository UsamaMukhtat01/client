// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-esate-63045.firebaseapp.com",
  projectId: "mern-esate-63045",
  storageBucket: "mern-esate-63045.appspot.com",
  messagingSenderId: "176801094528",
  appId: "1:176801094528:web:8f18d90bbe64ef35923f65"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);