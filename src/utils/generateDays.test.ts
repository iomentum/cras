import {generateDays} from '@/utils/generateDays';

// eslint-disable-next-line no-undef
test('generate days should return an array of days', async () => {
  const date = new Date(2022, 4, 1)
  const generatedDays = generateDays(date);

  const expectedGeneratedDays = [
  {
    date: "2022-04-30T22:00:00.000Z"
  },
  {
    date: "2022-05-01T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-02T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-03T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-04T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-05T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-06T22:00:00.000Z"
  },
  {
    date: "2022-05-07T22:00:00.000Z"
  },
  {
    date: "2022-05-08T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-09T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-10T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-11T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-12T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-12T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-13T22:00:00.000Z"
  },
  {
    date: "2022-05-14T22:00:00.000Z"
  },
  {
    date: "2022-05-15T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-16T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-17T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-18T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-19T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-20T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-21T22:00:00.000Z"
  },
  {
    date: "2022-05-22T22:00:00.000Z"
  },
  {
    date: "2022-05-23T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-24T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-25T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-26T22:00:00.000Z"
  },
  {
    date: "2022-05-27T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-28T22:00:00.000Z"
  },
  {
    date: "2022-05-29T22:00:00.000Z"
  },
  {
    date: "2022-05-30T22:00:00.000Z",
    morning: false,
    afternoon: false
  },
  {
    date: "2022-05-31T22:00:00.000Z",
    morning: false,
    afternoon: false
  }
  ];

  // eslint-disable-next-line no-undef
  expect(generatedDays).toBe(expectedGeneratedDays);
});
