<script setup lang="ts">
import { Day, WorkedDay, Holiday } from '@/models/day';
import { useDaysStore } from '@/stores/daysStore';
import { useRoute } from 'vue-router';
import { computed, ref } from '@vue/reactivity';
import { defineProps } from 'vue';
import { NCheckbox } from 'naive-ui';

const route = useRoute();
const store = useDaysStore();

const props = defineProps<{ day: WorkedDay | Day | Holiday }>();

const morning = ref(props.day.morning || false);

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
      <n-checkbox
        v-model:checked="day.morning"
        name="morning"
        size="small"
        @change="toggleHalfDay"
      />
      <n-checkbox
        v-model:checked="day.afternoon"
        name="afternoon"
        size="small"
        @change="toggleHalfDay"
      />

      <!-- <input
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
      > -->
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
.table-of-days .days-container div {
    display: flex;
    justify-content: center;
}
.day {
  display: flex;
  flex-direction: column;
  border: 1px solid $main-color;
  border-right: 0;
  color: $main-color;

  & p {
    font-family: "bau-regular", Arial, Helvetica, sans-serif;
  }

  & .checkboxes {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 0;
    justify-content: space-around;
  }

  & > div:nth-child(1) {
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