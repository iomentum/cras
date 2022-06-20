export class User {
  firstName: string;
  lastName:string;
  customer: string;
  email: string;
  uid: string;
  isLogged: boolean;
  signatureURL: string;

  constructor (firstName:string,lastName:string,customer: string,email: string,uid: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.customer = customer;
    this.email = email;
    this.uid = uid;
    this.isLogged = false;
    this.signatureURL = '';
  }

  setLogStatus (logged: boolean) {
    this.isLogged = logged;
  }

  setInfos (firstName:string, lastName:string, customer: string, email:string, uid:string): void {
    this.firstName = firstName;
    this.lastName = lastName;
    this.customer = customer;
    this.email = email;
    this.uid = uid;
  }

  setSignatureURL(url:string): void {
    this.signatureURL = url;
  }

  setFirstName(firstName:string): void {
    this.firstName = firstName;
  }

  setLastName(lastName:string): void {
    this.lastName = lastName;
  }

  setCustomer(customer:string): void {
    this.customer = customer;
  }

  resetSignatureURL(): void {
    this.signatureURL = "";
  }
}