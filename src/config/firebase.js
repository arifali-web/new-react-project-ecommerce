
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {getDatabase} from  'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCglicZcrLH58XifP9xIndRvo9ik05Jha8",
  authDomain: "new-web-project-dae42.firebaseapp.com",
  databaseURL: "https://new-web-project-dae42-default-rtdb.firebaseio.com",
  projectId: "new-web-project-dae42",
  storageBucket: "new-web-project-dae42.appspot.com",
  messagingSenderId: "593094665829",
  appId: "1:593094665829:web:4982966e79468a920c088c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app)
export default app;