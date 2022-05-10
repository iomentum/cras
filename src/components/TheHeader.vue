<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const router = useRouter()
const user = firebase.auth().currentUser;
const isLoggedIn = ref(true)

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    isLoggedIn.value = true
  } else {
    isLoggedIn.value = false
  }
})

const signOut = () => {
  firebase.auth().signOut()
  router.push('/login')
}

</script>


<template>
  <div class="header">
    <div>
      <p>COMPTE RENDU D'ACTIVITÉ </p>
      <div v-if="isLoggedIn" class="user-infos">
        <button @click="signOut">Déconnexion</button>
      </div>
    </div>
    <img src="src\assets\IOmentum_Logo_White.png">

  </div>
</template>

<style scoped lang="scss">

.header {
  display: flex;
  height: 160px;
  background-color: $main-color;
  margin-bottom: 25px;
  & div {
    & p {
      &:first-child {
        font-family: "Bau-Bold", Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 55px 0 0 50px;
        font-size: 35px;
        color: white;
        min-width: 580px;
      }
    }
    & .user-infos {
        & button {
        margin: 20px 0 0 50px;
        font-family: "Bau-Bold", Arial, Helvetica, sans-serif;
        font-size: 20px;
        background-color: #00000000;
        border: none;
        color: beige;
        cursor: pointer;
        }
      }
  }
  & img {
    max-height: 80%;
    margin-top: 20px;
    margin-right: 50px;
    margin-left: auto;
  }
}
</style>