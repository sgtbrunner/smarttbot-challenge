import { returnTicker, 
         returnChartData, 
         returnCurrencies} 
from "../services/data.service";

import { convertUnixToDate } from "../utils/dateTime.util";

export const getSummary = async () => {
    const [ticker, currencies] = await 
      Promise.all([returnTicker(), returnCurrencies()])
      return setSummaryData(ticker, currencies);
};
  
export const getChartData = async ( pairCode, startTime, endTime) => {
    const chartData = await returnChartData(pairCode, startTime, endTime);
    const dateTimeInfo = chartData.map(el => convertUnixToDate(el.date));
    return setChartData(chartData, dateTimeInfo);
};

const setSummaryData = (ticker, currencies) => {
    return addRank(sortByVolume(mergeAndCombineSummaryData(ticker, currencies)));
};

const setChartData = (chartData, dateTimeInfo) => {
  const graphData = [];
  for(let i = 0; i< chartData.length; i++) {
    const dataObject = {
      "name": dateTimeInfo[i].toLocaleTimeString().slice(0, -3),
      "rate": chartData[i].weightedAverage,
      "volume": chartData[i].volume
    };
    graphData.push(dataObject);
  }
  return graphData;
}
  
const mergeAndCombineSummaryData = (tickerData, currencyData) => {
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
  };
  
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
};