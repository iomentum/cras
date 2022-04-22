import { defineStore } from 'pinia'
import { Day } from '@/models/day';
import { generateDays } from '@/utils/generateDays';


export const useDaysStore = defineStore("days", {

  state: () :{ arrayOfDays: Day[] | [] } => {
    return {
      arrayOfDays: []
    };
  },

  actions: {
    addDays(month?:number) {
      if (typeof month !== 'undefined') {
        this.arrayOfDays = generateDays(month);
      } else {
        const currentMonth = new Date().getMonth();
        this.arrayOfDays = generateDays(currentMonth);
      }
    },

    changeDayProps(day:number, typeOfProp:string){
      const thisDay = this.arrayOfDays[day];
      switch(typeOfProp){
        case 'morning':
          thisDay.workedDay.morning=!thisDay.workedDay.morning
        break
        case 'afternoon':
          thisDay.workedDay.afternoon=!thisDay.workedDay.afternoon
        break
        case 'holiday':
          thisDay.holiday = !thisDay.holiday
          if(thisDay.vacationDay){
            thisDay.vacationDay = !thisDay.vacationDay
          }
        break
        case 'vacationDay':{
          thisDay.vacationDay = !thisDay.vacationDay
          if(thisDay.holiday){
            thisDay.holiday = !thisDay.holiday
          }
        }
      }
    }
  },

  getters: {
    getDays(): Day[] {
      if(this.arrayOfDays.length > 1) {
        return this.arrayOfDays;
      } else {
        const store = useDaysStore();
        store.addDays();
        return this.arrayOfDays;
      }
    },
  },

});
