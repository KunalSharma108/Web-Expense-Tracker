// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdMfpJHEzgiVYRv6mhKbFp5gBdodlh8FE",
  authDomain: "web-expense-tracker-22aca.firebaseapp.com",
  projectId: "web-expense-tracker-22aca",
  storageBucket: "web-expense-tracker-22aca.appspot.com",
  messagingSenderId: "96644110295",
  appId: "1:96644110295:web:0ac392cb49fd69c0471d92",
  measurementId: "G-KNJH5J2C45"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)