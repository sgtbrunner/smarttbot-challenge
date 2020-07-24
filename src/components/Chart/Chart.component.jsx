import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const Chart = (props) => {
  const { data } = props;

  if (!data.length) {
    return (
      <div className="center">
        <CircularProgress className="loading-spinner" color="primary" />
      </div>
    );
  } else {
    return (
      <div>
        <ComposedChart
          width={500}
          height={250}
          data={data}
          margin={{ top: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={props.type.toLowerCase()}
            stroke={props.color}
          />
        </ComposedChart>
      </div>
    );
  }
};
