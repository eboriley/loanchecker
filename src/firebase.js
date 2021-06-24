import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZc4KIjneN6aEOGE0aQC5iRUCYkqy1hME",
    authDomain: "abmock-7c3eb.firebaseapp.com",
    projectId: "abmock-7c3eb",
    storageBucket: "abmock-7c3eb.appspot.com",
    messagingSenderId: "309716927556",
    appId: "1:309716927556:web:d99e6cdfcdf3c7106de811",
    measurementId: "G-BRLBSVVDXT"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export {auth, provider, firebase};

export default db;