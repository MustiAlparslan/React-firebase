import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: ,
  authDomain: //Your authDomain,
  projectId: //Your project Id,
  storageBucket: //Your StorageBucket,
  messagingSenderId: //Your messagingSenderId,
  appId: //your appId
};

const app = initializeApp(firebaseConfig);
const  auth = getAuth(app);
export default auth


