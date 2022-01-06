import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDCOkoGff27XupCsGsPtecrbzvla9DHsYM',
	authDomain: 'projectcolorchef.firebaseapp.com',
	projectId: 'projectcolorchef',
	storageBucket: 'projectcolorchef.appspot.com',
	messagingSenderId: '152717962787',
	appId: '1:152717962787:web:9956d7a035639bd9b60b96',
	measurementId: 'G-LG19J273J7',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);