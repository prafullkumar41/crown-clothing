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

 export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
   const collectionRef = firestore.collection(collectionKey);
   console.log(collectionRef);

   const batch = firestore.batch()
   objectsToAdd.forEach(obj => {
     const newDocRef = collectionRef.doc()
     
     batch.set(newDocRef,obj)
   })

   return await batch.commit()
 } 

 export const convertCollectionsSnapsotToMap = (collections) => {
    const transformedCollection =  collections.docs.map(doc => {
      const {title,items} = doc.data()
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }                             
   })
   return transformedCollection.reduce((accululator,collection) => {
     accululator[collection.title.toLowerCase()] = collection;
     return accululator
   },{})
 }




export const getCurrentUser = () => {
  return new Promise((resolve,reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      },reject )
    } 
  )
}







firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
