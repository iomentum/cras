import { Day, WorkedDay, Holiday } from '@/models/day';
import { getHolidays } from './getHoliday'

export const generateDays = async (date: Date): Promise<Day[]> => {
  const dateYear = date.getFullYear()
  const month = date.getMonth()
  console.log(month);

  const emptyArray = new Array(32).fill('')
  const holidays = await getHolidays(date)
  console.log(holidays);

  const days = emptyArray
    .map((_, index): Day => {
      const date = new Date(dateYear, month, index)
      if (isWeekend(date) || isHoliday(date, holidays)) return new Holiday(date);
      return new WorkedDay(date);
    })
    .filter(({ date }) => date.getMonth() === month)

  return days
}

const isWeekend = (date: Date):boolean => date.getDay() == 6 || date.getDay() == 0;

const isHoliday = (date: Date, holidays: object): boolean => {
  const holidaysArray: string[] = Object.keys(holidays).map(date => {
    // We need to set the hour because of time difference when it's being converted to ISO string
    const asDate = new Date(date).setHours(0)
    return formatDateToIso(new Date(asDate))
  })

  return holidaysArray.includes(formatDateToIso(date))
}

const formatDateToIso = (date: Date): string => date.toISOString().split('T')[0]

export default generateDays
