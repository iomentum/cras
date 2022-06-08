import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';
import { ref } from 'vue'
import { getFirestore, setDoc, getDoc, doc } from 'firebase/firestore';
import 'firebase/compat/auth';
import { userSignOut, userSignIn, userRegistration } from '@/firebaseutils/auth';
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
const db = getFirestore(app);

const user = firebase.auth().currentUser;
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
      this.user.setInfos(firstName, lastName, customer, email, uid);
    },
    setSignatureURL(url:string) {
      this.user.setSignatureURL(url);
    },
    setFirstName(username:string) {
      this.user.setFirstName(username)
    },
    setCustomer(customer:string) {
      this.user.setCustomer(customer)
    },
    resetUserStore() {
      this.user.setInfos("","","","","");
      this.user.resetSignatureURL();
    },
    setDatabaseDoc() {
      setDoc(doc(db, "users", this.user.uid), {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        customer: this.user.customer,
        uid: this.user.uid,
        signatureURL: this.user.signatureURL,
      });
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
          docSnap.data().uid,
        )
        this.user.setSignatureURL(docSnap.data().signatureURL)
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