import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIEnvAR4FU3S-_U0kbZ_5-Ey8FdbOldvo",
  authDomain: "project-repository-2b4f1.firebaseapp.com",
  projectId: "project-repository-2b4f1",
  storageBucket: "project-repository-2b4f1.appspot.com",
  messagingSenderId: "618415178892",
  appId: "1:618415178892:web:d13c5fe58bfef60e6d67a9",
  measurementId: "G-X9LEXPZP3J"
};

const app = initializeApp(firebaseConfig);
export default getFirestore();