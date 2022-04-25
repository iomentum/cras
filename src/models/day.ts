interface WorkedDay {
  morning: boolean,
  afternoon: boolean
}

export interface Day {
  date: Date
  workedDay: WorkedDay
  holiday: boolean
  vacationDay: WorkedDay
  overTime: number
}
