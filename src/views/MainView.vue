<script setup lang="ts">
import TableDays from '@/components/TableDays.vue';
import UserInputs from '@/components/UserInputs.vue';
import TheFooter from '@/components/TheFooter.vue';
import CostsAndComments from '@/components/CostsComments/CostsAndComments.vue';
import 'firebase/compat/auth';
import { useDaysStore } from '@/stores/daysStore';
import { sendCraToDB } from '@/firebaseutils/firestore';

const dayStore = useDaysStore();

</script>

<template>
  <UserInputs />
  <TableDays v-if="!dayStore.signed"/>
  <CostsAndComments v-if="!dayStore.signed"/>
  <div class="button">
    <router-link v-if="!dayStore.signed" @click="sendCraToDB()" class="link" to="/Print">
      Valider
    </router-link>
  </div>
  <div v-if="dayStore.signed">
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
