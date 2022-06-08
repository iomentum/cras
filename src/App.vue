<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onUpdated } from 'vue';
import TheHeader from '@/components/TheHeader.vue';
import { useDaysStore } from '@/stores/daysStore';
import { useUserStore } from '@/stores/userStore';
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';

const store = useDaysStore();
const userStore = useUserStore();
store.addDays();



onUpdated(() => {
  console.log('ici');
    const user = firebase.auth().currentUser;
    if(user) {
      userStore.getUserFromDB()
    }
  }
)



//Checkif user
// -> If Yes, and store User info empty, fetch
</script>

<template>
  <TheHeader />
  <router-view />
</template>

<style lang="scss">

#app {
  font-family: "bau-regular", sans-serif;
  font-size: 19px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #426485;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  margin: 0;
}

input {
  font-family: "bau-regular", Arial, Helvetica, sans-serif;
}

@font-face {
  font-family: "bau-regular";
  src: local("bau-regular"), url(./fonts/Bau/bau-regular.ttf) format("truetype");
}

@font-face {
  font-family: "Bau-Bold";
  src: local("Bau-Bold"), url(./fonts/Bau/Bau-Bold.otf) format("opentype");
}
</style>
