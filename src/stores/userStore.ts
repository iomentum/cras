import { defineStore } from 'pinia';
import { User } from '@/models/user';

export const useUserStore = defineStore("user", {
  state: () :{
    user: User,
    errorMsg: String
  } => {
    return {
      user: new User("","","","",""),
      errorMsg: ''
    };
  },
  actions: {
    setUserInfos(firstName:string, lastName:string, customer:string, email:string, uid:string) {
      this.user.setInfos(firstName, lastName, customer, email, uid);
    },
    setLogStatus(logged:boolean) {
      this.user.setLogStatus(logged);
    },
    setErrorMsg(msg: string) {
      this.errorMsg = msg;
    },
    resetErrorMsg() {
      this.errorMsg = '';
    },
    setSignatureURL(url:string) {
      this.user.setSignatureURL(url);
    },
    setFirstName(firstName:string) {
      this.user.setFirstName(firstName);
    },
    setLastName(lastName:string) {
      this.user.setLastName(lastName);
    },
    setCustomer(customer:string) {
      this.user.setCustomer(customer);
    },
    resetUserStore() {
      this.user.setInfos("","","","","");
      this.resetErrorMsg();
      this.user.setLogStatus(false);
      this.user.resetSignatureURL();
    },
  },
  getters: {
    getUserFullName() :string {
      return `${this.user.firstName} ${this.user.lastName}`
    },
    getUpperFirstChar() :string {
      return this.user.firstName.charAt(0).toUpperCase()
    }
  }
})