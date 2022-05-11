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
let errMsg = ''

export const userRegistration = (email:string, password:string) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
    })
    .catch(error => {
      console.log(error.code)
      alert(error.message);
    });
}

export const userSignIn = (email:string, password:string) => {
  firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then((data) => {
    console.log('Successfully signed in!',firebase.auth().currentUser);
    const user = firebase.auth().currentUser;
  })
  .catch(error => {switch (error.code) {
    case 'auth/invalid-email':
      errMsg = 'Invalid email'
      break
    case 'auth/user-not-found':
      errMsg = 'No account with that email was found'
      break
    case 'auth/wrong-password':
      errMsg = 'Incorrect password'
      break
    default:
      errMsg = 'Email or password was incorrect'
      break
  }});
}

export const userSignOut = () => {
  firebase.auth().signOut()
}

export default userSignOut