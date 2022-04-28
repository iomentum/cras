import { defineStore } from 'pinia'
import { Day } from '@/models/day';
import { generateDays } from '@/utils/generateDays';
import { isWeekend } from '@/utils/utils'

export const useDaysStore = defineStore("days", {
  state: () :{
    arrayOfDays: Day[] | [],
    userName: string,
    customer: string
  } => {
    return {
      arrayOfDays: [],
      userName:'',
      customer:''
    };
  },
  actions: {
    addDays(date?:Date) {
      this.arrayOfDays= []
      if (date) {
        this.arrayOfDays = generateDays(date);
      } else {
        const currentDate = new Date();
        this.arrayOfDays = generateDays(currentDate);
      }
    },
    resetDay(day:Day){
      day.workedDay.morning = false;
      day.workedDay.afternoon = false;
      day.vacationDay.morning = false;
      day.vacationDay.afternoon = false;
      day.holiday = false;
    },
    toggleAllDays(checked:boolean) {
      if(checked) {
        this.arrayOfDays.forEach(day => {
          if (!isWeekend(day)) {
            this.resetDay(day)
            day.workedDay.morning = true;
            day.workedDay.afternoon = true;
          }
        })
      } else {
        this.arrayOfDays.forEach(day => {
          day.workedDay.morning=false;
          day.workedDay.afternoon=false;
        })
      }
    },
    changeOvertime(day:number, overtimeValue:number){
      const thisDay = this.arrayOfDays[day];
      thisDay.overTime = overtimeValue;
    },
    changeDayProps(day:number, typeOfProp:string){
      const thisDay = this.arrayOfDays[day];
      switch(typeOfProp){
        case 'morning':
          thisDay.workedDay.morning=!thisDay.workedDay.morning
          if (thisDay.workedDay.morning) thisDay.vacationDay.morning = false;
          thisDay.holiday = false
        break
        case 'afternoon':
          thisDay.workedDay.afternoon=!thisDay.workedDay.afternoon
          if (thisDay.workedDay.afternoon) thisDay.vacationDay.afternoon = false;
          thisDay.holiday = false
        break
        case 'holiday':
          thisDay.holiday = !thisDay.holiday
          if (thisDay.holiday) {
            thisDay.workedDay.morning = false;
            thisDay.workedDay.afternoon = false;
            thisDay.vacationDay.morning = false;
            thisDay.vacationDay.afternoon = false;
            thisDay.overTime = 0;
          }
        break
        case 'vacationDayMorning':{
          thisDay.vacationDay.morning = !thisDay.vacationDay.morning
          if(thisDay.holiday)thisDay.holiday = !thisDay.holiday;
          if(thisDay.vacationDay.morning)thisDay.workedDay.morning = false;
        }
        break
        case 'vacationDayAfternoon':{
          thisDay.vacationDay.afternoon = !thisDay.vacationDay.afternoon
          if(thisDay.holiday)thisDay.holiday = !thisDay.holiday;
          if(thisDay.vacationDay.afternoon)thisDay.workedDay.afternoon = false;
        }
      }
    },
    changeUsername(name:string){
      this.userName=name
    },
    changeCustomer(name:string){
      this.customer=name
    }
  },

  getters: {
    getDays: (state) => {
      if(state.arrayOfDays.length > 1) {
        return state.arrayOfDays;
      } else {
        const store = useDaysStore();
        store.addDays();
        return state.arrayOfDays;
      }
    },
    getSingleDay: (state) => {
      return (dayDate:number):Day | null => state.arrayOfDays.find((day):boolean => day.date.getDate() === dayDate) || null;
    },
    getWorkedDays(): number {
      let count = 0
      this.arrayOfDays.forEach(day => {
        if(day.workedDay.morning)count += 0.5
        if(day.workedDay.afternoon)count += 0.5
      })
      return count
    },
    getOvertime(): number {
      let count = 0
      this.arrayOfDays.forEach(day => {
        count += day.overTime
      })
      return count
    },
    getHoliday(): number {
      let count = 0
      this.arrayOfDays.forEach(day => {
        if(day.holiday)count += 1
      })
      return count
    },
    getVacationDay(): number {
      let count = 0
      this.arrayOfDays.forEach(day => {
        if(day.vacationDay.morning)count += 0.5;
        if(day.vacationDay.afternoon)count += 0.5
      })
      return count
    },
  },
});
