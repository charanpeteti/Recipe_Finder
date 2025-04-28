import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-Bk450y-yVXiHpL0SQMZ8jLk6ELCWs8M",
  authDomain: "recipe-finder-846dc.firebaseapp.com",
  projectId: "recipe-finder-846dc",
  storageBucket: "recipe-finder-846dc.firebasestorage.app",
  messagingSenderId: "238993992902",
  appId: "1:238993992902:web:0cd503aa8062378f5b7bc7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 