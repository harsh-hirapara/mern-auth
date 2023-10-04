// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQDXgFRCJQUZ_0wntD1fGPPcS8OsG21So",
  authDomain: "mern-auth-7bbfc.firebaseapp.com",
  projectId: "mern-auth-7bbfc",
  storageBucket: "mern-auth-7bbfc.appspot.com",
  messagingSenderId: "781756316395",
  appId: "1:781756316395:web:6d0a8ed9512d28ef545cae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);