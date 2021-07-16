import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/analytics';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

const config : Object = 
{
    apiKey: "AIzaSyACD81evf9LEPTaYHhaYFWXtfL4W9CcTx4",
    authDomain: "ysaquib-website.firebaseapp.com",
    projectId: "ysaquib-website",
    storageBucket: "ysaquib-website.appspot.com",
    messagingSenderId: "1018298456714",
    appId: "1:1018298456714:web:1fa942ddd53cf0bcdfeb73",
    measurementId: "G-8KS3KMRG4",
}

const Firebase = firebase.initializeApp(config);

// eslint-disable-next-line no-restricted-globals
// if (location.hostname === 'localhost') {
//     Firebase.firestore().useEmulator('localhost', 8080);
//     Firebase.auth().useEmulator('http://localhost:9099/');
// }

export default Firebase;
export {firebase};