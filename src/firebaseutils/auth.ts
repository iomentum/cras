import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCYbjqSs55f4e8xqt9leTeGZzBR3AuD68k",
  authDomain: "cra-auth-c57c2.firebaseapp.com",
  projectId: "cra-auth-c57c2",
  storageBucket: "cra-auth-c57c2.appspot.com",
  messagingSenderId: "75056807790",
  appId: "1:75056807790:web:2b64a9a613172294200b7f"
};

firebase.initializeApp(firebaseConfig);

const user = firebase.auth().currentUser;

interface ERROR_CODES {
  [index: string]: string;
  'auth/invalid-email': string
  'auth/user-not-found': string
  'auth/wrong-password': string
  'auth/email-already-in-use': string
  'auth/operation-not-allowed': string
  'auth/weak-password': string
}

const ERROR_MESSAGES: ERROR_CODES = {
  'auth/invalid-email' : 'invalid email',
  'auth/user-not-found' : 'User not found',
  'auth/wrong-password' : 'incorrect password',
  'auth/email-already-in-use': 'email already used',
  'auth/operation-not-allowed': 'operation not allowed',
  'auth/weak-password': 'week password'
}

export const userRegistration = async (email:string, password:string) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return {
      user: user,
      error: false,
    }
  } catch (e) {
    const { code } = e as { message: string, code: string }
    return {
      user: false,
      error: ERROR_MESSAGES[code],
    }
  }
}

export const userSignIn = async (email:string, password:string) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return {
      user: user,
      error: false,
    }
  } catch (e) {
    const { code } = e as { message: string, code: string }
    return {
      user: false,
      error: ERROR_MESSAGES[code],
    }
  }
}

export const userSignOut = () => {
  firebase.auth().signOut()
}

export default userSignOut