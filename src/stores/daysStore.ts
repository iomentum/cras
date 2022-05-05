import { defineStore } from 'pinia';
import { Day, WorkedDay } from '@/models/day';
import { generateDays } from '@/utils/generateDays';

export const useDaysStore = defineStore("days", {
  state: () :{
    arrayOfDays: Day[] | [],
    username: string,
    customer: string,
    loading: boolean
  } => {
    return {
      arrayOfDays: [],
      username: "",
      customer: "",
      loading: false
    };
  },
  actions: {
    async addDays (date?:Date) {
      this.arrayOfDays= [];
      this.loading = true;

      if (date) {
        this.arrayOfDays = await generateDays(date);
      } else {
        const now = new Date();
        this.arrayOfDays = await generateDays(now);
        console.log(this.arrayOfDays);

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
    changeUsername (username:string) {
      this.username = username;
    },
    changeCustomer (customer:string) {
      this.customer = customer;
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
      let workedDayCouter = 0;
      state.arrayOfDays.forEach(day => {
        if(day instanceof WorkedDay) {
          workedDayCouter += day.totalWorked();
        }
      });
      return workedDayCouter;
    }
  }
});
