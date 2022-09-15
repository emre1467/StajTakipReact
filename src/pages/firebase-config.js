
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
import {getStorage} from "firebase/storage";

const  firebaseConfig = {
  apiKey: "AIzaSyAmSO52LWDrGOpdnMTaAMv2SuhYGckv-tg",
  authDomain: "fir-tutorial-ca834.firebaseapp.com",
  projectId: "fir-tutorial-ca834",
  storageBucket: "fir-tutorial-ca834.appspot.com",
  messagingSenderId: "582685006785",
  appId: "1:582685006785:web:94ef860af220df53e3ad40",
  measurementId: "G-6DDSNC4YMZ"
};

/*
const  firebaseConfig = {
  apiKey: "AIzaSyAG8zL8keXdGoo_N6Pp7do7xB9gbP6sbv4",
  authDomain: "fir-tutorial-9e57d.firebaseapp.com",
  projectId: "fir-tutorial-9e57d",
  storageBucket: "fir-tutorial-9e57d.appspot.com",
  messagingSenderId: "606400943004",
  appId: "1:606400943004:web:457f40c930655f0ef02e59",
  measurementId: "G-YL5G22MEP4"
};*/

// Initialize Firebase
  //export const app = initializeApp(firebaseConfig);
  export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  export const storage=getStorage()


export  const db=getFirestore(app)