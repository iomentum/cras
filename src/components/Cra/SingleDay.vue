<script setup lang="ts">
import { Day, WorkedDay, Holiday } from '@/models/day';
import { useDaysStore } from '@/stores/daysStore';
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';
import { defineProps } from 'vue';

const route = useRoute();
const store = useDaysStore();

const props = defineProps<{ day: WorkedDay | Day | Holiday }>();


const toggleHalfDay = (evt: Event) => {
  let target = evt.target as HTMLInputElement;
  if (props.day instanceof WorkedDay) {
    store.toggleHalfDay(props.day, target.checked, target.name);
  }
};

const isMainView = computed(() => {
  return route.path == "/";
});

</script>

<template>
  <div
    v-if="isMainView"
    class="day"
  >
    <div>{{ props.day.getDayDate().getDate() }}</div>
    <div
      v-if="(day instanceof WorkedDay)"
      class="checkboxes"
    >
      <!-- <md-checkbox v-model="morning">
        Boolean
      </md-checkbox> -->

      <input
        type="checkbox"
        name="morning"
        :checked="day.morning"
        @change="toggleHalfDay"
      >
      <input
        type="checkbox"
        name="afternoon"
        :checked="day.afternoon"
        @change="toggleHalfDay"
      >
    </div>
    <div
      v-else
      class="holiday"
    />
  </div>
  <div
    v-else
    class="day"
  >
    <div>{{ props.day.getDayDate().getDate() }}</div>
    <div
      v-if="(day instanceof WorkedDay)"
      class="total-worked-day"
    >
      <p>{{ props.day.totalWorked() }}</p>
    </div>
    <div
      v-else
      class="holiday"
    />
  </div>
</template>

<style scoped lang="scss">
.day {
  display: flex;
  flex-direction: column;
  border: 1px solid $main-color;
  border-right: 0;
  color: $main-color;

  & p {
    font-family: "bau-regular", Arial, Helvetica, sans-serif;
  }

  & .total-worked-day {
  }

  & .checkboxes {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 0;
    justify-content: space-around;
  }

  & div:nth-child(1) {
    padding: 5px 4px;
    min-width: 20px;
    font-size: 1rem;
    border-bottom: 1px solid $main-color;
  }

  & .holiday {
    background-color: #edeaea;
    height: 100%;
  }
}
</style>