<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { Day, WorkedDay } from '@/models/day';
import SingleDay from '@/components/SingleDay.vue';
import { useDaysStore } from '@/stores/daysStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useDaysStore();
const daysList = computed(():Day[] | [] => store.getDays);

const toggleAllDays = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  store.toggleAllDays(target.checked);
};

const isAllDaysChecked = computed(():boolean => {
  const filteredDays: WorkedDay[] = daysList.value.filter((day):Boolean => day instanceof WorkedDay);
  const areAllDaysWorked = filteredDays.every(day => day.morning && day.afternoon);
  return areAllDaysWorked
});

const isMainView = () => route.path == "/"

</script>

<template>
  <div class="table-of-days">
    <div class="left-column">
      <div>Jours</div>
      <div v-if="isMainView()">
        Jours travaillés
        <input
          type="checkbox"
          v-model="isAllDaysChecked"
          @change="toggleAllDays"
        >
      </div>
      <div v-else>
        <p>Jours travaillés</p>
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
  z-index: 3;
  display: flex;
  text-align: center;
  height: 90px;
  margin: 0 auto;
  width: 90%;
  font-family: "bau-bold", Arial, Helvetica, sans-serif;
  color: black;

  & .days-container {
    display: flex;
    flex-direction: row;

    & div {
      text-align: center;
    }
  }

  & .left-column {
    border: 1px solid $main-color;
    font-family: "Bau-regular", Arial, Helvetica, sans-serif;
    border-right: 0;

    & div {
      width: 150px;
    }

    & div:first-child {
      font-family: "bau-bold", Arial, Helvetica, sans-serif;
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
}
</style>
