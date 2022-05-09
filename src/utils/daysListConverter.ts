import { Day, Holiday, WorkedDay } from "@/models/day"

interface JSONDay {
  type: string;
  date: Date;
  morning:boolean;
  afternoon:boolean;
}

export const jsonToDays = (jsonOfDays: JSONDay[]) :Day[] => {
  let addedDays: Day[] = []

  jsonOfDays.forEach((day) => {
    if (day.type == "WorkedDay") {
      const addedDay = new WorkedDay(
        new Date(day.date),
        day.morning,
        day.afternoon
      )
      addedDays.push(addedDay)
    } else {
      const addedDay = new Holiday(
        new Date(day.date)
      )
      addedDays.push(addedDay)
    }
  })

  return addedDays
}

export const daysToJson = (daysArray: Day[]) :JSON[] => {
  let addedDay: any[] = [];

  daysArray.forEach((day)=>{
    let convertedDay = {}
    if (day instanceof WorkedDay) {
      convertedDay = {
        type: 'WorkedDay',
        date: day.date,
        morning: day.morning,
        afternoon: day.afternoon
      }
    } else {
      convertedDay = {
        type: 'Holiday',
        date: day.date
      }
    }
    addedDay.push(convertedDay)
  })

  return addedDay
}

export default jsonToDays
