
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { getFirestore, setDoc, doc, updateDoc } from 'firebase/firestore';
import { useDaysStore } from '@/stores/daysStore';
import { useUserStore } from '@/stores/userStore';
import { WorkedDay } from '@/models/day';

const firebaseConfig = {
  apiKey: "AIzaSyCYbjqSs55f4e8xqt9leTeGZzBR3AuD68k",
  authDomain: "cra-auth-c57c2.firebaseapp.com",
  projectId: "cra-auth-c57c2",
  storageBucket: "cra-auth-c57c2.appspot.com",
  messagingSenderId: "75056807790",
  appId: "1:75056807790:web:2b64a9a613172294200b7f"
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

let daysListToPush:any[] = [];

export const sendCraToDB = () => {
  daysListToPush = []
  const daysStore = useDaysStore()
  const userStore = useUserStore()
  daysStore.arrayOfDays.forEach((day)=>{
    let day1 = {}
    if (day instanceof WorkedDay) {
      day1 = {
        type: 'WorkedDay',
        date: day.date,
        morning: day.morning,
        afternoon: day.afternoon
      }
    } else {
      day1 = {
        type: 'Holiday',
        date: day.date
      }
    }
    daysListToPush.push(day1)
  })

  const month = `${daysStore.arrayOfDays[0].date.getMonth()+1}`;
  const year = daysStore.arrayOfDays[0].date.getFullYear();
  const craDate = `${year}-${month.length == 1 ? `0${month}` : month}`

  if (userStore.user.uid) {
    setDoc(doc(db, "users", userStore.user.uid, "cras", craDate),{
      signed: false,
      daysList: daysListToPush
    })
  }
}

export const signCra = () => {
  const daysStore = useDaysStore();
  const userStore = useUserStore()

  const month = `${daysStore.arrayOfDays[0].date.getMonth()+1}`;
  const year = daysStore.arrayOfDays[0].date.getFullYear();
  const craDate = `${year}-${month.length == 1 ? `0${month}` : month}`

  if (userStore.user.uid) {
    const craToSign = doc(db, "users", userStore.user.uid, "cras", craDate)
    daysStore.signed = true
    updateDoc(craToSign, {
      signed: true,
      dateOfSignature: new Date()
    })
  }
  daysStore.signed = true
  daysStore.dateOfSignature = new Date()
}

export default sendCraToDB
