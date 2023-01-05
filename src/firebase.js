import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPvPMSO49sESqdjRayHLOn7f2B2LUCG4U",
  authDomain: "snapchatv2-6a0ad.firebaseapp.com",
  projectId: "snapchatv2-6a0ad",
  storageBucket: "snapchatv2-6a0ad.appspot.com",
  messagingSenderId: "782029281909",
  appId: "1:782029281909:web:5aec69ecc23a266149b63c",
  measurementId: "G-66D5T8NL0G",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, storage, provider };
