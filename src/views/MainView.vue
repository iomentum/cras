<script setup lang="ts">
import TableDays from '@/components/TableDays.vue'
import UserInputs from '@/components/UserInputs.vue';
</script>

<template>
  <UserInputs />
  <TableDays />
  <router-link to="/Print">
    Valider
  </router-link>
</template>
