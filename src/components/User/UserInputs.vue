<script setup lang="ts">
import { useDaysStore } from '@/stores/daysStore';
import { useUserStore } from '@/stores/userStore';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { NInput, NSpace } from 'naive-ui';

const date = new Date();
const store = useDaysStore();
const userStore = useUserStore();
const route = useRoute();
const thisMonth = `${date.getMonth()+1}`.padStart(2, '0');

const nameInput = ref(userStore.user.firstName);
const customerInput = ref(userStore.user.customer);

const yearmonth = computed(() => store.getDateString);
const isLoggedIn = computed(() => userStore.user.isLogged);

const changeMonth = (event:Event) => {
  const target = event.target as HTMLInputElement;
  store.addDays(new Date(target.value));
};

const isMainView = computed(() => {
  return route.path == "/";
});

const changeInputs = () => {
  userStore.setFirstName(nameInput.value);
  userStore.setCustomer(customerInput.value);
};

</script>

<template>
  <div class="inputs">
    <div>
      <p>NOM DE L'INTERVENANT</p>
      <n-space
        v-if="isMainView && !isLoggedIn"
        vertical
      >
        <n-input
          v-model:value="nameInput"
          type="text"
          name="username"
          placeholder="Name"
          @change="changeInputs"
        />
      </n-space>
      <p v-else>
        {{ userStore.getUserFullName }}
      </p>
    </div>
    <div>
      <p>NOM DU CLIENT</p>
      <n-space
        v-if="isMainView && !isLoggedIn"
        vertical
      >
        <n-input
          v-model:value="customerInput"
          type="text"
          name="customer"
          placeholder="Name"
          @change="changeInputs"
        />
      </n-space>
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
        :min="`${date.getFullYear()-10}-${thisMonth}`"
        :max="`${date.getFullYear()+3}-${thisMonth}`"
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
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-around;
  margin: 0 auto;
  margin-bottom: 20px;

  & > div {
    padding: 10px;
    background-color: #fbf5f3;
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
