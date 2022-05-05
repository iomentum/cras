import { Day, WorkedDay, Holiday } from './day'

const date = new Date(2022,4,5)

const day = new Day(date)
const workedDay = new WorkedDay(date)
const holiday = new Holiday(date)


describe('Day,WorkedDay,Holiday class tests',() => {

  it('sould return day date', () => {
    expect(day.date).toBe(date)
  });

  it('sould return day date', () => {
    expect(day.getDayDate()).toBe(date)
  });

  it('sould return holiday date', () => {
    expect(holiday.date).toBe(date)
  });

  it('sould return holiday date', () => {
    expect(holiday.getDayDate()).toBe(date)
  });

  it('should return workedDay date', () => {
    expect(workedDay.date).toBe(date)
  });

  it('should return workedDay date', () => {
    expect(workedDay.getDayDate()).toBe(date)
  });

  it('should returnd workedDay morning state', () => {
    expect(workedDay.morning).toBeFalsy
  });

  it('should return workedDay afternoon state', () => {
    expect(workedDay.afternoon).toBeFalsy
  });

  it('should return totalWorked of workedDay', () => {
    expect(workedDay.totalWorked()).toBe(0)
  });

  it('should return workedDay afternoon state', () => {
    workedDay.addAfternoon()
    expect(workedDay.afternoon).toBeTruthy
  });

  it('should return workedDay morning state', () => {
    workedDay.addMorning()
    expect(workedDay.morning).toBeTruthy
  });

  it('should return workedDay morning and afternoon states', () => {
    workedDay.reset()
    expect(workedDay.morning && workedDay.afternoon).toBeFalsy
  });

  it('should return totalWorked of workedDay', () => {
    workedDay.addWholeDay()
    expect(workedDay.totalWorked()).toBe(1)
  });

  it('should return totalWorked of workedDay', () => {
    workedDay.removeMorning()
    expect(workedDay.totalWorked()).toBe(0.5)
  });

  it('should return totalWorked of workedDay', () => {
    workedDay.removeAfternoon()
    expect(workedDay.totalWorked()).toBe(0)
  });
});
