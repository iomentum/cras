import { Day } from '@/models/day';

export const isWeekend = (day: Day): boolean => {
  if (day.date.getDay() != 6 && day.date.getDay() != 0) {
    return true
  }else{
    return false
  }
}
export default isWeekend
