export class User {
  firstName: string;
  lastName:string;
  customer: string;
  email: string;
  uid: string;

  constructor (firstName:string,lastName:string,customer: string,email: string,uid: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.customer = customer;
    this.email = email;
    this.uid = uid;
  }

  setInfos (firstName:string, lastName:string, customer: string, email:string, uid:string): void {
    this.firstName = firstName;
    this.lastName = lastName;
    this.customer = customer;
    this.email = email;
    this.uid = uid;
  }
}