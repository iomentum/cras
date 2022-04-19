<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { generateDays } from '@/utils/generateDays'
import SingleDay from '@/components/SingleDay.vue'

const dayData = ref(generateDays(0));

</script>

<template>
  <div class="table">
    <div class="left-column">
      <div>Jours</div>
      <div>Jours&nbsp;travaillés*</div>
      <div>Jours&nbsp;Fériés*</div>
      <div>Congés&nbsp;payés*</div>
      <div>Nbre&nbsp;h&nbsp;supp</div>
    </div>
    <div class="days-container">
      <single-day
        v-for="day in dayData"
        :key="day.date.toString()"
        :day="day"
      />
    </div>

    <div class="right-column">
      <div>TOTAL</div>
      <div>0</div>
      <div>0</div>
      <div>0</div>
      <div>0</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table {
  display: flex;
  flex-direction: row;
  text-align: center;
  width: 38px;
  text-align: center;
  color: #350756;
  margin: 0 auto;
  width: 78%;


  & .left-column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & div {
      flex-shrink: 1;
      padding: 5px;
      border: 1px solid #350756;
      font-weight: bold;
    }

    & :first-child {
      font-weight: bold;
    }

    & div:nth-of-type(2) {
      flex-grow: 1.4;
    }

  }

  & .right-column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & div {
      flex-grow: 1;
      padding: 5px;
      border: 1px solid #350756;
    }

    & :first-child {
      background-color: #350756;
      font-weight: bold;
      color: white;
      height: 19.2px;
    }

    & div:nth-of-type(2){
      height: 39px;
    }
  }

  .days-container {
    display: flex;
    flex-direction: row;
  }
}
</style>
