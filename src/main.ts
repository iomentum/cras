import { createApp } from 'vue';
import { createPinia } from 'pinia';
import firebase from 'firebase/compat/app';
import router from './router';
import App from './App.vue';

const firebaseConfig = {
  apiKey: "AIzaSyCYbjqSs55f4e8xqt9leTeGZzBR3AuD68k",
  authDomain: "cra-auth-c57c2.firebaseapp.com",
  projectId: "cra-auth-c57c2",
  storageBucket: "cra-auth-c57c2.appspot.com",
  messagingSenderId: "75056807790",
  appId: "1:75056807790:web:2b64a9a613172294200b7f"
};

firebase.initializeApp(firebaseConfig);
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
