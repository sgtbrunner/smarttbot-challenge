import React from 'react';

import { abbreviateNumber, numericValueFormatter, percentageFormatter } from "../../utils/numberFormatter.util";
import "./PairInfoCard.styles.css";

export const PairInfoCard = (props) => {
    const { pair } = props;

    return(
        <div className="pair-info-card">
            <div>
                <div className="column-name" style={{fontSize: 16, fontWeight: 'bold'}}>Rank</div>
                <div className="column-value rank-value">{pair.rank}</div>
            </div>
            <div className="card-last">{numericValueFormatter(pair.last)}</div>
            <div>
                <div className="column-name">High</div>
                <div className="column-value">{numericValueFormatter(pair.high24hr)}</div>
            </div>
            <div>
                <div className="column-name">Low</div>
                <div className="column-value">{numericValueFormatter(pair.low24hr)}</div>
            </div>
            <div>
                <div className="column-name">Change %</div>
                <div 
                    className="column-value"
                    style={{color: pair.percentChange > 0 ? 'green' : 'red'}}>
                    {percentageFormatter(pair.percentChange)}
                </div>
            </div>
            <div>
                <div className="column-name">Base Volume</div>
                <div className="column-value">{abbreviateNumber(pair.baseVolume)}</div>
            </div>
            <div>
                <div className="column-name">Quote Volume</div>
                <div className="column-value">{abbreviateNumber(pair.quoteVolume)}</div>
            </div>
            <div>
                <div className="column-name">Total Volume</div>
                <div className="column-value">{abbreviateNumber(pair.totalVolume)}</div>
            </div>
        </div>
    )
}