// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrI-7ce3P2A3r5fqsDxLgixTNEaKnj02U",
  authDomain: "ego-digital-c02b1.firebaseapp.com",
  projectId: "ego-digital-c02b1",
  storageBucket: "ego-digital-c02b1.appspot.com",
  messagingSenderId: "319662314675",
  appId: "1:319662314675:web:48b0f98ebcc08240678cc6",
  measurementId: "G-H19SBXQ1J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };