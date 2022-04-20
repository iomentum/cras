<script setup lang="ts">
import { ref } from 'vue'
import { Day } from '@/models/day'
import { computed } from '@vue/reactivity';

const props = defineProps<{ day: Day }>()

const isWeekEnd = computed(():boolean => {
  const dayNumber = props.day.date.getDay()
  return dayNumber === 6 || dayNumber === 0
})


const count = ref(0)
</script>


<template>
  <div :class="[{ weekend: isWeekEnd }, 'day']">
    <div> {{ day.date.getDate() }} </div>
    <div class="checkbox"><input type="checkbox"></div>
    <div class="checkbox"><input type="checkbox"></div>
    <div class="checkbox"><input type="checkbox"></div>
    <div class="input-overtime"><input type="number" max="3" value="0"></div>
  </div>

</template>

<style scoped lang="scss">

.weekend{
  
  background-color: rgb(195, 180, 180);
}
.day {
  display: flex;
  flex-direction: column;
  width: 38px;
  text-align: center;

  &>* {
    padding: 5px;
    border: 1px solid #350756;
    height: 25px;
  }

  & :first-child {
    font-weight: bold;
  }

  & .input-overtime {
    text-align: center;

    & input {
      width: 100%;
      -moz-appearance: textfield;
      text-align: center;
    }
  }
}

.input-overtime input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>