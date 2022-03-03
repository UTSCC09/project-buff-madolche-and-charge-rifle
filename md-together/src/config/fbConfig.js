// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD25rZHQZYYr8wdFZelZ7HHzIxUTOYK9zA",
  authDomain: "mdtogether-c2027.firebaseapp.com",
  databaseURL: "https://mdtogether-c2027-default-rtdb.firebaseio.com",
  projectId: "mdtogether-c2027",
  storageBucket: "mdtogether-c2027.appspot.com",
  messagingSenderId: "555065133566",
  appId: "1:555065133566:web:8babace8f473b0f61c58af",
  measurementId: "G-LS28432P3N"
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const fbConfig = firebase.initializeApp(firebaseConfig).firestore();



// firebase.firestore().settings({timestampInSnapshots:true});
export default fbConfig