// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDahAZLP3Fe68j9C-7ZT9i0nAqiQWXhs_4",
  authDomain: "tracknerd-staging.firebaseapp.com",
  projectId: "",
  storageBucket: "tracknerd-staging.appspot.com",
  messagingSenderId: "",
  appId: "1:847967007196:web:ae4df284f5560af4139f19",
  databaseURL: "https://tracknerd-staging-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firebaseDB = getDatabase(app);
export { firebase, firebaseDB };
