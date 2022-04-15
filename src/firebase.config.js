import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDce5DBAnsEFuvB3xewbQMi5_3dvefEe1Q",
  authDomain: "selling-property.firebaseapp.com",
  projectId: "selling-property",
  storageBucket: "selling-property.appspot.com",
  messagingSenderId: "516487663491",
  appId: "1:516487663491:web:fdf51bfe0fcd2b184e30b6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
