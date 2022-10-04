
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCZeP7p2seEa2t-pLBIvLfdhW22k2mb3yc",
    authDomain: "connectify-bf4c4.firebaseapp.com",
    projectId: "connectify-bf4c4",
    storageBucket: "connectify-bf4c4.appspot.com",
    messagingSenderId: "719951336151",
    appId: "1:719951336151:web:c474a824f631e2e0ac1692",
    measurementId: "G-9T7Z4L6FWJ"
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;