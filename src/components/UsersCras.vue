<script setup lang="ts">
import { getFirestore, collection, query , getDoc, getDocs, doc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { ref } from 'vue';
import { Day, WorkedDay, Holiday} from '@/models/day';
import { useRouter } from 'vue-router';
import { useDaysStore } from '@/stores/daysStore';
import CraButton from './CraButton.vue';
import { useUserStore } from '@/stores/userStore';

const firebaseConfig = {
  apiKey: "AIzaSyCYbjqSs55f4e8xqt9leTeGZzBR3AuD68k",
  authDomain: "cra-auth-c57c2.firebaseapp.com",
  projectId: "cra-auth-c57c2",
  storageBucket: "cra-auth-c57c2.appspot.com",
  messagingSenderId: "75056807790",
  appId: "1:75056807790:web:2b64a9a613172294200b7f"
};

const router = useRouter();
const app = firebase.initializeApp(firebaseConfig);
const user = firebase.auth().currentUser;
const db = getFirestore(app);
const cra = ref<Day[]>([])
const store = useDaysStore();
const cras = ref<String[]>([]);

const getAllCras = async () => {
  const q = query(collection(db, `users/${user?.uid}/cras`));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
    cras.value.push(doc.id)
  });
};

getAllCras()

const getCra = async (event:Event) => {
  const userStore = useUserStore();
  const target = event.target as HTMLInputElement;
  const docRef = doc(db, `users/${userStore.user.uid}/cras`,target.id);
  const docSnap = await getDoc(docRef);
  let signed = false;
  if (docSnap.exists()) {
    let arrayOfDays: Day[] = []
    docSnap.data().daysList.forEach((day: { type: string; date: Date; morning: boolean; afternoon: boolean; }) => {
      if (day.type == 'WorkedDay') {
        const addedDay = new WorkedDay(day.date.toDate(), day.morning, day.afternoon)
        arrayOfDays.push(addedDay)
      } else {
        const addedDay = new Holiday(day.date.toDate())
        arrayOfDays.push(addedDay)
      }
    });
    signed = docSnap.data().signed
    cra.value = arrayOfDays;
    store.arrayOfDays = cra.value;
    store.dateOfSignature = docSnap.data().dateOfSignature.toDate();
    store.signed = signed;
    if (signed) {
      router.push("/Print")
    } else {
      router.push("/")
    }
  } else {
    cra.value = []
  }
};

</script>

<template>
<div class="container">
  <h1>Mes cras</h1>
  <CraButton v-for="cra in cras" :month="cra" @click="getCra"/>
</div>
</template>

<style scoped lang="scss">
.container{
  margin: 0 auto;
  width: 50%;
  text-align: center;
  & h1 {
    font-family: 'Bau-regular';
    color: black;
  }
  & p {
    margin: 0 auto;
    width: 100%;
  }
}
</style>
