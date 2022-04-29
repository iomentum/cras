/*

         Day

         / \
     worked holy

*/
export class Day {
  date: Date;

  constructor(date:Date){
    this.date = date;
  }

  totalWorked():number {return 0;}
  getDayDate():Date {return this.date}

}

export class WorkedDay extends Day {
  morning: boolean;
  afternoon: boolean;

  constructor(date: Date) {
    super(date);
    this.morning = false;
    this.afternoon = false;
  }

  addMorning(): void {
    this.morning = true;
  }

  removeMorning(): void {
    this.morning = false;
  }

  addAfternoon(): void {
    this.afternoon = true;
  }

  removeAfternoon(): void {
    this.afternoon = false;
  }

  addWholeDay(): void {
    this.addMorning();
    this.addAfternoon();
  }

  reset(): void {
    this.removeMorning();
    this.removeAfternoon();
  }

  totalWorked(): number {
    return (this.morning ? 0.5 : 0) + (this.afternoon ? 0.5 : 0);
  }
}
// un jour peut etre travaillable ou pas.
// si il est travaillable, une personne peut travailler: toute la journee, une demi journee, ou pas.

export class Holiday extends Day {}