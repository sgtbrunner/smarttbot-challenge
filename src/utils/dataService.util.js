import { URL_CONSTANTS } from "../constants/url.constants";

export const getSummary = async () => {
  const retrievedSummary = await fetch(
    URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_TICKER
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return setPairInfo(retrievedSummary);
};

// export async const getCurrencies = () => {
//     await fetch(URL_CONSTANTS.BASE_URL + URL_CONSTANTS.RETURN_CURRENCIES)
//           .then(response => response.json())
//           .then(data => console.log(data));
//           // .then(data => this.setState({coins: [data]}, () => console.log(this.state.coins)));
// }

const setPairInfo = (summary) => {
  let pairData = [];
  Object.values(summary).forEach((pair, id) => {
    const value = {
      ...pair,
      pairName: Object.keys(summary)[id].replace("_", "/")
    };
    pairData.push(value);
  });
  return pairData;
};
