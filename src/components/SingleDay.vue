<script setup lang="ts">
import { ref, watch } from 'vue'
import { Day } from '@/models/day'
import { computed } from '@vue/reactivity';
import { useDaysStore } from '@/stores/daysStore'
import { switchCase } from '@babel/types';
const store = useDaysStore();

// eslint-disable-next-line no-undef
const props = defineProps<{ day: Day }>()

const isWeekEnd = computed(():boolean => {
  const dayNumber:number = props.day.date.getDay()
  return dayNumber === 6 || dayNumber === 0
});

const thisDayInStore = store.arrayOfDays[props.day.date.getDate()-1]

function toggle(evt: Event){
  const target = evt.target as HTMLInputElement
  store.changeDayProps(props.day.date.getDate()-1, target.name)
}


</script>

<template>
  <div :class="[{ weekend: isWeekEnd }, 'day']">
    <div> {{ day.date.getDate() }} </div>
    <div>
      <input
        type="checkbox"
        name="morning"
        :checked="thisDayInStore.workedDay.morning"
        @change="toggle"
      >
      <input
        type="checkbox"
        name="afternoon"
        :checked="thisDayInStore.workedDay.afternoon"
        @change="toggle"
      >
    </div>
    <div>
      <input
        type="checkbox"
        name="holiday"
        :checked="thisDayInStore.holiday"
        @change="toggle"
      >
    </div>
    <div>
      <input
        type="checkbox"
        name="vacationDay"
        :checked="thisDayInStore.vacationDay"
        @change="toggle"
      >
    </div>
    <div class="input-overtime">
      <input
        type="number"
        value="0"
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