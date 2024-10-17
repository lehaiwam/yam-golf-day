// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth"; 
//import { getStorage } from "firebase/storage" 
import { getFirestore } from "firebase/firestore"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBClRfZSRo1C3somHX3BiRQhm4f9Qlzio",
  authDomain: "yam-golf-day.firebaseapp.com",
  projectId: "yam-golf-day",
  storageBucket: "yam-golf-day.appspot.com",
  messagingSenderId: "340302895220",
  appId: process.env.REACT_APP_API_KEY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const storage = getStorage();
export const db = getFirestore(app);
