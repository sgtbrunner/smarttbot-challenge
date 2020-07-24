import { URL_CONSTANTS } from "../constants/url.constants";

export const returnTicker = async () => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_TICKER)
    .then((response) => response.json())
    .then((data) => { return data })
    .catch(error => console.log(error));
};

export const returnChartData = async (pair, startTime, endTime) => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_CHART_DATA + 
    pair + "&start=" + startTime + "&end=" + endTime + "&period=1800")
  .then((response) => response.json())
  .then((data) => { return data })
  .catch(error => console.log(error));
}

export const returnCurrencies = async () => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_CURRENCIES)
  .then((response) => response.json())
  .then((data) => { return data })
  .catch(error => console.log(error));
};
