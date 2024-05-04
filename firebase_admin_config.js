// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQrzoPZrWsUjJVCFCTLzmfm9BKIEWFWps",
  authDomain: "node-backend-test-e1cb2.firebaseapp.com",
  projectId: "node-backend-test-e1cb2",
  storageBucket: "node-backend-test-e1cb2.appspot.com",
  messagingSenderId: "665212163198",
  appId: "1:665212163198:web:41d702a1136609c59fb42f",
  measurementId: "G-ZCZSDJ14D5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();
return { auth };
