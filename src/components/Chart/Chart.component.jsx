import React from "react";
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import "./Chart.styles.css";

const handleData = (dataArray, dateArray) => {
  const graphData = [];
  for(let i = 0; i< dataArray.length; i++) {
    const dataObject = {
      "name": dateArray[i].toLocaleTimeString().slice(0, -3),
      "average": dataArray[i].weightedAverage,
      "volume": dataArray[i].quoteVolume/1000000
    };
    graphData.push(dataObject);
  };
  return graphData;
}

export const Chart = props => {
  const { data } = props;
  console.log(props);
  const test = handleData(data[0], data[1]);
  console.log(test);

  return (
    <div>
      <ComposedChart width={500} height={250} data={test}
        margin={{ top: 5,  bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={props.type} stroke={props.color} />
      </ComposedChart>
    </div>
  );
};

