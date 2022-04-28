import { Day, WorkedDay, Holiday } from '@/models/day';

export const generateDays = (date: Date): Day[] => {
  const dateYear = date.getFullYear()
  const month = date.getMonth()
  const emptyArray = new Array(32).fill('')

  const days = emptyArray
    .map((day, index): Day => {
      if (fautTravaillerVieux) {
        return new WorkedDay(new Date(dateYear, month, index));
      }
      return new Holiday(new Date(dateYear, month, index));
    })
    .filter(({ date }) => date.getMonth() === month)

  return days
}

export default generateDays
