<script setup lang="ts">
import { useDaysStore } from '@/stores/daysStore';
import { useUserStore } from '@/stores/userStore';
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// eslint-disable-next-line no-undef
const date = new Date();
const store = useDaysStore();
const userStore = useUserStore();
const route = useRoute();
const thisMonth = date.getMonth()+1;
const isLoggedIn = ref(false)

let thisMonthString = ""+thisMonth;
if (thisMonthString.length == 1) {
  thisMonthString = "0"+thisMonthString;
}

function changeMonth (event:Event) {
  const target = event.target as HTMLInputElement;
  store.addDays(new Date(target.value));
}

function monthString () {
  let thisMonthString = ""+thisMonth;
  if (thisMonthString.length == 1) {
    thisMonthString = "0"+thisMonthString;
  }
  return thisMonthString;
}

function isMainView () {
  if(route.name == 'Home') {
    return true;
  } else {
    return false;
  }
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    isLoggedIn.value = true
  } else {
    isLoggedIn.value = false
  }
})

</script>

<template>
  <div class="inputs">
    <div>
      <p>NOM DE L'INTERVENANT</p>
      <input
        v-if="isMainView() && !isLoggedIn"
        type="text"
        :value="userStore.getUserFullName"
      >
      <p v-else>
        {{ userStore.getUserFullName }}
      </p>
    </div>
    <div>
      <p>NOM DU CLIENT</p>
      <input
        v-if="isMainView() && !isLoggedIn"
        type="text"
        :value="userStore.user.customer"
      >
      <p v-else>
        {{ userStore.user.customer }}
      </p>
    </div>
    <div>
      <p>MOIS/ANNÉE</p>
      <input
        v-if="isMainView()"
        type="month"
        :value="`${date.getFullYear()}-${monthString()}`"
        :min="`${date.getFullYear()-10}-${monthString()}`"
        :max="`${date.getFullYear()+3}-${monthString()}`"
        @change="changeMonth"
      >
      <p v-else>
        {{ `${monthString()}-${date.getFullYear()}` }}
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
