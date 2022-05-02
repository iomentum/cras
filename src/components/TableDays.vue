<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { Day, WorkedDay } from '@/models/day';
import SingleDay from '@/components/SingleDay.vue'
import { useDaysStore } from '@/stores/daysStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useDaysStore();
const daysList = computed(():Day[] | [] => store.getDays)

function toggleAllDays(evt: Event) {
  const target = evt.target as HTMLInputElement
  store.toggleAllDays(target.checked)
}

const isAllDaysChecked = computed(():boolean => {
  return store.getArrayOfDays
    .filter(day => day instanceof WorkedDay)
    .every(day => day.morning && day.afternoon);
})

function isMainView(){
  if(route.path == "/"){
    return true
  } else {
    return false
  }
}
</script>

<template>
  <div class="table-of-days">
    <div class="left-column">
      <div>Jours</div>
      <div>
        Jours travaillés
        <input
          v-if="isMainView()"
          type="checkbox"
          :checked="isAllDaysChecked"
          @change="toggleAllDays"
        >
      </div>
    </div>

    <div class="days-container">
      <SingleDay
        v-for="day in daysList"
        :key="day.date.getDay"
        :day="day"
      />
    </div>
    <div class="right-column">
      <div>TOTAL</div>
      <div><p>{{ store.getTotalWorked }}</p></div>
    </div>
  </div>
</template>

<style lang="scss">
.table-of-days {
  display: flex;
  text-align: center;
  height: 90px;
  margin: 0 auto;
  width: 90%;
  font-family: "bau-bold";
  color: black;
  & .left-column {
    border: 1px solid $main-color;
    font-family:'Bau-regular';
    border-right: none;
    & div:first-child {
      font-family: "bau-bold";
      border-bottom: 1px solid $main-color;
      height: 40%;
      color: $main-color;
    }
  }
  & .right-column {
    border: 1px solid $main-color;
    & div:nth-of-type(1) {
      border-bottom: 1px solid $main-color;
      height: 40%;
      background-color: $main-color;
      color: white;
      width: 80px;
    }
    & div:nth-of-type(2) {
      height: 59%;
    }

  }
  & .days-container{
    display: flex;
    flex-direction: row;
    & div {
      text-align: center;
    }
  }
  & .left-column{
    & div {
      width: 150px;
    }
  }
}
</style>