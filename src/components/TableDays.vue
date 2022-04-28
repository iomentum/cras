<script setup lang="ts">
import SingleDay from '@/components/SingleDay.vue'
import { useDaysStore } from '@/stores/daysStore'
import { computed } from '@vue/reactivity';
import { Day } from '@/models/day';
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useDaysStore();

const daysList = computed(():Day[] | [] => store.getDays)

function toggleAllDays(evt: Event){
  const target = evt.target as HTMLInputElement
  store.toggleAllDays(target.checked)
}

const isAllDaysChecked = computed(():boolean => {
  return daysList.value
    .filter(day => day.date.getDay() != 6 && day.date.getDay() != 0)
    .every(day => day.workedDay.morning && day.workedDay.afternoon)
})

const isPrintView = computed(():boolean =>{
  if (route.name == 'PrintView') {
    return true
  }else{
    return false
  }
})
</script>

<template>
  <div :class="[{ ismainview: !isPrintView}, 'table']">
    <div class="left-column">
      <div>Jours</div>
      <div>
        Jours travaillés*
        <input
          v-if="!isPrintView"
          type="checkbox"
          name="checkAllDay"
          :checked="isAllDaysChecked"
          @change="toggleAllDays"
        >
      </div>
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
      <div>{{ store.getWorkedDays }}</div>
      <div>{{ store.getHoliday }}</div>
      <div>{{ store.getVacationDay }}</div>
      <div>{{ store.getOvertime }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table {
  display: flex;
  text-align: center;
  color: #350756;
  margin: 0 auto;
  width: 80%;
  & .left-column {
    display: flex;
    flex-direction: column;
    & div {
      padding: 5px;
      border: 1px solid $main-color;
      width: 150px;
      box-sizing: border-box;
      height: 20%;
    }
    & :first-child {
      font-weight: bold;
    }
  }
  & .right-column {
    display: flex;
    flex-direction: column;
  & div {
      padding: 5px;
      border: 1px solid $main-color;
      box-sizing: border-box;
      height: 20%;
    }
    & :first-child {
      background-color: $main-color;
      font-weight: bold;
      color: white;
    }
  }
  .days-container {
    display: flex;
    flex-direction: row;
  }
}
.ismainview .left-column,.ismainview .right-column{
  & div{
    &:nth-child(2n+1){
      height: 16%;
    }
    &:nth-child(2n){
      height: 26%;
    }
  }
}
</style>
