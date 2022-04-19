<script setup lang="ts">
import { ref } from 'vue'
import { Day } from '@/models/day'
import { computed } from '@vue/reactivity';


// eslint-disable-next-line no-undef
const props = defineProps<{ day: Day }>()

const isWeekEnd = computed(():boolean => {
  const dayNumber = props.day.date.getDay()
  return dayNumber === 6 || dayNumber === 0
})

</script>


<template>
  <div :class="[{ weekend: isWeekEnd }, 'day']">
    <div> {{ day.date.getDate() }} </div>
    <div class="checkbox">
      <input
        type="checkbox"
      >
      <input type="checkbox">
    </div>
    <div class="checkbox">
      <input type="checkbox">
    </div>
    <div class="checkbox">
      <input type="checkbox">
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

  &>* {
    padding: 5px;
    border: 1px solid #350756;
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