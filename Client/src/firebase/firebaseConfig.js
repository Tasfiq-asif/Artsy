// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyBg9Sw2NsHigk4jgeDD3Z9twyQMbaSMA",
  authDomain: "artsio-2a535.firebaseapp.com",
  projectId: "artsio-2a535",
  storageBucket: "artsio-2a535.appspot.com",
  messagingSenderId: "164079803365",
  appId: "1:164079803365:web:a5c269e30813bf096dad0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;