<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import firebase from 'firebase/compat/app';
import { computed, ref } from 'vue';
import 'firebase/compat/storage';
import { changeUserInfos, setSignature } from '@/services/user';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

firebase.initializeApp(firebaseConfig);

const store = useUserStore();
const firstName = ref(store.user.firstName);
const lastName = ref(store.user.lastName);
const customer = ref(store.user.customer);

const uploadSignature = async (event:Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files;
  if (file && file.length > 0) {
    const fileFolder = store.user.email;
    const storageRef = firebase.storage().ref(`${fileFolder}/signature`);
    await storageRef.put(file[0]);
    storageRef.getDownloadURL().then((url) => {
      setSignature(url);
    });
  }
};

const deleteSignature = () => {
  const fileFolder = store.user.email;
  firebase.storage().ref(`${fileFolder}/signature`).delete();
  setSignature('');
};

const isSignatureEmpty = computed(() => {
  return store.user.signatureURL == '';
});

</script>

<template>
  <h1>Mon profil</h1>
  <div class="container">
    <label for="Nom">Prénom</label>
    <input
      v-model="firstName"
      type="text"
      name="Nom"
      :placeholder="store.user.firstName"
    >
    <label for="Prenom">Nom</label>
    <input
      v-model="lastName"
      type="text"
      name="Prenom"
      :placeholder="store.user.lastName"
    >
    <label for="Client">Client</label>
    <input
      v-model="customer"
      type="text"
      name="Client"
      :placeholder="store.user.customer"
    >
    <label for="Client">Signature</label>
    <img
      :src="store.user.signatureURL"
      class="signature"
    >
    <button
      v-if="!isSignatureEmpty"
      @click="deleteSignature"
    >
      Supprimer la signature
    </button>
    <input
      v-if="isSignatureEmpty"
      type="file"
      name="signature"
      accept="image/*"
      @change="uploadSignature"
    >
    <button @click="changeUserInfos(firstName, lastName, customer)">
      Sauvegarder
    </button>
  </div>
</template>

<style scoped lang="scss">
h1 {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  font-family: "bau-bold";
  color: black;
}
.container {
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  margin: 0 auto;
  padding: 15px;
  width: 30%;
  & input {
    width: 80%;
    border: 1px solid black;
    margin: 15px auto;
    padding: 10px;
    font-size: 15px;
  }
  & label {
    margin: 0 auto;
    margin-top: 10px;
  }
  & button {
    width: 60%;
    height: 45px;
    margin:0 auto;
    margin-top: 10px;
    justify-content: center;
    display: block;
    color: #fff;
    background: $main-color;
    font-size: 1em;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: .2s ease-in;
    cursor: pointer;
    text-decoration: none;
  }
  & .signature {
    margin: 0 auto;
    height: auto;
    width: 150px;
  }
}
</style>