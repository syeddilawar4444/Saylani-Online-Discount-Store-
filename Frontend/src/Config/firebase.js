// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcN5SIh9rzXDOE9ozkfLpGCR_BYvMP1pM",
  authDomain: "online-store-2953d.firebaseapp.com",
  projectId: "online-store-2953d",
  storageBucket: "online-store-2953d.appspot.com",
  messagingSenderId: "802759149724",
  appId: "1:802759149724:web:fae64495dc3410fb838559"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("application",app)
const auth = getAuth(app)





async function signUpFirebase(userInfo) {
  const { email, password } = userInfo;
  //=================call the firebase built in function to import line No #4
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  console.log("user==>",userCredential)
  console.log("userID ===", userCredential.user.uid);
  //=================call the function to make the blew
//   await addUserToDb(userInfo, userCredential.user.uid, imageurl);
}

export {signUpFirebase}