import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';
import { ref } from 'vue'
import { getFirestore, setDoc, getDoc, doc } from 'firebase/firestore';
import 'firebase/compat/auth';
import { userSignOut, userSignIn, userRegistration } from '@/firebaseauth/user';
import { User } from '@/models/user';

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
firebase.initializeApp(firebaseConfig);

const user = firebase.auth().currentUser;
const db = getFirestore(app);
const isLoggedIn = ref(false);
let userId = "";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    isLoggedIn.value = true
    userId = user.uid
  } else {
    isLoggedIn.value = false
  }
})

export const useUserStore = defineStore("user", {
  state: () :{
    user: User
  } => {
    return {
      user: new User("","","","",""),
    };
  },
  actions: {
    setUserInfos(firstName:string, lastName:string, customer: string, email:string, uid:string) {
      this.user.setInfos(firstName, lastName, customer, email, uid)
    },
    resetUserStore() {
      this.user.setInfos("","","","","")
    },
    setDatabaseDoc() {
      setDoc(doc(db, "users", this.user.uid), {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        customer: this.user.customer,
        uid: this.user.uid
      })
    },
    async getUserFromDB() {
      const docRef = doc(db, "users", userId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        this.user = new User(
          docSnap.data().firstName,
          docSnap.data().lastName,
          docSnap.data().customer,
          docSnap.data().email,
          docSnap.data().uid)
      }
    },
  },
  getters: {
    getUserFullName() :string {
      return `${this.user.firstName} ${this.user.lastName}`
    },
    getUpperFirstChar() :string {
      return this.user.lastName.charAt(0).toUpperCase()
    }
  }
})