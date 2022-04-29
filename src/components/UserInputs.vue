<script setup lang="ts">
import { useDaysStore } from '@/stores/daysStore'
import { useRoute } from 'vue-router'

// eslint-disable-next-line no-undef
const date = new Date()
const store = useDaysStore();
const route = useRoute()
const thisMonth = date.getMonth()+1

let thisMonthString = ""+thisMonth
if (thisMonthString.length == 1) {
  thisMonthString = "0"+thisMonthString
}

function changeMonth(event:Event){
  const target = event.target as HTMLInputElement
  store.addDays(new Date(target.value))
}

function monthString(){
  let thisMonthString = ""+thisMonth
  if (thisMonthString.length == 1) {
    thisMonthString = "0"+thisMonthString
  }
  return thisMonthString
}

function changeUserame(event: Event){
  const target = event.target as HTMLInputElement
  store.changeUsername(target.value)
}

function changeCustomer(event: Event){
  const target = event.target as HTMLInputElement
  store.changeCustomer(target.value)
}

function isMainView(){
  if(route.name == 'Home'){
    return true
  } else {
    return false
  }
}
</script>

<template>
  <div class="inputs">
    <div>
      <p>NOM DE L'INTERVENANT</p>
      <input
        v-if="isMainView()"
        type="text"
        :value="store.username"
        @change="changeUserame"
      >
      <p v-else>
        {{ store.username }}
      </p>
    </div>
    <div>
      <p>NOM DU CLIENT</p>
      <input
        v-if="isMainView()"
        type="text"
        :value="store.customer"
        @change="changeCustomer"
      >
      <p v-else>
        {{ store.customer }}
      </p>
    </div>
    <div>
      <p>MOIS/ANNÉE</p>
      <input
        v-if="isMainView()"
        type="month"
        :value="`${date.getFullYear()}-${monthString()}`"
        @change="changeMonth"
      >
      <input
        v-else
        type="month"
        disabled="true"
        :value="`${date.getFullYear()}-${monthString()}`"
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
