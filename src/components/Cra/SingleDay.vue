<script setup lang="ts">
import { Day, WorkedDay, Holiday } from '@/models/day';
import { useDaysStore } from '@/stores/daysStore';
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';

const route = useRoute();
const store = useDaysStore();

// eslint-disable-next-line no-undef
const props = defineProps<{ day: WorkedDay | Day | Holiday }>();

const toggleHalfDay = (evt: Event) => {
  let target = evt.target as HTMLInputElement;
  if(props.day instanceof WorkedDay) {
    store.toggleHalfDay(props.day, target.checked, target.name);
  }
}

const isMainView = computed(() => {
  return route.path == "/"
})

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
  width: 45px;
  border: 1px solid $main-color;
  border-right: 0;
  color: $main-color;

  & p {
    font-family: "bau-regular", Arial, Helvetica, sans-serif;
  }

  & .total-worked-day {
    height: 59%;
  }

  & .checkboxes {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 15px;
    justify-content: space-around;
  }

  & div:nth-child(1) {
    height: 40%;
    border-bottom: 1px solid $main-color;
  }

  & .holiday {
    background-color: #edeaea;
    height: 59%;
  }
}
</style>