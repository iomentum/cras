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
      }),
    })
  );
  // Setup
  const date = new Date(2022,4,1);

  const expectedGeneratedDays = [
    new Holiday(new Date(2022,4,1)),
    new WorkedDay(new Date(2022,4,2)),
    new WorkedDay(new Date(2022,4,3)),
    new WorkedDay(new Date(2022,4,4)),
    new WorkedDay(new Date(2022,4,5)),
    new WorkedDay(new Date(2022,4,6)),
    new Holiday(new Date(2022,4,7)),
    new Holiday(new Date(2022,4,8)),
    new WorkedDay(new Date(2022,4,9)),
    new WorkedDay(new Date(2022,4,10)),
    new WorkedDay(new Date(2022,4,11)),
    new WorkedDay(new Date(2022,4,12)),
    new WorkedDay(new Date(2022,4,13)),
    new Holiday(new Date(2022,4,14)),
    new Holiday(new Date(2022,4,15)),
    new WorkedDay(new Date(2022,4,16)),
    new WorkedDay(new Date(2022,4,17)),
    new WorkedDay(new Date(2022,4,18)),
    new WorkedDay(new Date(2022,4,19)),
    new WorkedDay(new Date(2022,4,20)),
    new Holiday(new Date(2022,4,21)),
    new Holiday(new Date(2022,4,22)),
    new WorkedDay(new Date(2022,4,23)),
    new WorkedDay(new Date(2022,4,24)),
    new WorkedDay(new Date(2022,4,25)),
    new Holiday(new Date(2022,4,26)),
    new WorkedDay(new Date(2022,4,27)),
    new Holiday(new Date(2022,4,28)),
    new Holiday(new Date(2022,4,29)),
    new WorkedDay(new Date(2022,4,30)),
    new WorkedDay(new Date(2022,4,31)),
  ];
  // Manipulations

  generateDays(date).then(data => {
    // Test Expect
    expect(data).toStrictEqual(expectedGeneratedDays);
  });
});



