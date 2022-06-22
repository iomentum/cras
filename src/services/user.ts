import { useUserStore } from "@/stores/userStore";
import env from "./env";

export const changeUserInfos = async (firstName:string, lastName:string, customer:string) => {
  const store = useUserStore();
  const userid = store.user.uid;

  await fetch(`${env.BACKEND_URL}/user/${userid}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
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
  const userStore = useUserStore();
  const userid = userStore.user.uid;

  await fetch(`${env.BACKEND_URL}/user/${userid}/signature`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      signatureURL: signatureURL,
    }),
  })
  .then(response => response.json())
  .then(json => {
    userStore.setSignatureURL(json.signatureURL)
  })
}

export default changeUserInfos