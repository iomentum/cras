<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: 'bau-regular', sans-serif;
  font-size: 17px;
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
.bigbox {
  height: 26% !important
}
.smallbox {
  height: 16% !important
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
