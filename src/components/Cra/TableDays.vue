<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { Day, WorkedDay } from '@/models/day';
import SingleDay from '@/components/Cra/SingleDay.vue';
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
  const filteredDays: WorkedDay[] = daysList.value.filter((day):boolean => day instanceof WorkedDay) as WorkedDay[];
  const areAllDaysWorked = filteredDays.every(day => day.morning && day.afternoon);

  return areAllDaysWorked;
});

const isMainView = computed(() => {
  return route.path == "/";
});

</script>

<template>
  <div class="table-of-days">
    <div class="left-column">
      <div>Jours</div>
      <div v-if="isMainView">
        <p>
          Jours travaillés <br>
          <input
            v-model="isAllDaysChecked"
            type="checkbox"
            @change="toggleAllDays"
          >
        </p>
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
  font-size: 1rem;
  z-index: 3;
  display: flex;
  text-align: center;
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

    & p {
      margin: 0 5px;
    }

    & div:first-child {
      font-family: "bau-bold", Arial, Helvetica, sans-serif;
      border-bottom: 1px solid $main-color;
      padding: 5px 4px;
      min-width: 20px;
      font-size: 1rem;
      color: $main-color;
    }

  }

  & .right-column {
    border: 1px solid $main-color;

    & div:nth-of-type(1) {
      padding: 5px 4px;
      font-size: 1rem;
      border-bottom: 1px solid $main-color;
      background-color: $main-color;
      color: white;
    }
  }
}
</style>
