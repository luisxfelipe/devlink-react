import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQ1F73LRLDrt0-UGceb03m5amHoFnEzVE",
  authDomain: "react-devlink.firebaseapp.com",
  projectId: "react-devlink",
  storageBucket: "react-devlink.appspot.com",
  messagingSenderId: "849847311338",
  appId: "1:849847311338:web:e70def9b94e6bc57903093"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db };