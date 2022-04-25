<script setup lang="ts">
import SingleDay from '@/components/SingleDay.vue'
import { useDaysStore } from '@/stores/daysStore'
import { computed } from '@vue/reactivity';

const store = useDaysStore();
const daysList = store.getDays;

function toggleAllDays(evt: Event){
  const target = evt.target as HTMLInputElement
  store.toggleAllDays(target.checked)
}

const isAllDaysChecked = computed(():boolean => {
  return daysList
    .filter(day => day.date.getDay() != 6 && day.date.getDay() != 0)
    .every(day => day.workedDay.morning && day.workedDay.afternoon)
})
/* const isAllDaysChecked = computed(():boolean => {
  return daysList.every(day => {
    const isWorked = day.workedDay.morning && day.workedDay.afternoon
    const isWeekEnd = day.date.getDay() == 6 && day.date.getDay() == 0
    console.log(isWorked, isWeekEnd);

    return isWorked && isWeekEnd
  })
}) */





/* const isAllDaysChecked = computed(():boolean => {
  let morningCount = 0
  let afternoonCount = 0
  let openDays = 0
  daysList.forEach(day => {
    if (day.workedDay.morning) morningCount++
    if (day.workedDay.afternoon) afternoonCount++
    if (day.date.getDay() != 0 && day.date.getDay() != 6) openDays++
  })

  if (morningCount == openDays && afternoonCount == openDays) {
    return true
  } else {
    return false
  }
}); */

</script>

<template>
  <div class="table">
    <div class="left-column">
      <div>Jours</div>
      <div>
        Jours travaillés*
        <input
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
      flex: 1;
      padding: 5px;
      border: 1px solid #350756;
      width: 85px;
      text-align: center;
      &:nth-of-type(1){
        flex: 0.6;
      }
      &:nth-of-type(2) {
        flex: 1.5;
      }
      &:nth-of-type(3) {
        flex: 0.75;
      }
      &:nth-of-type(4) {
        flex: 1.5;
      }
      &:nth-of-type(5) {
        flex: 0.7;
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
        flex: 0.6;
      }
      &:nth-of-type(2) {
        flex: 1.5;
      }
      &:nth-of-type(3) {
        flex: 0.75;
      }
      &:nth-of-type(4) {
        flex: 1.5;
      }
      &:nth-of-type(5) {
        flex: 0.7;
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
