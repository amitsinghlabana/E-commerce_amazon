// import firebase from "firebase/compat/app";
// import 'firebase/compat/firestore';
// import 'firebase/firestore';
// import { initializeApp } from "firebase/app"
// import { getFirestore } from "firebase/firestore";

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDVxVcEXAakCx9XmUHyjC9Xws9269Anv9o",
  authDomain: "amzn-1-cl.firebaseapp.com",
  projectId: "amzn-1-cl",
  storageBucket: "amzn-1-cl.appspot.com",
  messagingSenderId: "932987358156",
  appId: "1:932987358156:web:1a5472db8869372aa86b69"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// const db = getFirestore(app);
const db = app.firestore();

export default db;
