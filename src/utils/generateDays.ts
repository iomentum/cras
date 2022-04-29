import { Day, WorkedDay, Holiday } from '@/models/day';

export const generateDays = (date: Date): Day[] => {
  const dateYear = date.getFullYear()
  const month = date.getMonth()
  const emptyArray = new Array(32).fill('')

  const days = emptyArray
    .map((_, index): Day => {
      const date = new Date(dateYear, month, index).getDay()
      if (date == 6 || date == 0) {
        return new Holiday(new Date(dateYear, month, index));
      }
      return new WorkedDay(new Date(dateYear, month, index));
    })
    .filter(({ date }) => date.getMonth() === month)

  return days
}

export default generateDays
