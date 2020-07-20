import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

import "./Loading.styles.css";

export const Loading = () => {
  return (
    <div className="loading">
      <CircularProgress className="loading-spinner" />
      <div className="loading-message">
        Wait while we load the best results for you
      </div>
    </div>
  );
};
