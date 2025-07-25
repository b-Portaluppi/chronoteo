import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGzOz-JDukajqKL3oT13uhZasARrR7g9E",
  authDomain: "chronoteo-231da.firebaseapp.com",
  projectId: "chronoteo-231da",
  storageBucket: "chronoteo-231da.firebasestorage.app",
  messagingSenderId: "310941360021",
  appId: "1:310941360021:web:be58d1844aef56489e609c",
  measurementId: "G-7P73RWRB7M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}
