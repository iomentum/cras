<script setup lang="ts">
import TableDays from '@/components/TableDays.vue';
import UserInputs from '@/components/UserInputs.vue';
import TheFooter from '@/components/TheFooter.vue';
import { Day, Holiday, WorkedDay } from '@/models/day';

console.log(new Date(2022,4,1));
console.log(new Holiday(new Date(2022,4,1)), new WorkedDay(new Date(2022,4,1)));
</script>

<template>
  <UserInputs />
  <TableDays />
  <div class="button">
    <router-link id="link" to="/Print">
      Valider
    </router-link>
  </div>
  <TheFooter />
</template>

<style scoped lang="scss">

.button {
  color: $main-color;
  margin: 0 auto;
  margin-top: 20px;
  width: 50%;
  text-align: center;
  & #link {
    background-color: #f1f1f1;
    padding: 5px 10px 5px 10px;
    border: 1px solid $main-color;
    border-radius: 5px;
    text-decoration: none;
    &:hover {
      background-color: $main-color;
      color: #f1f1f1;
    }
    &:visited {
      color:none;
    }
  }
}
</style>

