<script setup lang="ts">
import LogAndRegister from "@/components/LoginRegister/LogAndRegister.vue";
import { ref } from 'vue'

const isLoggedIn = ref(false);

</script>

<template>
  <LogAndRegister :userLoggedIn="isLoggedIn" />
</template>

<style scoped lang="scss">
</style>