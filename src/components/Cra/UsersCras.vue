<script setup lang="ts">
import { ref } from 'vue';
import CraButton from '@/components/Cra/CraButton.vue';
import { getCrasList } from "@/services/cras";
import TheFooter from '@/components/HeaderFooter/TheFooter.vue';

const cras = ref<any[]>([]);

const getCras = async () => {
  cras.value = await getCrasList();
};

getCras();

</script>

<template>
  <div class="container">
    <h1>Mes cras</h1>
    <CraButton
      v-for="cra in cras"
      :key="cra.yearmonth"
      :month="cra.yearmonth"
      :signed="cra.status"
    />
  </div>
  <TheFooter />
</template>

<style scoped lang="scss">
.container{
  margin: 0 auto;
  width: 50%;
  text-align: center;

  & h1 {
    font-family: 'Bau-regular';
    color: black;
  }
  & p {
    margin: 0 auto;
    width: 100%;
  }
}
</style>
