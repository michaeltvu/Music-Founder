// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaZxMf5OWe98id0vp19yOzBzeBJwdYB6s",
  authDomain: "overground-b1abb.firebaseapp.com",
  projectId: "overground-b1abb",
  storageBucket: "overground-b1abb.appspot.com",
  messagingSenderId: "387401484068",
  appId: "1:387401484068:web:4f685679cf3b1c9a4915b1",
  measurementId: "G-GWT8Y17JWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);