<script setup lang="ts">
import LogAndRegister from "@/components/LogAndRegister.vue";
import firebase from 'firebase/compat/app';
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false);

onMounted(() => {
  firebase.auth().onAuthStateChanged((user) => isLoggedIn.value = !!user)
})


</script>

<template>
  <LogAndRegister :userLoggedIn="isLoggedIn" />
</template>

<style scoped lang="scss">
</style>