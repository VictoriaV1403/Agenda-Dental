// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa5JPMbpdNpOG-q3DXTMAD30lkIbf1pkI",
  authDomain: "agenda-dental-20362.firebaseapp.com",
  projectId: "agenda-dental-20362",
  storageBucket: "agenda-dental-20362.firebasestorage.app",
  messagingSenderId: "552653067236",
  appId: "1:552653067236:web:118307dca90c62da2cadf1",
  measurementId: "G-LVYEEY1MSJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };