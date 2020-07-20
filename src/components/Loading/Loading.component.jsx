import React from "react";

import "./Loading.styles.css";

export const Loading = () => {
  return (
    <div className="loading-page">
      <div className="page-loader animate-flicker">
        Wait while we load the best results for you
      </div>
    </div>
  );
};
