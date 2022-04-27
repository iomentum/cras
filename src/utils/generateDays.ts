import { Day } from '@/models/day';

export const generateDays = (date: Date): Day[] => {
  const dateYear = date.getFullYear()
  const month = date.getMonth()
  const emptyArray = new Array(32).fill('')

  const days = emptyArray
    .map((day, index): Day => {
      return {
        date: new Date(dateYear, month, index),
        workedDay: {
          morning: false,
          afternoon: false
        },
        holiday: false,
        vacationDay: {
          morning: false,
          afternoon: false
        },
        overTime: 0,
      }
    })
    .filter(({ date }) => date.getMonth() === month)

  return days
}

export default generateDays
