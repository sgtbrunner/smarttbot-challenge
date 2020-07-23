import { returnTicker, 
         returnOrderBook, 
         returnTradeHistory, 
         returnCurrencies} 
from "../services/data.service";

export const getSummary = async () => {
    const [ticker, currencies] = await 
      Promise.all([returnTicker(), returnCurrencies()])
    return setSummaryData(ticker, currencies);
};
  
export const getComplementaryPairInfo = async pairCode => {
    return await 
      Promise.all([returnOrderBook(pairCode), returnTradeHistory(pairCode)])
};

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