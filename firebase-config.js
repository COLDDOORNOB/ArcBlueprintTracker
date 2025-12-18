import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBoy9o27yXnXhxRHBT-mApta9ZENo2oeZU",
    authDomain: "arcblueprinttracker.firebaseapp.com",
    projectId: "arcblueprinttracker",
    storageBucket: "arcblueprinttracker.firebasestorage.app",
    messagingSenderId: "578043594072",
    appId: "1:578043594072:web:e6ff4b0d7cb5ffb0be112d",
    measurementId: "G-EHCHELVTW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
