<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore';
import firebase from 'firebase/compat/app';
import { userRegistration } from '@/firebaseauth/user';

const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const customer = ref('');
const login = ref(false);


const user = firebase.auth().currentUser;

const store = useUserStore();

const errorMsg = ref('')
const register = async () => {
  const {
    user, error
  } = await userRegistration(email.value, password.value);

  if (user !== null) {
    const uid = firebase.auth().currentUser?.uid

    store.setUserInfos(
      firstName.value,
      lastName.value,customer.value,
      email.value,
      uid || ''
    )

    store.setDatabaseDoc()
    router.push('/')
    return
  }
  errorMsg.value = error
}
</script>

<template>
<h1>Inscription</h1>
<div class="error" v-if="errorMsg">{{ errorMsg }}</div>
<div class="input-container">
  <input type="text" placeholder="Prénom" v-model="firstName" />
  <input type="text" placeholder="Nom" v-model="lastName" />
  <input type="text" placeholder="Client" v-model="customer" />
  <input type="text" placeholder="Email" v-model="email" />
  <input type="password" placeholder="Mot de passe" v-model="password" />
  <button @click="register">S'inscrire</button>
  <router-link class="link" to="/">Continuer sans connexion</router-link>
</div>
</template>

<style scoped lang="scss">
h1 {
  font-family: "bau-bold";
  color: white;
  padding: 10px;
  margin: 0;
}
.error {
  color: red;
  font-family: "bau-bold";
}
.input-container {
  width: 80%;
  padding-bottom: 10px;
  & input {
    width: 80%;
    height: 20px;
    justify-content: center;
    margin: 0 auto;
    display: flex;
    padding: 10px;
    margin-top: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  & button, .nav-link{
    width: 60%;
    height: 40px;
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
    &:hover{
      background: white;
      color: $main-color;
    }
  }
  & .link {
    color: grey;
  }
}
</style>