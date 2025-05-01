import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Adicione esta importação

const firebaseConfig = {
  apiKey: "AIzaSyDkA_Ik1hWauQN1hq6dsWUhS6vE2LT40iI",
  authDomain: "bathqueue-9ef47.firebaseapp.com",
  projectId: "bathqueue-9ef47",
  storageBucket: "bathqueue-9ef47.firebasestorage.app",
  messagingSenderId: "430218074500",
  appId: "1:430218074500:web:777be32b1f63c6025965d1",
  measurementId: "G-20KZFSEG02"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);