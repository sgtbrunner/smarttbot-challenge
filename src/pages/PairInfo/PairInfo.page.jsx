import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import { LiveUpdate } from "../../components/LiveUpdate/LiveUpdate.component";
import { PairInfoCard } from "../../components/PairInfoCard/PairInfoCard.component";
import { Chart } from "../../components/Chart/Chart.component";
import { getChartData } from "../../services/dataHandle.service";
import "./PairInfo.styles.css";

export const PairInfo = (props) => {
  const { location, pair, updatedAt } = props;
  const [data, setData] = useState([]);

  const getComplimentaryPairData = async (pair) => {
    if (pair) {
      const dateTimeNow = Date.now() / 1000;
      return await getChartData(
        pair.pairCode.replace("/", "_"),
        dateTimeNow - 86400,
        dateTimeNow
      );
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getComplimentaryPairData(pair);
      setData(response);
    }
    fetchData();
  }, [pair]);

  if (!(pair && updatedAt && data)) {
    return (
      <div className="center">
        <CircularProgress className="loading-spinner" color="primary" />
      </div>
    );
  } else {
    return (
      <div className="pair-info-container">
        <div>
          <Link to="/">{"Ranking >"}</Link>
          <Link
            to={location.pathname}
            style={{ color: "#1BA39C", fontWeight: "bold" }}
          >
            {pair.pairCode} Details
          </Link>
        </div>
        <div className="title-container">
          <div>
            <div className="currencies">
              {pair.baseName} &harr; {pair.quoteName}
            </div>
            <div className="pair-code">{pair.pairCode}</div>
          </div>
          <LiveUpdate updatedAt={updatedAt} />
        </div>
        <PairInfoCard pair={pair} />
        <div className="center chart-group">
          <h3 className="chart-group-title">
            Average rate and volume in the past 24h
          </h3>
          <div className="charts">
            <Chart data={data} type="Rate" color="purple" />
            <Chart data={data} type="Volume" color="orange" />
          </div>
        </div>
      </div>
    );
  }
};
