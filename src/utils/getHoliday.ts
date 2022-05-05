export const getHolidays = async (date: Date): Promise<string[]> => {
  const holidaysURL = `https://calendrier.api.gouv.fr/jours-feries/metropole/${date.getFullYear()}.json`;

  return await fetch(holidaysURL)
    .then(response => response.json().then(data => ({
        data: data,
        status: response.status
      }))
    .then(res => {
      return res.data;
    }))
    .catch((error) => {
      alert(error);
    });
};

export default getHolidays;