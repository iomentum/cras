<script setup lang="ts">
import SingleDay from '@/components/SingleDay.vue'
import { useDaysStore } from '@/stores/daysStore'

const store = useDaysStore();
const daysList = store.getDays;

</script>

<template>
  <div class="table">
    <div class="left-column">
      <div>Jours</div>
      <div>Jours travaillés*</div>
      <div>Jours fériés*</div>
      <div>Congés payés*</div>
      <div>Nbre h supp</div>
    </div>
    <div class="days-container">
      <single-day
        v-for="day in daysList"
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
  width: 80%;


  & .left-column {
    display: flex;
    flex-direction: column;
    & div {
      flex: 1;
      padding: 5px;
      border: 1px solid #350756;
      width: 85px;
      text-align: center;
      &:nth-of-type(1){
        flex: 0.7;
      }
      &:nth-of-type(2) {
        flex: 2;
      }
      &:nth-of-type(5) {
        flex: 0.9;
      }
    }

    & :first-child {
      font-weight: bold;
    }

  }

  & .right-column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & div {
      flex: 1;
      padding: 5px;
      border: 1px solid $main-color;
      &:nth-of-type(1){
        flex: 0.7;
      }
      &:nth-of-type(2) {
        flex: 2;
      }
      &:nth-of-type(5) {
        flex: 0.9;
      }
    }

    & :first-child {
      background-color: $main-color;
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
