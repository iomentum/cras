<script setup lang="ts">
import { Day } from '@/models/day'
import { useDaysStore } from '@/stores/daysStore'
import { isWeekend } from '@/utils/utils';
import { useRoute } from 'vue-router'

// eslint-disable-next-line no-undef
const props = defineProps<{ day: Day }>()
const route = useRoute()
const store = useDaysStore();
const thisDay = props.day.date.getDate()-1

function isMainView(){
  if(route.name == 'Home'){
    return true
  } else {
    return false
  }
}

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
</script>

<template>
  <div :class="[{ weekend: isWeekend(day) },{ mainview: isMainView()},'day']">
    <div>
      {{ day.date.getDate() }}
    </div>
    <div v-if="!isWeekend(day) && isMainView()">
      <input
        type="checkbox"
        name="morning"
        :checked="day.workedDay.morning"
        @change="toggle"
      >
      <input
        type="checkbox"
        name="afternoon"
        :checked="day.workedDay.afternoon"
        @change="toggle"
      >
    </div>
    <div v-else>
      <input
        v-if="!isWeekend(day) && counter('workedDay')!=0"
        type="text"
        :value="counter('workedDay')"
        disabled="true"
      >
    </div>
    <div v-if="!isWeekend(day) && isMainView()">
      <input
        type="checkbox"
        name="holiday"
        :checked="day.holiday"
        @change="toggle"
      >
    </div>
    <div v-else>
      <input
        v-if="counter('holiday') != 0"
        type="text"
        name="holiday"
        :value="counter('holiday')"
        disabled="true"
      >
    </div>
    <div v-if="!isWeekend(day) && isMainView()">
      <input
        type="checkbox"
        name="vacationDayMorning"
        :checked="day.vacationDay.morning"
        @change="toggle"
      >
      <input
        type="checkbox"
        name="vacationDayAfternoon"
        :checked="day.vacationDay.afternoon"
        @change="toggle"
      >
    </div>
    <div v-else>
      <input
        v-if="counter('vacationDay') != 0"
        type="text"
        :value="counter('vacationDay')"
        disabled="true"
      >
    </div>
    <div
      v-if="!isWeekend(day) && isMainView()"
      class="input-overtime"
    >
      <input
        type="number"
        :value="day.overTime"
        @change="changeOvertime"
      >
    </div>
    <div
      v-else
      class="input-overtime"
    >
      <input
        v-if="day.overTime != 0"
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
.mainview div{
  &:nth-child(2n+1){
    height: 16%;
  }
  &:nth-child(2n){
    height: 26%;
  }
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