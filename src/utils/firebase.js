// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYbELjbWcphv-2uR5mMk7VwmIKeEXKjfA",
  authDomain: "netflix-3eb1c.firebaseapp.com",
  projectId: "netflix-3eb1c",
  storageBucket: "netflix-3eb1c.firebasestorage.app",
  messagingSenderId: "516072164217",
  appId: "1:516072164217:web:a4cd3206f75dfd14673da8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();