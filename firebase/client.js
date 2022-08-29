import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCrUX6ZmidS0By_sfxZKl5K5-ASejFTEwA",
  authDomain: "cobuild-193ee.firebaseapp.com",
  projectId: "cobuild-193ee",
  storageBucket: "cobuild-193ee.appspot.com",
  messagingSenderId: "696957471455",
  appId: "1:696957471455:web:56c9836ebe86eae0bcf76a",
  measurementId: "G-93YBVJPPK2"
}

const app = initializeApp(firebaseConfig)
export const DB = getFirestore(app)
