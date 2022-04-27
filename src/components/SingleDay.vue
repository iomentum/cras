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

function counter(prop:string){
  let count = 0
  switch(prop){
    case "workedDay":{
      if (props.day.workedDay.morning) count+=0.5
      if (props.day.workedDay.afternoon) count+=0.5
      return count
    }
    case "vacationDay":{
      if (props.day.vacationDay.morning) count+=0.5
      if (props.day.vacationDay.afternoon) count+=0.5
      return count
    }
    case "holiday":{
      if (props.day.holiday) count = 1
      else count = 0
      return count
    }
  }
}
const path = window.location.pathname

</script>

<template>
  <div :class="[{ weekend: isWeekEnd },'day']">
    <div :class="{ smallbox: path != '/Print' }">
      {{ day.date.getDate() }}
    </div>
    <div :class="{ bigbox: path != '/Print' }">
      <input
        v-if="!isWeekEnd && path!='/Print'"
        type="checkbox"
        name="morning"
        :checked="day.workedDay.morning"
        @change="toggle"
      >
      <input
        v-if="!isWeekEnd && path!='/Print'"
        type="checkbox"
        name="afternoon"
        :checked="day.workedDay.afternoon"
        @change="toggle"
      >
      <input
        v-else-if="!isWeekEnd && path=='/Print' && counter('workedDay')!=0"
        type="text"
        :value="counter('workedDay')"
        disabled="true"
      >
    </div>
    <div :class="{ smallbox: path != '/Print' }">
      <input
        v-if="!isWeekEnd && path!='/Print'"
        type="checkbox"
        name="holiday"
        :checked="day.holiday"
        @change="toggle"
      >
      <input
        v-else-if="!isWeekEnd && path=='/Print' && counter('holiday') != 0"
        type="text"
        name="holiday"
        :value="counter('holiday')"
        disabled="true"
      >
    </div>
    <div :class="{ bigbox: path != '/Print' }">
      <input
        v-if="!isWeekEnd && path!='/Print'"
        type="checkbox"
        name="vacationDayMorning"
        :checked="day.vacationDay.morning"
        @change="toggle"
      >
      <input
        v-if="!isWeekEnd && path!='/Print'"
        type="checkbox"
        name="vacationDayAfternoon"
        :checked="day.vacationDay.afternoon"
        @change="toggle"
      >
      <input
        v-else-if="!isWeekEnd && path=='/Print' && counter('vacationDay') != 0"
        type="text"
        :value="counter('vacationDay')"
        disabled="true"
      >
    </div>
    <div :class="[{ smallbox: path != '/Print' },'input-overtime']">
      <input
        v-if="!isWeekEnd && path!='/Print'"
        type="number"
        :value="day.overTime"
        @change="changeOvertime"
      >
      <input
        v-else-if="!isWeekEnd && path=='/Print' && day.overTime != 0"
        :value="day.overTime"
        disabled="true"
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
  font-family: "bau-regular";
  & > div {
    padding: 5px;
    border: 1px solid $main-color;
    box-sizing: border-box;
    height: 20%;
    & input[type=text]{
      border: none;
      width: 100%;
      -moz-appearance: textfield;
      text-align: center;
      background-color : #ffffff00;
    }
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
.input input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  padding: 0;
}
.input[type=text] input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  padding: 0;
}
</style>