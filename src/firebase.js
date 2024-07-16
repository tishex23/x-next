// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-53435.firebaseapp.com",
  projectId: "x-next-53435",
  storageBucket: "x-next-53435.appspot.com",
  messagingSenderId: "807980080157",
  appId: "1:807980080157:web:3dfb463bb12f995bc5baf4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
