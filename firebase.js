// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeiNb8D0k1duL4qEG0qJ3ZF0KGdUoS1eQ",
  authDomain: "papafam-79265.firebaseapp.com",
  projectId: "papafam-79265",
  storageBucket: "papafam-79265.appspot.com",
  messagingSenderId: "702523747536",
  appId: "1:702523747536:web:7fa6b123ee6e3d2af042d5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  'login_hint': 'user@example.com'
});


export {db, auth, provider}