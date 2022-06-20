<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { useUserStore } from '@/stores/userStore';
import { useDaysStore } from '@/stores/daysStore';
import { signCra } from '@/expressutils/cras'
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


const store = useUserStore();
const daysStore = useDaysStore();
const signature = store.user.signatureURL
const signatureDate = computed(() => {
  return `${daysStore.getSignatureDate}`
})

const isLoggedIn = computed(() => {
  return store.user.isLogged
})

const sign = async () => {
  await signCra()
}

</script>

<template>
  <div class="signatures">
    <div>
      <p>Date et signature de l'intervenant</p>
      <button v-if="!daysStore.signed && isLoggedIn" @click="sign()">Signer</button>
      <p v-if="daysStore.signed" class="date">{{ signatureDate }}</p>
      <img v-if="daysStore.signed" :src="signature">
    </div>
    <div>Date et signature du responsable client</div>
  </div>
</template>

<style lang="scss">
.signatures {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  height: 140px;
  width: 33%;
  & .date{
    color: black;
  }
  & div {
    border: 1px solid $main-color;
    width: 50%;
    margin-top: 20px;
    padding: 8px;
    text-align: center;
    font-size: 10px;
    font-family: "Bau-Bold", Arial, Helvetica, sans-serif;
    color: #790053;
    & p {
      margin-top: 0px;
      margin-bottom: 0px;
    }
    & img {
      height: 85%;
    }
    &:nth-of-type(1) {
      margin-right: 5px;
    }
  }
}
</style>