import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgAyTS16U4gvZzuBQ00PROCfD2wVJSeDU",
  authDomain: "belajar-firebase-firestore.firebaseapp.com",
  projectId: "belajar-firebase-firestore",
  storageBucket: "belajar-firebase-firestore.appspot.com",
  messagingSenderId: "447931611394",
  appId: "1:447931611394:web:0880d227ce99003504ea1b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Services
const firestoreService = firebase.firestore();

export { firestoreService };
