import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCf6wvLUn7wRIAhW1VFLsX4ks-SXZ8W1mI",
    authDomain: "crwn-db-c33c6.firebaseapp.com",
    databaseURL: "https://crwn-db-c33c6.firebaseio.com",
    projectId: "crwn-db-c33c6",
    storageBucket: "crwn-db-c33c6.appspot.com",
    messagingSenderId: "506988396645",
    appId: "1:506988396645:web:9a9ad1ba44c2201500468c",
    measurementId: "G-9PP8LN6PKR"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error Creating User', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;