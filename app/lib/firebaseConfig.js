// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, setDoc, getDocs, collection, doc, deleteDoc   } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try{
    const res = await signInWithPopup(auth, googleProvider);
    console.log(res)
    return {
      'success' : true,
      'response' : res,
      'error'    : null
    };
  } catch (err) {
    console.log(err);
    return {
      'success' : false,
      'response' : null,
      'error'    : err
    };
  }
}


// firestore functions 
const addItemToPantry = async (userId, itemName, itemMetaData) => {
  const userDoc = doc(db, 'users', userId);
  const pantry = collection(userDoc, 'items');
  const itemRef = doc(pantry, itemName)
  try {
    await setDoc(itemRef, itemMetaData);
    return {success : true}
  } catch (err) {
    console.log(err)
    return {success : false}
  }
}

const getItemsFromPantry = async (userId) => {
  try {
  console.log(userId)
  const userDoc = doc(db, 'users', userId);
  const colRef = collection(userDoc, 'items')
  const itemSnapshots = await getDocs(colRef);
  const items =  itemSnapshots.docs.map(doc => ({ name : doc.id, itemMetaData : doc.data() }));
  return {items : items.length?items : []};
  } catch (err) {
    console.log(err)
    return { items : [] }
  }
}

const addUser = async (userId) => {
  try {
    const colRef = collection(db, 'users')
    const docRef = doc(colRef, userId)
    await setDoc(docRef, {});
    console.log('added the user as a document to the database ... ')
    return {success : true}
  } catch (err) {
    return {success : false}
  }
}

const deleteItemFromPantry = async (userId, itemName) => {
  try {
  const userDoc = doc(db, 'users', userId);
  const colRef = collection(userDoc, 'items');
  const itemRef = doc(colRef, itemName);
  await deleteDoc(itemRef);
  return {success : true};
  } catch (err) {
    return {success : false}
  }
}


export { auth, addItemToPantry, getItemsFromPantry, signInWithGoogle, addUser, deleteItemFromPantry };
