import * as firebase from "firebase/app";
import "firebase/auth";

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBk7kQqMGxTCjo_f49iXPm5RI8UgPB1-jg",
  authDomain: "social-tipping-ffe9b.firebaseapp.com",
  databaseURL: "https://social-tipping-ffe9b.firebaseio.com",
  projectId: "social-tipping-ffe9b",
  storageBucket: "social-tipping-ffe9b.appspot.com",
  messagingSenderId: "1062902404493",
  appId: "1:1062902404493:web:c3d800ed51d974373719c4",
  measurementId: "G-YN4TD67TQ0"
});

// firebase.analytics();