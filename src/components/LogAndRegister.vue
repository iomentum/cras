<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const errMsg = ref('')
const isLoggedIn = ref(false)
const user = firebase.auth().currentUser;

const register = () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((data) => {
    })
    .catch(error => {
      console.log(error.code)
      alert(error.message);
    });
}

const signIn = () => {
  firebase
  .auth()
  .signInWithEmailAndPassword(email.value, password.value)
  .then((data) => {
    console.log('Successfully signed in!',firebase.auth().currentUser);
    const user = firebase.auth().currentUser;
    router.push("/")
  })
  .catch(error => {switch (error.code) {
    case 'auth/invalid-email':
      errMsg.value = 'Invalid email'
      break
    case 'auth/user-not-found':
      errMsg.value = 'No account with that email was found'
      break
    case 'auth/wrong-password':
      errMsg.value = 'Incorrect password'
      break
    default:
      errMsg.value = 'Email or password was incorrect'
      break
  }});
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    isLoggedIn.value = true
  } else {
    isLoggedIn.value = false
  }})

const signOut = () => {
  firebase.auth().signOut()
}

function isLoginView () {
  if(route.path == "/login") {
    return true;
  } else {
    return false;
  }
}

</script>

<template>
<div class="form">
  <div v-if="isLoginView() && !isLoggedIn" class="container" >
    <h1>Connexion</h1>
    <div class="input-container">
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Mot de passe" v-model="password" />
      <button @click="signIn">Connexion</button>
      <router-link class="nav-link" to="/register">S'inscrire</router-link>
    </div>
  </div>

  <div v-else-if="isLoginView() && isLoggedIn" class="container">
  <div class="input-container">
    <h1>Déconnexion</h1>
    <button @click="signOut" class="sign-out"> Déconnexion </button>
    </div>
  </div>

  <div class="container" v-else>
    <h1>Inscription</h1>
    <div class="input-container">
      <input type="text" placeholder="Prénom" v-model="firstName" />
      <input type="text" placeholder="Nom" v-model="lastName" />
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Mot de passe" v-model="password" />
      <button @click="signIn">S'inscrire</button>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.form{
  margin: 0 auto;
  width: 50%;
  & .container {
    text-align: center;
    width: 350px;
    margin: 0 auto;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #5c2088;
    box-shadow: 5px 20px 50px #000;
    & h1 {
      font-family: "bau-bold";
      color: white;
      padding: 10px;
      margin: 0;
    }
    & .input-container {
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
    }
  }
}
</style>
