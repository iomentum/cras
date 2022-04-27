<script setup lang="ts">
import SingleDay from '@/components/SingleDay.vue'
import { useDaysStore } from '@/stores/daysStore'
import { computed } from '@vue/reactivity';
import { Day } from '@/models/day';

const store = useDaysStore();
const daysList = computed(():Day[] | [] => {
  return store.getDays;
})

function toggleAllDays(evt: Event){
  const target = evt.target as HTMLInputElement
  store.toggleAllDays(target.checked)
}
const isAllDaysChecked = computed(():boolean => {
  return daysList.value
    .filter(day => day.date.getDay() != 6 && day.date.getDay() != 0)
    .every(day => day.workedDay.morning && day.workedDay.afternoon)
})
const path = window.location.pathname;
</script>

<template>
  <div class="table">
    <div class="left-column">
      <div :class="{ smallbox: path != '/Print' }">
        Jours
      </div>
      <div :class="{ bigbox: path != '/Print' }">
        Jours travaillés*
        <input
          v-if="path!='/Print'"
          type="checkbox"
          name="checkAllDay"
          :checked="isAllDaysChecked"
          @change="toggleAllDays"
        >
      </div>
      <div :class="{ smallbox: path != '/Print' }">
        Jours fériés*
      </div>
      <div :class="{ bigbox: path != '/Print' }">
        Congés payés*
      </div>
      <div :class="{ smallbox: path != '/Print' }">
        Nbre h supp
      </div>
    </div>
    <div class="days-container">
      <single-day
        v-for="day in daysList"
        :key="day.date.toString()"
        :day="day"
      />
    </div>
    <div class="right-column">
      <div :class="{ smallbox: path != '/Print' }">
        TOTAL
      </div>
      <div :class="{ bigbox: path != '/Print' }">
        {{ store.getWorkedDays }}
      </div>
      <div :class="{ smallbox: path != '/Print' }">
        {{ store.getHoliday }}
      </div>
      <div :class="{ bigbox: path != '/Print' }">
        {{ store.getVacationDay }}
      </div>
      <div :class="{ smallbox: path != '/Print' }">
        {{ store.getOvertime }}
      </div>
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
</style>
