import { useUserStore } from "@/stores/userStore";
import { useDaysStore } from "@/stores/daysStore";
import { jsonToDays, daysToJson } from "@/utils/daysListConverter";
import generateDays from "@/utils/generateDays";
import { env } from "./env";

export const createOrUpdateCraDB = async () => {

  const daysStore = useDaysStore();
  const userStore = useUserStore();
  const yearmonth = daysStore.getDateString;
  const userid = userStore.user.uid;

  const daysListToCreateOrUpdate:JSON[] = daysToJson(daysStore.arrayOfDays);

  await fetch(`http://localhost:3002/user/${userid}/cra/${yearmonth}`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      daysList: JSON.stringify(daysListToCreateOrUpdate),
      signatureDate: "empty"
    })
  })
  .then(response => response.json())
  .then(json => console.log(JSON.parse(json.daysList)));
};
export const getCrasList = async () => {

  const userStore = useUserStore();
  const userid = userStore.user.uid;
  const cras: any = [];

  await fetch(`${env.BACKEND_URL}/user/${userid}/cras`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(json => {
    json.craslist.forEach((cra: {id: number;signed: boolean; yearmonth: string; }) => {
      cras.push({
        yearmonth: cra.yearmonth,
        status: cra.signed
      });
      });
  });

  return cras;
};

export const getCra = async (yearmonth: string) => {

  const daysStore = useDaysStore();
  const userStore = useUserStore();
  const userid = userStore.user.uid;
  try {
    await fetch(`${env.BACKEND_URL}/user/${userid}/cra/${yearmonth}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      const days = JSON.parse(json.daysList);
      daysStore.arrayOfDays = jsonToDays(days);
      daysStore.dateOfSignature = json.signatureDate;
      daysStore.signed = json.signed;
    });
  } catch (error) {
    daysStore.arrayOfDays = await generateDays(new Date(yearmonth));
  }
};

export const signCra = async () => {
  const daysStore = useDaysStore();
  const userStore = useUserStore();
  const yearmonth = daysStore.getDateString;
  const userid = userStore.user.uid;

  await fetch(`${env.BACKEND_URL}/user/${userid}/cra/${yearmonth}/sign`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(json => {
    daysStore.dateOfSignature = json.signatureDate,
    daysStore.signed = json.signed;
  });
};