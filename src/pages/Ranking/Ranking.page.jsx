import React from "react";

import { Loading } from "../../components/Loading/Loading.component";
import { SearchFilter } from "../../components/SearchFilter/SearchFilter.component";
import { CustomizedTable } from "../../components/CustomizedTable/CustomizedTable.component";
import { LiveUpdate } from "../../components/LiveUpdate/LiveUpdate.component";
import "./Ranking.styles.css";

export const Ranking = (props) => {
  const { rows, updatedAt, onSearchChange } = props;
  return (
    <div>
      {!rows.length ? (
        <Loading />
      ) : (
        <div>
          <div className="ranking-container">
            <div className="ranking-title">
              Most active cryptocurrency pairs
            </div>
            <div className="help-box">
              <SearchFilter searchChange={onSearchChange} />
              <LiveUpdate updatedAt={updatedAt} />
            </div>
            <CustomizedTable rows={rows} />
          </div>
        </div>
      )}
    </div>
  );
};
