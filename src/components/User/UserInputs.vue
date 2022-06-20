<script setup lang="ts">
import { useDaysStore } from '@/stores/daysStore';
import { useUserStore } from '@/stores/userStore';
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue'

const date = new Date();
const store = useDaysStore();
const userStore = useUserStore();
const route = useRoute();
const thisMonth = date.getMonth()+1;
const yearmonth = ref(store.getDateString)

const isLoggedIn = computed(() => {
  return userStore.user.isLogged
})

const changeMonth = (event:Event) => {
  const target = event.target as HTMLInputElement;
  yearmonth.value = target.value
  store.addDays(new Date(target.value));
}

const monthString = () => {
  let thisMonthString = ""+thisMonth;
  if (thisMonthString.length == 1) {
    thisMonthString = "0"+thisMonthString;
  }
  return thisMonthString;
}

const isMainView = computed(() => {
  return route.path == "/"
})

const changeInputs = (e:Event) => {
  const target = e.target as HTMLInputElement;
  if (target.name == 'username') {
    userStore.setFirstName(target.value)
  }
  if (target.name == 'customer') {
    userStore.setCustomer(target.value)
  }
}

</script>

<template>
  <div class="inputs">
    <div>
      <p>NOM DE L'INTERVENANT</p>
      <input
        v-if="isMainView && !isLoggedIn"
        type="text"
        name="username"
        :value="userStore.user.firstName"
        @change="changeInputs"
      >
      <p v-else>
        {{ userStore.getUserFullName }}
      </p>
    </div>
    <div>
      <p>NOM DU CLIENT</p>
      <input
        v-if="isMainView && !isLoggedIn"
        type="text"
        name="customer"
        :value="userStore.user.customer"
        @change="changeInputs"
      >
      <p v-else>
        {{ userStore.user.customer }}
      </p>
    </div>
    <div>
      <p>MOIS/ANNÉE</p>
      <input
        v-if="isMainView"
        type="month"
        :value="yearmonth"
        :min="`${date.getFullYear()-10}-${monthString()}`"
        :max="`${date.getFullYear()+3}-${monthString()}`"
        @change="changeMonth"
      >
      <p v-else>
        {{ `${store.getDateString}` }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.inputs {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 50%;

  & div {
    background-color: #fbf5f3;
    margin: 20px;
    width: 300px;
    min-width: 246px;
    padding: 10px 20px 10px 20px;
    text-align: center;
    font-size: 14px;
    font-family: "Bau-Bold", Arial, Helvetica, sans-serif;
    color: #790053;

    & p:nth-of-type(2) {
      color: black;
    }

    & input {
      background-color: rgba(0, 0, 0, 0);
      border: 1px solid $main-color;
      border-radius: 3px;
      text-align: center;
      font-family: "Bau-Bold", Arial, Helvetica, sans-serif;
    }
  }
}
</style>
