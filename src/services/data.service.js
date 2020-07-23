import { URL_CONSTANTS } from "../constants/url.constants";

export const returnTicker = async () => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_TICKER)
    .then((response) => response.json())
    .then((data) => { return data });
};

export const returnOrderBook = async (pair) => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_ORDER_BOOK + pair)
  .then((response) => response.json())
  .then((data) => { return data });
};

export const returnTradeHistory = async (pair) => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_TRADE_HISTORY + pair)
  .then((response) => response.json())
  .then((data) => { return data });
};

export const returnChartData = async (pair, startTime, endTime) => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_CHART_DATA + 
    pair + "&start=" + startTime + "&end=" + endTime + "&period=14400")
  .then((response) => response.json())
  .then((data) => { return data });
}

export const returnCurrencies = async () => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_CURRENCIES)
  .then((response) => response.json())
  .then((data) => { return data });
};
