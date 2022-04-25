import { Day } from '@/models/day';

export const generateDays = (month: number): Day[] => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const emptyArray = new Array(32).fill('')

  const days = emptyArray
    .map((day, index): Day => {
      return {
        date: new Date(currentYear, month, index),
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
