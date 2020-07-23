import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

import { LiveUpdate } from "../../components/LiveUpdate/LiveUpdate.component";
import { PairInfoCard } from "../../components/PairInfoCard/PairInfoCard.component";
import { Chart } from "../../components/Chart/Chart.component";
import { getComplementaryPairInfo } from "../../utils/dataHandle.util";
import { getCurrentDateTimeSubtractedNDays } from "../../utils/dateTime.util";
import "./PairInfo.styles.css";

export const PairInfo = props => {
    const { history, location, match, pair, updatedAt } = props;

    if(!(pair && updatedAt)) {
        return (
            <div className="center">
                <CircularProgress className="loading-spinner" color="primary" />
            </div>
        )
    } else {
        const getData = async pair => {
            if(pair) {
                const response = await getComplementaryPairInfo(props.pair.pairCode.replace('/','_'));
                console.log(response);
            }
        }
    
        getData(pair);
    
        return (
            <div className="pair-info-container">
                <div>                
                    <Link to="/">{'Ranking >'}</Link>
                    <Link 
                        to={location.pathname} 
                        style={{ color: '#1BA39C', fontWeight: 'bold'}}>
                        {pair.pairCode} Details
                    </Link>
                </div>
                <div className="title-container">
                    <div>
                        <div className="currencies">{pair.baseName} &harr; {pair.quoteName}</div>
                        <div className="pair-code">{pair.pairCode}</div>
                    </div>
                    <LiveUpdate updatedAt={updatedAt} />
                </div>
                <PairInfoCard pair={pair} />
                <div className="center chart">
                    <button onClick={() => getCurrentDateTimeSubtractedNDays(1)}>TESTE</button>
                </div>
            </div>
        )
    }
}