<script setup lang="ts">
import TableDays from '@/components/TableDays.vue'
import UserInputs from '@/components/UserInputs.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <UserInputs />
  <TableDays />
  <div class="button">
    <router-link to="/Print">
      Valider
    </router-link>
  </div>
  <TheFooter />
</template>

<style scoped lang="scss">
  .button{
    color: $main-color;
    margin:0 auto;
    margin-top: 20px;
    width: 50%;
    text-align: center;
  }
</style>

