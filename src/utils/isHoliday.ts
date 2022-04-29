/* export const isHoliday = (date: number): void => {
  const holidaysURL = `https://calendrier.api.gouv.fr/jours-feries/metropole/${date}.json`
  let holidays = {}
  fetch(holidaysURL).then(response =>
    response.json().then(data => ({
        data: data,
        status: response.status
    })
  ).then(res => {
    holidays = res.data
    console.log(holidays)
  }));
} */