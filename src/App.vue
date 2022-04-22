<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TableDays from '@/components/TableDays.vue'
import { useDaysStore } from './stores/daysStore'




</script>

<template>
  <TableDays />
</template>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #426485;
  margin-top: 60px;
  margin: 0 auto;
}
</style>