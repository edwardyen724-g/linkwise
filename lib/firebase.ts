import { getAuth, signInWithEmailAndPassword as firebaseSignIn } from 'firebase/auth';

export const getAuthInstance = () => getAuth();
export const signInWithEmailAndPassword = firebaseSignIn;
