import React from 'react';

import { SearchFilter } from '../../components/SearchFilter/SearchFilter.component';
import { CustomizedTable } from '../../components/CustomizedTable/CustomizedTable.component';
import './ranking.styles.css';

export const Ranking = (props) => {
    console.log(props);
    return (
        <div className="ranking-container">
            <h1>Desafio SmarttBot</h1>
            <SearchFilter searchChange={props.onSearchChange}/>
            <CustomizedTable rows={props.rows} />
        </div>
    )
}