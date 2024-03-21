import { getApp, getApps, initializeApp } from "firebase/app";
import {
    getAuth
} from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB2rKeXpyiOcBXZKnCuRyHtHYLaNavGefw",
    authDomain: "upload-app-6796b.firebaseapp.com",
    projectId: "upload-app-6796b",
    storageBucket: "upload-app-6796b.appspot.com",
    messagingSenderId: "856311796285",
    appId: "1:856311796285:web:05ad7c56ce1cb4c9ca1054"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
