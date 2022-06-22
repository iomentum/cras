<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { signUp } from '@/services/auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const customer = ref('');

const userStore = useUserStore();
const errorMsg = computed(() => {
  return userStore.errorMsg
})

const register = async () => {
  await signUp(
    email.value,
    password.value,
    firstName.value,
    lastName.value,
    customer.value
  );
  if(userStore.user.isLogged)router.push('/')
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