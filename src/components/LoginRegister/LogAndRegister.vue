<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore';
import Login from '@/components/LoginRegister/Login.vue';
import Register from '@/components//LoginRegister/Register.vue';
import TheFooter from '@/components/HeaderFooter/TheFooter.vue';

const store = useUserStore();
const login = ref(false);

const signOut = () => {
  store.resetUserStore()
}
</script>

<template>
<div class="form-container" v-if="!store.user.isLogged">
  <div class="form">
    <div class="container" v-if="!login">
      <Login />
      <a href="#" @click.prevent="login = !login">No Account ? Register</a>
    </div>

    <div class="container" v-else>
      <Register />
      <a href="#" @click.prevent="login = !login">Already have an account ? Login</a>
    </div>
  </div>
</div>

<div v-else class="sign-out">
  <h1>Déconnexion</h1>
  <button @click="signOut()"> Déconnexion </button>
</div>
<TheFooter />
</template>

<style scoped lang="scss">
.sign-out {
  font-family: "bau-bold";
  width: 30%;
  margin: 0 auto;
  border-radius: 15px;
  text-align: center;
  background-color: #5c2088;
  color: white;
  padding-bottom: 10px;
  & h1 {
    padding: 10px;
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
    &:hover{
      background: white;
      color: $main-color;
    }
  }
}
.form {
  margin: 0 auto;
  width: 50%;
  & .container {
    text-align: center;
    width: 350px;
    padding-bottom: 10px;
    margin: 0 auto;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #5c2088;
    & .input-container {
      text-align: center;
      background-color: #5c2088;
    }
    & a {
      color: white;
    }
  }
}
</style>
