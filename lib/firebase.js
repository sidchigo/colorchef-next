import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDKAkSwrGut9nuy_5F0UBXPXUq4En4_cjA',
	authDomain: 'colorchef-f8206.firebaseapp.com',
	projectId: 'colorchef-f8206',
	storageBucket: 'colorchef-f8206.appspot.com',
	messagingSenderId: '19806167589',
	appId: '1:19806167589:web:880a0c1e22557d164715cc',
	measurementId: 'G-EHHJ9JELDX',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);