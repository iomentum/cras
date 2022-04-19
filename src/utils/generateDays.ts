import { Day } from '@/models/day'

export const generateDays = (month:number): [Day] => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const daysInThisMonth = new Date(currentYear, month, 0).getDate()
  const emptyArray = new Array(daysInThisMonth).fill('')

  const days = emptyArray
    .map((day, index) => new Date(currentYear, month, index))
    .filter((day, index) => day.getMonth() === month)

  return [
    {
      date: new Date(),
      workedDay: false,
      holiday: true,
      vacationDay: true,
      overTime: 5,
    },
  ]
}

export default generateDays;