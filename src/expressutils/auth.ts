import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";


export const signIn = async (email:string, password:string) => {
  const store = useUserStore();
  store.resetErrorMsg()

  await fetch('http://localhost:3002/login',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  })
  .then(response => response.json())
  .then(json => {
    if (json.logged) {
      store.setUserInfos(
        json.firstName,
        json.lastName,
        json.customer,
        json.email,
        json.id
      )
      store.setLogStatus(true)
      store.setSignatureURL(json.signatureURL)
    } else {
      store.setErrorMsg(json.errorMsg)
    }
  })
}

export const signUp = async (email: string, password:string, firstName:string, lastName:string, customer:string) => {
  const store = useUserStore();
  store.resetErrorMsg();
  await fetch('http://localhost:3002/signup',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      customer: customer
    }),
  })
  .then(response => response.json())
  .then(json => {
    if (json.signedup) signIn(email, password)
    store.setErrorMsg(json.errorMsg)
  })
}

export const signOut = () => {
  const store = useUserStore();
  store.resetUserStore();
}

export default signIn