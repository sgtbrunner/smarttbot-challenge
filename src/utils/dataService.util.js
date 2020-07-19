import { URL_CONSTANTS } from "../constants/url.constants";

export const getSummary = async () => {
  const ticker = await returnTicker();
  const currencies = await returnCurrencies();
  return setSummaryData(ticker, currencies);
};

const returnTicker = async () => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_TICKER)
    .then((response) => response.json())
    .then((data) => { return data });
    // .catch(error => window.alert("Unable to fetch data from our server. Please try again later!"))
}

const return24hVolume = async () => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_24H_VOLUME)
  .then((response) => response.json())
  .then((data) => { return data })
  // .catch(error => window.alert("Unable to fetch data from our server. Please try again later!"))
}

const returnOrderBook = async (pair) => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_ORDER_BOOK + pair)
  .then((response) => response.json())
  .then((data) => { return data })
  // .catch(error => window.alert("Unable to fetch data from our server. Please try again later!"))
}

const returnTradeHistory = async (pair) => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_TRADE_HISTORY + pair)
  .then((response) => response.json())
  .then((data) => { return data })
  // .catch(error => window.alert("Unable to fetch data from our server. Please try again later!"))
}

const returnCurrencies = async () => {
  return await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_CURRENCIES)
  .then((response) => response.json())
  .then((data) => { return data })
  // .catch(error => window.alert("Unable to fetch data from our server. Please try again later!"))
}

const setSummaryData = (ticker, currencies) => {
  let pairData = [];
  Object.values(ticker).forEach((pair, id) => {
    const baseName = Object.values(currencies).filter(c => c.id === (currencies)[Object.keys(ticker)[id].split('_')[0]].id)[0].name;
    const quoteName = Object.values(currencies).filter(c => c.id === (currencies)[Object.keys(ticker)[id].split('_')[1]].id)[0].name;
    const data = {
      ...pair,
      pairCode: Object.keys(ticker)[id],
      baseName: baseName,
      quoteName: quoteName,
      currencies: baseName + " / " + quoteName
    };
    pairData.push(data);
  });
  return pairData;
};
