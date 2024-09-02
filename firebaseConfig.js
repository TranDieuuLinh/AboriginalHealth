import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDwwv4Xw9O3CcoQXW1SZVW5_MrV2dasKIk",
  authDomain: "healingcountry-3f2de.firebaseapp.com",
  projectId: "healingcountry-3f2de",
  storageBucket: "healingcountry-3f2de.appspot.com",
  messagingSenderId: "722658378100",
  appId: "1:722658378100:web:8c60fa505f1c6d22836c21",
  measurementId: "G-9VTP22NMV7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);