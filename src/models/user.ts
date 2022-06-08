export class User {
  firstName: string;
  lastName:string;
  customer: string;
  email: string;
  uid: string;
  signatureURL: string;

  constructor (firstName:string,lastName:string,customer: string,email: string,uid: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.customer = customer;
    this.email = email;
    this.uid = uid;
    this.signatureURL = '';
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

  setFirstName(username:string): void {
    this.firstName = username;
  }

  setCustomer(customer:string): void {
    this.customer = customer;
  }

  resetSignatureURL(): void {
    this.signatureURL = "";
  }
}