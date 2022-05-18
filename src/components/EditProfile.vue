<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import firebase from 'firebase/compat/app';
import { ref } from 'vue'

const store = useUserStore();
const user = firebase.auth().currentUser;
const isLoggedIn = ref(false)
const firstName = ref(store.user.firstName)
const lastName = ref(store.user.lastName)
const customer = ref(store.user.customer)
const userEmail = store.user.email
const userId = store.user.uid

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    isLoggedIn.value = true
  } else {
    isLoggedIn.value = false
  }
})

function changeUserInfos(){
  store.setUserInfos(firstName.value,lastName.value,customer.value,userEmail,userId)
  store.setDatabaseDoc()
}

</script>

<template>
<h1>Profile</h1>
<div class="container">
  <label for="Nom">Nom</label>
  <input type="text" name="Nom" :placeholder="store.user.firstName" v-model="firstName">
  <label for="Prenom">Prénom</label>
  <input type="text" name="Prenom" :placeholder="store.user.lastName" v-model="lastName">
  <label for="Client">Client</label>
  <input type="text" name="Client" :placeholder="store.user.customer" v-model="customer">
  <button @click="changeUserInfos()">Save</button>
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
  }
}
</style>