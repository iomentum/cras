import {generateDays} from '@/utils/generateDays';
import { Holiday, WorkedDay } from '@/models/day'
declare var global: any;

test('Doit retourner un tableau des jours du mois de mai', () => {
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
      })
    })
  );
  // Setup
  const date = new Date(2022,4,1);

  const expectedGeneratedDays = [
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
  // Manipulations

  generateDays(date).then(data => {
    // Test Expect
    expect(data.length).toBeGreaterThan(27)
    expect(data.length).not.toBeGreaterThan(31)
    expect(data).toStrictEqual(expectedGeneratedDays);
  });
});



