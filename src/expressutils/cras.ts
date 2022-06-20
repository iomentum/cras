import { useUserStore } from "@/stores/userStore"
import { useDaysStore } from "@/stores/daysStore"
import { jsonToDays, daysToJson } from "@/utils/daysListConverter";


export const createOrUpdateCraDB = async () => {

  const daysStore = useDaysStore();
  const userStore = useUserStore();

  const daysListToCreateOrUpdate:JSON[] = daysToJson(daysStore.arrayOfDays);

  await fetch(`http://localhost:3002/createorupdatecra`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      yearmonth: daysStore.getDateString,
      daysList: JSON.stringify(daysListToCreateOrUpdate),
      signatureDate: "empty",
      uid: userStore.user.uid
    }),
  })
  .then(response => response.json())
  .then(json => console.log(JSON.parse(json.daysList)))
}

export const getCrasList = async () => {

  const userStore = useUserStore();
  const cras: any = [];

  await fetch('http://localhost:3002/getcras',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uid: userStore.user.uid
    }),
  })
  .then(response => response.json())
  .then(json => {
    json.craslist.forEach((cra: {signed: boolean; yearmonth: string; }) => {
      cras.push({
        yearmonth: cra.yearmonth,
        status: cra.signed})
      })
  })

  return cras
}

export const getCra = async (yearmonth: string) => {

  const daysStore = useDaysStore();
  const userStore = useUserStore();

  await fetch('http://localhost:3002/getsinglecra',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uid: userStore.user.uid,
      yearmonth: yearmonth
    }),
  })
  .then(response => response.json())
  .then(json => {
    const days = JSON.parse(json.daysList)
    daysStore.arrayOfDays = jsonToDays(days);
    daysStore.dateOfSignature = json.signatureDate;
    daysStore.signed = json.signed;
  })
}

export const isCraExist = async(yearmonth: string) => {
  const userStore = useUserStore();
  let result = false

  await fetch('http://localhost:3002/iscraexist', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uid: userStore.user.uid,
      yearmonth: yearmonth
    }),
  })
  .then(response => response.json())
  .then(json => {
    result = json.isExist ? true : false
  })

  return result
}

export const signCra = async() => {
  const daysStore = useDaysStore();
  const userStore = useUserStore();

  await fetch('http://localhost:3002/signcra', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uid: userStore.user.uid,
      yearmonth: daysStore.getDateString,

    }),
  })
  .then(response => response.json())
  .then(json => {
    console.log(json);

    daysStore.dateOfSignature = json.signatureDate,
    daysStore.signed = json.signed
  })
}