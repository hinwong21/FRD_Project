import { initializeApp } from "firebase/app";
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

const firebaseConfig = {
    apiKey: "AIzaSyBpN_KwJWo4Lt0cHgwQSS07OGUsmV9y-Mo",
    authDomain: "noticias-df956.firebaseapp.com",
    projectId: "noticias-df956",
    storageBucket: "noticias-df956.appspot.com",
    messagingSenderId: "499965291407",
    appId: "1:499965291407:web:a8659d7bb75af8428a79fa",
    measurementId: "G-19R71RTGWT"
};

const app = initializeApp(firebaseConfig);

export let googleSignIn = async () => {
    const result = await FirebaseAuthentication.signInWithGoogle();
    return result.user;
};


const signInWithApple = async () => {
    const result = await FirebaseAuthentication.signInWithApple();
    return result.user;
};

