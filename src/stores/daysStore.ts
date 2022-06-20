import { defineStore } from 'pinia';
import { Day, WorkedDay, Holiday } from '@/models/day';
import { generateDays } from '@/utils/generateDays';
import { useUserStore } from './userStore';
import firebase from 'firebase/compat/app';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { getCra, isCraExist } from '@/expressutils/cras';

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


export const useDaysStore = defineStore("days", {
  state: () :{
    arrayOfDays: Day[] | [],
    signed: boolean,
    dateOfSignature: string,
    loading: boolean,
  } => {
    return {
      arrayOfDays: [],
      dateOfSignature: '',
      signed: false,
      loading: false
    };
  },
  actions: {
    async addDays (date?:Date) {
      this.arrayOfDays= [];
      this.loading = true;
      this.signed = false;
      this.dateOfSignature = '';

      if (date) {
      const month = `${date.getMonth()+1}`;
      const year = date.getFullYear();
      const yearmonth = `${year}-${month.length == 1 ? `0${month}` : month}`

      await isCraExist(yearmonth) ? getCra(yearmonth) : this.arrayOfDays = await generateDays(date);

      } else {
        const now = new Date();
        this.arrayOfDays = await generateDays(now);
      }
      this.loading = false;
    },
    toggleAllDays (isChecked: boolean) {
      if(isChecked) {
        this.arrayOfDays.forEach(day => {
          if(day instanceof WorkedDay) { day.addWholeDay(); }
        });
      } else {
        this.arrayOfDays.forEach(day => {
          if(day instanceof WorkedDay) { day.reset(); }
        });
      }
    },
    setArrayOfDays (array:Day[]) {
      this.arrayOfDays = array
    },
    toggleHalfDay (day:WorkedDay, checked:boolean, whichHalfDay:string) {
      switch(whichHalfDay) {
        case "morning":
          if(checked) { day.addMorning(); }
          else{ day.removeMorning(); }
          break;
        case "afternoon":
          if(checked) { day.addAfternoon(); }
          else{ day.removeAfternoon(); }
          break;
      }
    },
    resetDaysStore() {
      this.arrayOfDays = []
    }
 },

  getters: {
    getDays: (state) => {
      if(state.arrayOfDays.length > 1)  return state.arrayOfDays;

      if(state.loading) return [];

      const store = useDaysStore();
      store.addDays();
      return state.arrayOfDays;
    },
    getArrayOfDays: (state) => {
      return state.arrayOfDays;
    },
    getSingleDay: (state) => {
      return (dayDate:number):Day | null => state.arrayOfDays.find((day):boolean => day.date.getDate() === dayDate) || null;
    },
    getTotalWorked: (state) => {
      let workedDayCounter = 0;
      state.arrayOfDays.forEach(day => {
        if(day instanceof WorkedDay) {
          workedDayCounter += day.totalWorked();
        }
      });
      return workedDayCounter;
    },
    isAllDaysChecked: (state) => {
      return state.arrayOfDays.every(day => {if(day instanceof WorkedDay)day.morning && day.afternoon});
    },
    getDateString: (state) => {
      if (!state.arrayOfDays[0]) return null

      const month = `${state.arrayOfDays[0].date.getMonth()+1}`;
      const year = state.arrayOfDays[0].date.getFullYear();

      const date = `${year}-${month.length == 1 ? `0${month}` : month}`
      return date
    },
    getSignatureDate: (state) => {
      return state.dateOfSignature
    }
  }
});
