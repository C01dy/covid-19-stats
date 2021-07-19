export async function fetchDataFromAPI(url = '') {
  const rootURL = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1';
  const res = await fetch(rootURL + url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '259c09283bmsh08fcc5b2f200a24p100809jsna779d603535d',
      'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
    },
  });
  return res.json();
}

export async function getTotalNumbers(country = '') {
  return await fetchDataFromAPI('/total' + '?country=' + country);
}

export async function getAllCountriesStats() {
  return await fetchDataFromAPI('/stats');
}

export async function getTargetCountryStats(country = '') {
  return await fetchDataFromAPI('/stats?country=' + country);
}
