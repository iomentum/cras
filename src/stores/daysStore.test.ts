import { setActivePinia, createPinia } from 'pinia';
import { generateDays } from '@/utils/generateDays';
import { WorkedDay, Day, Holiday } from '@/models/day';
import { useDaysStore } from '@/stores/daysStore';
declare var global: any;

describe('days Store', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(createPinia())
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          "2022-01-01": "1er janvier",
          "2022-04-18": "Lundi de Pâques",
          "2022-05-01": "1er mai",
          "2022-05-08": "8 mai",
          "2022-05-26": "Ascension",
          "2022-06-06": "Lundi de Pentecôte",
          "2022-07-14": "14 juillet",
          "2022-08-15": "Assomption",
          "2022-11-01": "Toussaint",
          "2022-11-11": "11 novembre",
          "2022-12-25": "Jour de Noël"
        }),
      })
    );
  });
  const monthOfMayDate = new Date(2022,4,2);
  const mayDaysArray = [
    new Holiday(new Date(2022,4,1)),
    new WorkedDay(new Date(2022,4,2), false, false),
    new WorkedDay(new Date(2022,4,3), false, false),
    new WorkedDay(new Date(2022,4,4), false, false),
    new WorkedDay(new Date(2022,4,5), false, false),
    new WorkedDay(new Date(2022,4,6), false, false),
    new Holiday(new Date(2022,4,7)),
    new Holiday(new Date(2022,4,8)),
    new WorkedDay(new Date(2022,4,9), false, false),
    new WorkedDay(new Date(2022,4,10), false, false),
    new WorkedDay(new Date(2022,4,11), false, false),
    new WorkedDay(new Date(2022,4,12), false, false),
    new WorkedDay(new Date(2022,4,13), false, false),
    new Holiday(new Date(2022,4,14)),
    new Holiday(new Date(2022,4,15)),
    new WorkedDay(new Date(2022,4,16), false, false),
    new WorkedDay(new Date(2022,4,17), false, false),
    new WorkedDay(new Date(2022,4,18), false, false),
    new WorkedDay(new Date(2022,4,19), false, false),
    new WorkedDay(new Date(2022,4,20), false, false),
    new Holiday(new Date(2022,4,21)),
    new Holiday(new Date(2022,4,22)),
    new WorkedDay(new Date(2022,4,23), false, false),
    new WorkedDay(new Date(2022,4,24), false, false),
    new WorkedDay(new Date(2022,4,25), false, false),
    new Holiday(new Date(2022,4,26)),
    new WorkedDay(new Date(2022,4,27), false, false),
    new Holiday(new Date(2022,4,28)),
    new Holiday(new Date(2022,4,29)),
    new WorkedDay(new Date(2022,4,30), false, false),
    new WorkedDay(new Date(2022,4,31), false, false),
  ];

  it('test getTotalWorked function', () => {
    const store = useDaysStore()
    store.arrayOfDays = mayDaysArray
    expect(store.getTotalWorked).toBe(0)
  })

  it('when addDays takes a date as parameter', async () => {
    const store = useDaysStore()
    await store.addDays(monthOfMayDate)
    expect(store.arrayOfDays).toEqual(mayDaysArray)
  })


  it('when addDays doesnt takes a date as parameter, should set arrayOfDays by this month days', async () => {
    const store = useDaysStore()
    const thisMonthDays = await generateDays(new Date())
    await store.addDays()
    expect(store.arrayOfDays).toEqual(thisMonthDays)
  })

  it('should set all WorkedDay morning / afternoon to true if param is true', () => {
    const store = useDaysStore()
    store.arrayOfDays = mayDaysArray
    store.toggleAllDays(true)
    expect(store.getTotalWorked).toBe(21)
    //getTotalWorked return 21 if all of WorkedDay morning/afternoon are true
  })

  it('should set all WorkedDay morning / afternoon to true if param is true', () => {
    const store = useDaysStore()
    store.arrayOfDays = mayDaysArray
    store.toggleAllDays(false)
    expect(store.getTotalWorked).toBe(0)
    //getTotalWorked return 0 if all of WorkedDay morning/afternoon are false
  })

  it('should set half day as param to true or false', () => {
    const store = useDaysStore()
    store.arrayOfDays = mayDaysArray
    const day = store.arrayOfDays[2]
    if(day instanceof WorkedDay){
      store.toggleHalfDay(day, true, 'morning')
      expect(day.morning).toBe(true)
    }
  })

  it('should set half day as param to true or false', () => {
    const store = useDaysStore()
    store.arrayOfDays = mayDaysArray
    const day = store.arrayOfDays[2]
    if(day instanceof WorkedDay){
      store.toggleHalfDay(day, false, 'morning')
      expect(day.morning).toBe(false)
    }
  })
})
