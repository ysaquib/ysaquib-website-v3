import firebase from 'firebase/app';
import 'firebase/firestore';
// import 'firebase/database';
// import 'firebase/auth';
// import 'firebase/analytics';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

const config : Object = 
{
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

// const Firebase = (!firebase.apps.length) 
//                     ? firebase.initializeApp(config) 
//                     : firebase.app();

const Firebase = firebase.initializeApp(config);

// export const auth = Firebase.auth();
export const database = Firebase.firestore();

export default Firebase;