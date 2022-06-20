<script setup lang="ts">
import router from '@/router';
import { getCra } from '@/expressutils/cras';

const props = defineProps<{ month: string, signed: boolean }>();

const getThisCra = async () => {
  await getCra(props.month);
  props.signed ? router.push('/Print'):router.push('/');
}

</script>

<template>
<div class="cras-button-container">
  <div class="button" :id="month">
    <div class="month">{{ month }}</div>
    <div class="status" v-if="!signed">Brouillon <button @click="getThisCra()">Editer</button></div>
    <div class="status" v-if="signed">Signé <button @click="getThisCra()">Voir le cra</button></div>
  </div>
</div>
</template>

<style scoped lang="scss">
.cras-button-container {
  width: 100%;
  & .button {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 10px;
    width: 70%;
    height: 40px;
    min-width: 330px;
    margin-bottom: 5px;
    & div {
      margin: 0 auto;
      &.month{
        flex: 1;
      }
      &.status{
        flex: 1;
      }
    }
  }
}
</style>
