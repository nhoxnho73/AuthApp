// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, onAuthStateChanged} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7NiIQZ2n00nGQVaad83LHzHg-cCYCRDw",
  authDomain: "integratefirebaseapp-d5c65.firebaseapp.com",
  projectId: "integratefirebaseapp-d5c65",
  storageBucket: "integratefirebaseapp-d5c65.firebasestorage.app",
  messagingSenderId: "655886470909",
  appId: "1:655886470909:web:59c79f356ffd150a59b894",
  measurementId: "G-TTTSZQ1WVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, db, onAuthStateChanged };
