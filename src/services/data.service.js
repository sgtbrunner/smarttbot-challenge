import { URL_CONSTANTS } from "../constants/url.constants";

export const getSummary = async () => {
  const [ticker, currencies] = await Promise.all([returnTicker(), returnCurrencies()]);
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
  return addRank(sortByVolume(mergeAndCombineData(ticker, currencies)));
};

const mergeAndCombineData = (tickerData, currencyData) => {
  let pairData = [];
  Object.values(tickerData).forEach((pair, id) => {
    const baseName = Object.values(currencyData).filter(c => c.id === (currencyData)[Object.keys(tickerData)[id].split('_')[0]].id)[0].name;
    const quoteName = Object.values(currencyData).filter(c => c.id === (currencyData)[Object.keys(tickerData)[id].split('_')[1]].id)[0].name;
    const totalVolume = Number(pair.baseVolume) + Number(pair.quoteVolume);
    const data = {
      ...pair,
      pairCode: Object.keys(tickerData)[id].replace('_','/'),
      baseName: baseName,
      quoteName: quoteName,
      currencies: baseName + " / " + quoteName,
      totalVolume: totalVolume
    };
    pairData.push(data);
  });
  return pairData;
}

const sortByVolume = pairData => { return pairData.sort((a, b) => (a.totalVolume > b.totalVolume) ? -1 : 1); }

const addRank = pairs => {
  let rankedData = [];
  Object.values(pairs).forEach((pair, id) => {
    const data = {
      ...pair,
      rank: id + 1
    }
    rankedData.push(data);
  });
  return rankedData;
}
