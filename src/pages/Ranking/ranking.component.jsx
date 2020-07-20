import React from 'react';

import { SearchFilter } from '../../components/SearchFilter/SearchFilter.component';
import { CustomizedTable } from '../../components/CustomizedTable/CustomizedTable.component';
import './ranking.styles.css';

export const Ranking = (props) => {
    const { onSearchChange, rows, updatedAt } = props;
    return (
        <div className="ranking-container">
            <h1>SmarttBot Challenge</h1>
            <h3>Most Active Cryptocurrency Pairs in the last 24h</h3>
            <SearchFilter searchChange={onSearchChange}/>
            <CustomizedTable rows={rows} />
            <h5>Atualizado hoje às { updatedAt }</h5>
        </div>
    )
}