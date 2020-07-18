import React from 'react';

import { SearchFilter } from '../../components/SearchFilter/SearchFilter.component';
import { CustomizedTable } from '../../components/CustomizedTable/CustomizedTable.component';
import './ranking.styles.css';

export const Ranking = (props) => {
    return (
        <div className="ranking-container">
            <h1>Desafio SmarttBot</h1>
            <h4>* Updated every 30s</h4>
            <SearchFilter searchChange={props.onSearchChange}/>
            <CustomizedTable rows={props.rows} />
        </div>
    )
}