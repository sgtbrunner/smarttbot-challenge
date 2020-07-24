import React from "react";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

import "./LiveUpdate.styles.css";

export const LiveUpdate = (props) => {
  const { updatedAt } = props;
  return (
    <div className="live-update">
      <QueryBuilderIcon color="primary" />
      <div className="live-text">Last updated: {updatedAt}</div>
    </div>
  );
};
