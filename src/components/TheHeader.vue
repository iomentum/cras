<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { userSignOut, userSignIn } from '@/firebaseauth/user';
import { computed } from '@vue/reactivity';

const router = useRouter()
const user = firebase.auth().currentUser;
const isLoggedIn = ref(false)

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    isLoggedIn.value = true
  } else {
    isLoggedIn.value = false
  }
})

const signOut = () => {
  userSignOut()
  router.push('/login')
}
</script>


<template>
  <div class="header">
    <div>
      <p>COMPTE RENDU D'ACTIVITÉ </p>
      <div v-if="isLoggedIn" class="user-infos">

        <div class="dropdown-menu"></div>
          <div class="dropdown-menu-button">
            <div>H</div>
          </div>

          <div class="dropdown-menu-popper">
            <button @click="signOut">Déconnexion</button>
          </div>
        </div>
        <!--       <div v-else>
        <div>Se connecter</div>
        </div> -->
    </div>
    <img src="src\assets\IOmentum_Logo_White.png">
  </div>
</template>

<style scoped lang="scss">
.dropdown-menu-button {
  display: inline-flex;
  background-color: #fbf5f3;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-family: "bau-bold";
  color: black;
  align-items: center;
  margin-left: 50px;
  margin-top: 5px;
  padding-left: 0px;
  cursor: pointer;
  & div:first-child {
    margin-left: 11px;
  }
  &:hover + .dropdown-menu-popper{
    height: 100px;
    border: 1px solid $main-color;
  }
}
.dropdown-menu-popper {
  display: flex;
  flex-direction: column-reverse;
  margin-top: 5px;
  background-color: white;
  margin-left: 50px;
  width: 120px;
  height: 0px;
  overflow: hidden;
  transition: 100ms ;
  border: 1px solid $main-color;
  border-radius: 5px;
  transition-delay: 150ms;
  &:hover {
    height: 100px;
    border: 1px solid $main-color;
  }
}

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
        width: 100%;
        font-family: "bau-regular", Arial, Helvetica, sans-serif;
        font-size: 15px;
        background-color: #00000000;
        border: none;
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