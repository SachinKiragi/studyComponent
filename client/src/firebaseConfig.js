// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzY2TU-vEGz-5DefpX0ZQCqnkQtX8rn0s",
  authDomain: "studycomponent-d1af0.firebaseapp.com",
  projectId: "studycomponent-d1af0",
  storageBucket: "studycomponent-d1af0.firebasestorage.app",
  messagingSenderId: "815658458662",
  appId: "1:815658458662:web:9cc1357d384395a99810e7",
  measurementId: "G-736G9W85TJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); 
const analytics = getAnalytics(app);