import { initializeApp } from "firebase/app";
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';


const firebaseConfig = {
    apiKey: "AIzaSyDYzcWJBFuJNplhLYZTFbRMICzNvSGodBM",
    authDomain: "noticias-66f4d.firebaseapp.com",
    projectId: "noticias-66f4d",
    storageBucket: "noticias-66f4d.appspot.com",
    messagingSenderId: "53836002713",
    appId: "1:53836002713:web:86e182cc677713f2bbcf08",
    measurementId: "G-FJWCGF0G1W"
};

initializeApp(firebaseConfig);



export let googleSignIn = async () => {
    const result = await FirebaseAuthentication.signInWithGoogle();
    console.log(result);
    return result.user;
};




export const signInWithApple = async () => {
    const result = await FirebaseAuthentication.signInWithApple();
    return result.user;
};

export const signOut = async () => {
    await FirebaseAuthentication.signOut();
};
