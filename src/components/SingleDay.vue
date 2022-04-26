<script setup lang="ts">
import { Day } from '@/models/day'
import { computed } from '@vue/reactivity';
import { useDaysStore } from '@/stores/daysStore'
const store = useDaysStore();

// eslint-disable-next-line no-undef
const props = defineProps<{ day: Day }>()

const isWeekEnd = computed(():boolean => {
  const dayNumber:number = props.day.date.getDay()
  return dayNumber === 6 || dayNumber === 0
});

const thisDay = props.day.date.getDate()-1

function toggle(event: Event){
  const target = event.target as HTMLInputElement
  store.changeDayProps(thisDay, target.name)
}
function changeOvertime(event: Event){
  const target = event.target as HTMLInputElement
  store.changeOvertime(thisDay, parseInt(target.value))
}


</script>

<template>
  <div :class="[{ weekend: isWeekEnd }, 'day']">
    <div> {{ day.date.getDate() }} </div>
    <div>
      <input
        v-if="!isWeekEnd"
        type="checkbox"
        name="morning"
        :checked="day.workedDay.morning"
        @change="toggle"
      >
      <input
        v-if="!isWeekEnd"
        type="checkbox"
        name="afternoon"
        :checked="day.workedDay.afternoon"
        @change="toggle"
      >
    </div>
    <div>
      <input
        v-if="!isWeekEnd"
        type="checkbox"
        name="holiday"
        :checked="day.holiday"
        @change="toggle"
      >
    </div>
    <div>
      <input
        v-if="!isWeekEnd"
        type="checkbox"
        name="vacationDayMorning"
        :checked="day.vacationDay.morning"
        @change="toggle"
      >
      <input
        v-if="!isWeekEnd"
        type="checkbox"
        name="vacationDayAfternoon"
        :checked="day.vacationDay.afternoon"
        @change="toggle"
      >
    </div>
    <div class="input-overtime">
      <input
        v-if="!isWeekEnd"
        type="number"
        :value="day.overTime"
        @change="changeOvertime"
      >
    </div>
  </div>
</template>

<style scoped lang="scss">

.weekend{
  background-color: #EDEAEA;
}
.day {
  display: flex;
  flex-direction: column;
  width: 38px;
  text-align: center;
  & > * {
    padding: 5px;
    border: 1px solid $main-color;
  }

  & :first-child {
    font-weight: bold;
    background-color: white;
  }

  & .input-overtime {
    text-align: center;

    & input {
      border: none;
      width: 100%;
      -moz-appearance: textfield;
      text-align: center;
      background-color : #ffffff00;
    }
  }
}

.input-overtime input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>