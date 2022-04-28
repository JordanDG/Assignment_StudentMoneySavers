import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

const db = getFirestore();
firebase.auth().setPersistence('session');

export const auth = app.auth();
export { db, getFirestore };

export default app;