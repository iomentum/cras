import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';
import { getFirestore, setDoc, getDoc, doc } from 'firebase/firestore';


// Il faut mettre ça ds un .env
const firebaseConfig = {
  apiKey: "AIzaSyCYbjqSs55f4e8xqt9leTeGZzBR3AuD68k",
  authDomain: "cra-auth-c57c2.firebaseapp.com",
  projectId: "cra-auth-c57c2",
  storageBucket: "cra-auth-c57c2.appspot.com",
  messagingSenderId: "75056807790",
  appId: "1:75056807790:web:2b64a9a613172294200b7f"
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useUserStore = defineStore("user", {
  state: () :{
    firstName: string,
    lastName:string,
    customer: string,
    email: string,
    uid: string
  } => {
    return {
      firstName: "",
      lastName:"",
      customer: "",
      email: "",
      uid: ""
    };
  },
  actions: {
    setUserInfos(firstName:string, lastName:string, customer: string, email:string, uid:string) {
      this.firstName = firstName
      this.lastName = lastName
      this.email = email
      this.customer = customer
      this.uid = uid
    },
    addUser() {
      setDoc(doc(db, "users", this.uid), {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        customer: this.customer,
        uid: this.uid
      })
    }
  },
  getters: {
    getUserFullName() :string {
      return this.firstName
    }
  }
})