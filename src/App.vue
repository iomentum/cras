<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TableDays from '@/components/TableDays.vue'
import HeaderBand from './components/headerBand.vue';

</script>

<template>
  <HeaderBand />
  <TableDays />
</template>

<style lang="scss">
#app {
  font-family: 'bau-regular', sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #426485;
  margin: 0 auto;
}
body{
  margin:0;
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