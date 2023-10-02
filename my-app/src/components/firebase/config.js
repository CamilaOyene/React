import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAhZquD9i9cKsvyqBMxVKnko13TZJKrtkg',
  authDomain: 'proyecto-final-react-9afec.firebaseapp.com',
  projectId: 'proyecto-final-react-9afec',
  storageBucket: 'proyecto-final-react-9afec.appspot.com',
  messagingSenderId: '637977711163',
  appId: '1:637977711163:web:2a0d276d4042af7e39821e',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
