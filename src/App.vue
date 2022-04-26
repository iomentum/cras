<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TableDays from '@/components/TableDays.vue'
import TheHeader from './components/TheHeader.vue';

</script>

<template>
  <TheHeader />
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

.table{
  & .left-column, .right-column, .days-container>.day{
    & div{
      &:nth-of-type(1){
        flex: 0.6;
      }
      &:nth-of-type(2) {
        flex: 1.5;
      }
      &:nth-of-type(3) {
        flex: 0.75;
      }
      &:nth-of-type(4) {
        flex: 1.5;
      }
      &:nth-of-type(5) {
        flex: 0.7;
      }
    }
  }
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