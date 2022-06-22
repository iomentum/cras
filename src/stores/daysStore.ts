import { defineStore } from 'pinia';
import { Day, WorkedDay } from '@/models/day';
import { generateDays } from '@/utils/generateDays';
import { useUserStore } from './userStore';
import { getCra } from '@/services/cras';

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
        const month = `${date.getMonth()+1}`.padStart(2, '0');
        const year = date.getFullYear();
        const yearmonth = `${year}-${month}`;
        const userStore = useUserStore();

        if (userStore.user.isLogged) {
          await getCra(yearmonth)
        } else {
          this.arrayOfDays = await generateDays(date);
        }
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

      const month = `${state.arrayOfDays[0].date.getMonth()+1}`.padStart(2, '0');
      const year = state.arrayOfDays[0].date.getFullYear();

      const date = `${year}-${month}`
      return date
    },
    getSignatureDate: (state) => {
      return state.dateOfSignature
    }
  }
});
