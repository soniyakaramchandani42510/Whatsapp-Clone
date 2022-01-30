
// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyA9dAL4VKzh9heXZAy3DmMY4XNjZJqDHKs",
  authDomain: "whatsapp-clone-b7a25.firebaseapp.com",
  projectId: "whatsapp-clone-b7a25",
  storageBucket: "whatsapp-clone-b7a25.appspot.com",
  messagingSenderId: "398763056241",
  appId: "1:398763056241:web:84a4a6cd2dea000d11cfd0",
  measurementId: "G-0R7QT0SM3H"
};
//initialize our project
const firebaseApp=firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
//authentication handler
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export{auth,provider};
export default db;