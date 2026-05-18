// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW8WoWtJnYWG5ckKPB8_FEAsoSzVSnunM",
  authDomain: "ecommerce-da48a.firebaseapp.com",
  projectId: "ecommerce-da48a",
  storageBucket: "ecommerce-da48a.appspot.com",
  messagingSenderId: "194717342521",
  appId: "1:194717342521:web:02f1f9d1049d22e7b2a6e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;