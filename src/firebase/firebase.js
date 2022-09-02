import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAPwXi7SM6jAvemClmMPkjDcgRTZswUieE",
  authDomain: "auth-30298.firebaseapp.com",
  projectId: "auth-30298",
  storageBucket: "auth-30298.appspot.com",
  messagingSenderId: "230430713224",
  appId: "1:230430713224:web:c6f24c75d6616faaff863d"
};

const app = initializeApp(firebaseConfig);
const  auth = getAuth(app);
export default auth


