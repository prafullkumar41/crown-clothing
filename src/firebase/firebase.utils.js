import firebase from  'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC-71bmfIv7281QrMO1_--qUoNQZxfW2MA",
    authDomain: "crwn-db-8405a.firebaseapp.com",
    databaseURL: "https://crwn-db-8405a.firebaseio.com",
    projectId: "crwn-db-8405a",
    storageBucket: "crwn-db-8405a.appspot.com",
    messagingSenderId: "460686727943",
    appId: "1:460686727943:web:974febec8a9b79502443a2",
    measurementId: "G-01459TGZ8Q"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;


    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };




firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
