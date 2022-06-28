// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVux3P4P2mx32in41_eOT7-UbEM9fmFT8",
  authDomain: "simple-todoapp-df5a8.firebaseapp.com",
  databaseURL: "https://simple-todoapp-df5a8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "simple-todoapp-df5a8",
  storageBucket: "simple-todoapp-df5a8.appspot.com",
  messagingSenderId: "359101333367",
  appId: "1:359101333367:web:7d2e6ad90cd0b0e2746b72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth()