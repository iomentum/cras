<script setup lang="ts">
import TableDays from '@/components/Cra/TableDays.vue';
import UserInputs from '@/components/User/UserInputs.vue';
import TheFooter from '@/components/HeaderFooter/TheFooter.vue';
import CostsAndComments from '@/components/CostsComments/CostsAndComments.vue';
import { useDaysStore } from '@/stores/daysStore';
import { createOrUpdateCraDB } from '@/services/cras'

const daysStore = useDaysStore();

</script>

<template>
  <UserInputs />
  <TableDays v-if="!daysStore.signed"/>
  <CostsAndComments v-if="!daysStore.signed"/>
  <div class="button">
    <router-link v-if="!daysStore.signed" @click="createOrUpdateCraDB" class="link" to="/Print">
      Valider
    </router-link>
  </div>
  <div v-if="daysStore.signed">
    <h1 class="warn">Ce cra est déjà signé, vous ne pouvez plus le modifier</h1>
    <div class="button">
      <router-link class="link" to="/Print">Voir le cra</router-link>
    </div>
  </div>
  <TheFooter />
</template>

<style scoped lang="scss">
.warn {
  color: $main-color;
  margin: 0 auto;
  width: 50%;
}
.button {
  color: $main-color;
  margin: 0 auto;
  margin-top: 20px;
  width: 50%;
  text-align: center;
  & .link {
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
