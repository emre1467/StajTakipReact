import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyByqhgHCUJRzzQjVK76LCy_cHnZ0eoGxwM",
    authDomain: "fir-react-staj.firebaseapp.com",
    projectId: "fir-react-staj",
    storageBucket: "fir-react-staj.appspot.com",
    messagingSenderId: "113736853264",
    appId: "1:113736853264:web:5a2cc7bb78f41df1fa6795"
  };
  export const app=initializeApp(firebaseConfig)
export const storage=getStorage()