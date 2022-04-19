import generateDays from './generateDays'

// eslint-disable-next-line no-undef
test('generate days should return an array of days', () => {
  const generatedDays = generateDays(0)

  const expectedGeneratedDays = [
    {
      date: new Date().setMonth(0, 0),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 1),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 2),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 3),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 4),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 5),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 6),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 7),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 8),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 9),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 10),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 11),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 12),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 13),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 14),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 15),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 16),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 17),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 18),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 19),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 20),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 21),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 22),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 23),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 24),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 25),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 26),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 27),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 28),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 29),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
    {
      date: new Date().setMonth(0, 30),
      workedDay: {
        morning:false,
        afternoon: false
      },
      holiday: false,
      vacationDay: false,
      overTime: 0,
    },
  ]

  // eslint-disable-next-line no-undef
  expect(generatedDays).toBe(expectedGeneratedDays)
})
