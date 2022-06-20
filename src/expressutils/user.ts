import { useUserStore } from "@/stores/userStore";

export const changeUserInfos = async (firstName:string, lastName:string, customer:string) => {
  const store = useUserStore();
  const userEmail = store.user.email
  await fetch('http://localhost:3002/updateprofile',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: userEmail,
      lastName: lastName,
      firstName: firstName,
      customer: customer
    }),
  })
  .then(response => response.json())
  .then(json => {
    if(json.isupdated){
      store.setLastName(json.lastName);
      store.setFirstName(json.firstName);
      store.setCustomer(json.customer);
    }
  })
}

export const setSignature = async (signatureURL: string) => {
  const store = useUserStore();

  await fetch('http://localhost:3002/uploadsignature',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      signatureURL: signatureURL,
      email: store.user.email
    }),
  })
  .then(response => response.json())
  .then(json => {
    store.setSignatureURL(json.signatureURL)
  })
}

export default changeUserInfos