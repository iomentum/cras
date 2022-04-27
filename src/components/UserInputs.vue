<script setup lang="ts">
import { useDaysStore } from '@/stores/daysStore'
const store = useDaysStore();
// eslint-disable-next-line no-undef
const date = new Date()
const path = window.location.pathname
function changeMonth(event:Event){
  const target = event.target as HTMLInputElement
  store.addDays(new Date(target.value))
}

const thisMonth = date.getMonth()+1
let thisMonthString = ""+thisMonth
if (thisMonthString.length == 1) {
  thisMonthString = "0"+thisMonthString
}
function changeUserame(event: Event){
  const target = event.target as HTMLInputElement
  store.changeUsername(target.value)
}
function changeCustomer(event: Event){
  const target = event.target as HTMLInputElement
  store.changeCustomer(target.value)
}

</script>

<template>
  <div class="inputs">
    <div>
      <p>NOM DE L'INTERVENANT</p>
      <input
        v-if="path!='/Print'"
        type="text"
        :value="store.userName"
        @change="changeUserame"
      >
      <p v-else-if="path=='/Print'">
        {{ store.userName }}
      </p>
    </div>
    <div>
      <p>NOM DU CLIENT</p>
      <input
        v-if="path!='/Print'"
        type="text"
        :value="store.customer"
        @change="changeCustomer"
      >
      <p v-else-if="path=='/Print'">
        {{ store.customer }}
      </p>
    </div>
    <div>
      <p>MOIS/ANNÉE</p>
      <input
        v-if="path!='/Print'"
        type="month"
        :value="date.getFullYear()+'-'+thisMonthString"
        @change="changeMonth"
      >
      <input
        v-else
        type="month"
        disabled="true"
        :value="date.getFullYear()+'-'+thisMonthString"
        @change="changeMonth"
      >
    </div>
  </div>
</template>

<style scoped lang="scss">

.inputs{
  display: flex;
  flex-direction: row;
  margin:0 auto;
  width: 800px;
  & div{
    background-color: #FBF5F3;
    margin: 20px;
    padding: 10px 20px 10px 20px;
    text-align: center;
    font-size: 14px;
    font-family: 'Bau-Bold';
    color: #790053;
    & input{
      background-color: rgba(0, 0, 0, 0);
      border: 1px solid $main-color;
      border-radius: 3px;
      text-align: center;
    }
  }
}
</style>
