<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import { useDaysStore } from '@/stores/daysStore'

const store = useDaysStore();
store.addDays()

</script>

<template>
  <TheHeader />
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: 'bau-regular', sans-serif;
  font-size: 19px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #426485;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
body{
  margin:0;
}
input{
  font-family: "bau-regular";
}

@font-face {
  font-family: "bau-regular";
  src: local("bau-regular"),
   url(./fonts/Bau/bau-regular.ttf) format("truetype");
}
@font-face {
  font-family: "Bau-Bold";
  src: local("Bau-Bold"),
   url(./fonts/Bau/Bau-Bold.otf) format("opentype");
}
</style>
